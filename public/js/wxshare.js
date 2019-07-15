// 微信相关

//默认微信分享配置
const defaultShareConfig = {
	title:"贵金开在线",
	desc:document.title,
	link: window.location.href,
	imgUrl:'http://api.gjkrf.com:81/web/assets/img/icon.png',
}

var isWxReady = false;
 /**
  * 设置微信分享配置
 */
var wxShareCache;
window.wxshare = function(a={},b={}){
    alert("微信分享："+JSON.stringify(a))
	if(!window.wx){
		alert("微信API未引入！");
		return;
	}
	if(isWxReady == false){
		wxShareCache=[a,b];
		return;
	}

    window.wx.onMenuShareAppMessage(a);//1.0 分享到朋友
    window.wx.onMenuShareTimeline(b);//1.0分享到朋友圈
   
}

var wIndex = 0;
(function initWxShare(){
	if(!window.wx){
		// return alert("微信分享API未引入");
		if(wIndex<4)setTimeout(initWxShare,2000);
		wIndex++;
		return;
	}
	let url = encodeURIComponent(window.location.href);
	$.ajax({
		type: "GET",
		url: `http://47.98.139.33:4001/api/wx/sign?url=${url}`,
		dataType: "json",
		success: function(json){
			var config = {};
			config.debug = false;
			config.appId = json.data.appid;
			config.timestamp = json.data.timestamp;
			config.nonceStr = json.data.nonceStr;
			config.signature = json.data.signature;
			config.jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideOptionMenu'];
			window.wx.config(config);
			
			wx.ready(function () {
				isWxReady=true;
				if(wxShareCache){
      				window.wxshare(wxShareCache[0],wxShareCache[1]);
				}else{
					window.wxshare(defaultShareConfig,defaultShareConfig);
				}
			});
	
		},
		error:function(error){
			alert(JSON.stringify(error))
		}
	});
})()
// 微信分享end
