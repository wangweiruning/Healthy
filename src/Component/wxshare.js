
import $ from "jquery"
var wx = window.wx;
class WxShare{
     constructor(){
        this.getTestWxShareConfig()
        this.wxshare();
    }
    wxshare(){
        var amObj = {
          title: "健康险专区",
          desc: "乐享百万助力",
          link: window.location.href,
          imgUrl: window.shareImgSrc+"/profile/upload/2019/06/25/c5da76c7bd245bd893c7a4f990babedb.png"
        }
        
        var tlObj = {
          title: "健康险专区",
          desc: "乐享百万助力",
          link: window.location.href,
          imgUrl: window.shareImgSrc+"/profile/upload/2019/06/25/c5da76c7bd245bd893c7a4f990babedb.png",
        }
        wx.ready(()=>{
          this.onMenuShareAppMessage(amObj);
          this.onMenuShareTimeline(tlObj);
        });
      }

    /**设置分享给好友*/
      onMenuShareAppMessage(config){
        wx.onMenuShareAppMessage(config);
      }

      /**设置分享到朋友圈*/
      onMenuShareTimeline(config){
        alert("WX:"+config.title);  
        wx.onMenuShareTimeline(config);
      }

    //注入config
    getTestWxShareConfig() {
        var config = {};
        $.ajax({
            // url: `http://47.98.139.33:4001/api/wx/sign?url=${window.location.href.split('#')[0]}`,
            url: `${window.shareImgSrc}/api/wx/sign?url=${encodeURIComponent(window.location.href.split('#')[0])}`,
            type: "GET",
            dataType: 'json',
            cache: false,
            success: function (json) {
                var config = {};
                config.debug = true;
                config.appId = json.data.appid;
                config.timestamp = json.data.timestamp;
                config.nonceStr = json.data.nonceStr;
                config.signature = json.data.signature;
                config.jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideOptionMenu'];
                wx.config(config);
            }
        });}
        
}

export default new WxShare();