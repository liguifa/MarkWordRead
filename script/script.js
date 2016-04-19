var AccessTokenIframe = "<iframe name='iframe' id='AccessTokenIframe' src='https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=7l0GFIkB4ZIx28TSG4xlyuW7zMgbbq7A&client_secret=xG28PE55obQWt0SGNStIU6jBYr99RAqI' style='display:none'></iframe>";
var IsGetAccessToken;
var AccessToken;
var IsRead = false;
var y;
var x;
var isStart = true;
$(document).ready(function()
{
   $("body").append(AccessTokenIframe);
   IsGetAccessToken = setInterval("GetAccessToken()",100);
   
    $('body').mousemove(function (e) 
    {
         y =  e.pageY+10;
         x = e.pageX;
    });
    $("body").mouseup(function()
    {
        chrome.storage.sync.get('enabled', function(result) 
        {
            isStart= result.enabled;
        });
        var text = "";
        if (window.getSelection) 
        {
            text = window.getSelection();
        } 
        else if (window.document.getSelection) 
        {
            text = window.document.getSelection();
        } 
        else if (window.document.selection) 
        {
            text = window.document.selection.createRange().text;
        }
       if(text!="" && !IsRead && isStart)
        {
            var readDiv = "<div id='read_word' style='cursor:pointer;swidth:30px;height;30px;;border:2px solid #00C5A4;position:absolute;top:"+y+"px;left:"+x+"px'><image src='http://chuantu.biz/t3/17/1461032875x3738746553.png' width='30px' height='30px'></div>"
            $('body').append(readDiv);
            IsRead = true;
            $("#read_word").click(function()
            {
                var url = "http://tsn.baidu.com/text2audio?tex="+text+"&lan=zh&tok="+AccessToken+"&ctp=1&cuid=1&spd=5&pit=5&vol=5&per=1";
                var html = '<audio id="read_audio" autoplay="autoplay" style="display:none" src="'+url+'" controls="controls"></audio>';
                $(this).append(html);
                document.getElementById("read_audio").addEventListener("ended",RemoveAudio);
            });
        } 
    });
});

function RemoveAudio()
{
    $("#read_word").remove();
    IsRead = false;
}

function GetAccessToken()
{
    var data = $(window.frames["iframe"].document).find("body").text();
    if(data!="")
    {
        clearInterval(IsGetAccessToken);
        data = eval("("+data+")");
        AccessToken = data.access_token;
    }
}
