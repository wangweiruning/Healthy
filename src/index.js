import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';

import {Icon} from 'antd';
import {BrowserRouter as Router, Route} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import "./App.css";
import "./index.css";
import "./public.css";
import "./pagesAll.css"
import "./mobileSelect.css"
import {serverUrl,shareUrl} from "./api/serviceAPI.config";
import {pageOpen,articles} from './api/api'
import $ from 'jquery'
import MD5 from 'md5';

window.shareImgSrc = serverUrl;
const Loading = ({ pastDelay, timedOut, error }) => {
  if (pastDelay) {
    return <div><Icon type="loading" /></div>;
  } else if (timedOut) {
    return <div>Taking a long time...</div>;
  } else if (error) {
    return <div>Error!</div>;
  }
  return null;
};
const HomePage = Loadable({
  loader: () => import('./Component/HomePage'),
  loading: Loading,
  timeout: 10000
});
const KeyServices = Loadable({
  loader: () => import('./Component/KeyServices'),
  loading: Loading,
  timeout: 10000
});
const Seminar = Loadable({
  loader: () => import('./Component/Seminar'),
  loading: Loading,
  timeout: 10000
});
const HotProduct = Loadable({
  loader: () => import('./Component/HotProduct'),
  loading: Loading,
  timeout: 10000
});
const ClassiCase = Loadable({
  loader: () => import('./Component/ClassiCase'),
  loading: Loading,
  timeout: 10000
});
const KeyServersMsg = Loadable({
  loader: () => import('./Component/KeyServersMsg'),
  loading: Loading,
  timeout: 10000
});

const KeyServersMsg1 = Loadable({
  loader: () => import('./Component/KeyServersMsg1'),
  loading: Loading,
  timeout: 10000
});
const LookMoreView = Loadable({
  loader: () => import('./Component/LookMoreView'),
  loading: Loading,
  timeout: 10000
});

const Question = Loadable({
  loader: () => import('./Component/Question'),
  loading: Loading,
  timeout: 10000
});
const PutQuestion = Loadable({
  loader: () => import('./Component/PutQuestion'),
  loading: Loading,
  timeout: 10000
});
const Region = Loadable({
  loader: () => import('./Component/Region'),
  loading: Loading,
  timeout: 10000
});
const SearchPage = Loadable({
  loader: () => import('./Component/SearchPage'),
  loading: Loading,
  timeout: 10000
});
const ServiceList = Loadable({
  loader: () => import('./Component/ServiceList'),
  loading: Loading,
  timeout: 10000
});
const ShowQuestion = Loadable({
  loader: () => import('./Component/ShowQuestion'),
  loading: Loading,
  timeout: 10000
});
const Marketing = Loadable({
  loader: () => import('./Component/Marketing'),
  loading: Loading,
  timeout: 10000
});
const MarketingList = Loadable({
  loader: () => import('./Component/MarketingList'),
  loading: Loading,
  timeout: 10000
});
const Assistant = Loadable({
  loader: () => import('./Component/Assistant'),
  loading: Loading,
  timeout: 10000
});
const Slectware = Loadable({
  loader: () => import('./Component/Slectware'),
  loading: Loading,
  timeout: 10000
});

const SeeSearchView = Loadable({
  loader: () => import('./Component/SeeSearchView'),
  loading: Loading,
  timeout: 10000
});
const SeeSearchProgram = Loadable({
  loader: () => import('./Component/SeeSearchProgram'),
  loading: Loading,
  timeout: 10000
});
const MyProgram = Loadable({
  loader: () => import('./Component/MyProgram'),
  loading: Loading,
  timeout: 10000
});
const ShowPic = Loadable({
  loader: () => import('./Component/ShowPic'),
  loading: Loading,
  timeout: 10000
});
const Iframe = Loadable({
  loader: () => import('./Component/Iframe'),
  loading: Loading,
  timeout: 10000
});


window.openPages =async(pageId,title)=>{
  let userid = localStorage.getItem('userId');
  let readTimenew = localStorage.getItem('readTimenew');
  let readTime = parseInt((new Date().getTime()-readTimenew)/1000);
  let closeTime = new Date().getTime();
      closeTime= window.fnDate(closeTime);
  let openTime = window.fnDate(parseInt(readTimenew));

  let data = {pageId,userid,title,readTime,closeTime,openTime};
  await pageOpen(data);
}


window.parseQueryString=(url)=>{
  url = decodeURIComponent(url)
  var params = {};
  var arr = url.split("?");
  //二次分享链接url的参数截取 
 arr.map((item,index)=>{
  var arr1 = item.split("&");
  for (var i = 0; i < arr1.length; i++) {
     var arr2 = arr1[i].split('='); 
      if (!arr2[1]) { 
          params[arr2[0]] = '';
      } else  if (params[arr2[0]]) { 
          var arr3 = [params[arr2[0]]]; 
          arr3.push(arr2[1]); params[arr2[0]] = arr3; 
      } else { 
          params[arr2[0]] = decodeURI(arr2[1]);
      } 
  }
})
  return params;
} 



var wx = window.wx;

window.goto = ()=>{
  if(window.location.href.indexOf('from') !== -1 || window.location.href.indexOf('isappinstalled') !== -1){
    // 二次分享url重定向 - 需要截取一次分享后微信自动拼接的url参数&from=singlemessage&isappinstalled=0
    window.location.href = window.location.href.split('?')[0];  // 这里的split中的字符串会变换（?或&），主要看自己的url
}
}


window.returnNewUrl = ()=>{
  let urlbase = window.location.href;
  //截取需要的url
  let urlsplit =  urlbase.indexOf('?p13no')!= -1 ?urlbase.split('?p13no')[0]:urlbase.split('?backurl')[0];
    
      urlsplit = urlsplit.replace('?from=singlemessage','');
      return urlsplit;
}

function sort_ASCII(obj){
  var arr = new Array();
  var num = 0;
  for (var i in obj) {
    arr[num] = i;
    num++;
  }
  var sortArr = arr.sort();
  var sortObj = {};
  for (var i in sortArr) {
    sortObj[sortArr[i]] = obj[sortArr[i]];
  }
  return sortObj;
}

window.sharePdf= (otype="01",libno=1,libtitle="健康险H5",sid="33",acttimes=4) => {

  let userid = localStorage.getItem('userId');
  let ouserid = localStorage.getItem('ouserId')?localStorage.getItem('ouserId'):userid;
  let suserid = localStorage.getItem('suserId')?localStorage.getItem('suserId'):userid;
  let stime = Date.parse(new Date());
  // let stime =1563000623000;

  var op ={
    acttimes,
    libno,
    libtitle,
    otype,
    ouserid,
    userid,
    sid,
    source:"jkxzq",
    stime,
    suserid,
  }

  if(otype!='01') delete op.acttimes;

  let oo = sort_ASCII(op);
  let str ="";
  for (let key in oo) {
    str+=`&${key}=${oo[key]}`
  }
let params = str;
  str = str.replace(/&/,'')+`jkx123456`;

  //{ "acttimes",  "libno",  "libtitle", "otype",  "ouserid",  "userid",  "sid","source", "stime",  "suserid",}

  let sign = MD5(str).toLowerCase();

  
  $.ajax({
    url: `${shareUrl}?sign=${sign+params}`,
    type: "POST",
    dataType: 'json',
    cache: false,
    // data:ops,
    success: function (res) {
        console.log(res,"rrrr")
    }
    
});
}


//注入config
window.getTestWxShareConfig = (callbacks) =>{
  if(!callbacks) return;
  let url=window.location.href;
  $.ajax({
      url: `${window.shareImgSrc}/api/wx/sign?url=${encodeURIComponent(url)}`,
      type: "GET",
      dataType: 'json',
      cache: false,
      success: function (json) {
          
        var config = {};
          config.debug = false;
          config.appId = json.data.appid;
          config.timestamp = json.data.timestamp;
          config.nonceStr = json.data.nonceStr;
          config.signature = json.data.signature;
          config.jsApiList = [// 必填，需要使用的JS接口列表
             'updateAppMessageShareData',
             'updateTimelineShareData',
             'onMenuShareAppMessage',
             'onMenuShareTimeline', 
             'hideOptionMenu'];
          window.wx.config(config);

            window.wx.ready(function(){
              if(callbacks && typeof callbacks == 'function')callbacks();
            })

      }
      
  });
}


//处理页面检测时间

 window.fnDate=(date)=>{
      date = new Date(date);
  var year=date.getFullYear();//当前年份
  var month=date.getMonth();//当前月份
  var data=date.getDate();//天
  var hours=date.getHours();//小时
  var minute=date.getMinutes();//分
  var second=date.getSeconds();//秒
  var time=year+"-"+fnW((month+1))+"-"+fnW(data)+" "+fnW(hours)+":"+fnW(minute)+":"+fnW(second);

  return time;
  }
  //补位 当某个字段不是两位数时补0
  function fnW(str){
  var num;
  str>10?num=str:num="0"+str;
  return num;
  }

Date.prototype.Format = function(fmt) {
    const o = {
      'M+': this.getMonth() + 1,                 //月份
      'd+': this.getDate(),                    //日
      'h+': this.getHours(),                   //小时
      'm+': this.getMinutes(),                 //分
      's+': this.getSeconds(),                 //秒
      'q+': Math.floor((this.getMonth() + 3) / 3), //季度
      'S': this.getMilliseconds(),             //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  };


  //百度监测
    window._hmt = window._hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?56a1269be78a80d652d588438ef484d9";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
    })();
    window.pageView=function(view){
      window._hmt.push(['_trackPageview', "/"+view]);
    }
    window.pageClick=function(e){
      window._hmt.push(['_trackEvent', e, 'click']);
    }

    //切换正式测试站数据链接地址
    window.baseUrl = serverUrl;

    window.geturldata = (a,b,c)=>{
         if(!c)return;
      
          let newurl = currentUrl();

            a.link = newurl;
            b.link = newurl;
            window.wxshare(a,b,c)
            
            
         
            
    }

    function currentUrl () {
          let urls = sessionStorage.getItem('oldurl');

        //获取分享出来的链接的params {userId，suserid，ouserid}
          let params = window.parseQueryString(decodeURIComponent(urls));


          let userid = localStorage.getItem("userId");//用户id
          

  
          let ouserid = params.ouserid;
          let gtuserid = params.suserid;//上级id
          // let getuser = params.userid;
        
              userid  = userid?userid:ouserid;//如果二次分享取url上的ouserid
          let suserid= userid?userid:gtuserid;//如果没有上级gtuserid，就是用当前用户id
         
          let urlsplit = 'http://cpicaic.abtpt.com/MidPage';//叮咚助手链接

          let baseurls = window.returnNewUrl()+`?ouserid=${userid}&suserid=${suserid}&urlsplit=${encodeURIComponent(urlsplit)}`;//分享时需要带上的一个url

          return baseurls;
    }


    window.getcode=(name)=>{
      let reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
      let r = window.location.search.substr(1).match(reg);
      if(r!=null) return unescape(r[2])
      return null
    }
    
    // 调用微信分享方法
    window.wxshare=(a,b)=>{
        //拼接分享链接
        if( window.wx.onMenuShareAppMessage){ //微信文档中提到这两个接口即将弃用，故判断
            window.wx.onMenuShareAppMessage(a);//1.0 分享到朋友
            window.wx.onMenuShareTimeline(b);//1.0分享到朋友圈
        }else{
            window.wx.updateAppMessageShareData(a);//1.4 分享到朋友
            window.wx.updateTimelineShareData(b);//1.4分享到朋友圈
        }
    }

  
  export default class App extends Component {
    componentDidMount(){
      sessionStorage.setItem('oldurl',window.location.href);
      //获取用户当前的所在城市信息
    let params = window.parseQueryString(decodeURIComponent(window.location.href));
        if(params.userid)localStorage.setItem('userId',params.userid);
        if(params.ouserid)localStorage.setItem('ouserId',params.ouserid);
        if(params.suserid)localStorage.setItem('suserId',params.suserid);
    if(params.urlsplit){
      let href = decodeURIComponent(window.location.href.split('&urlsplit=')[1])+'?backurl='+encodeURIComponent(window.location.href.split('&urlsplit=')[0]);
      window.location.href = href;
    }

      let BMap = window.BMap;
      let geolocation = new BMap.Geolocation();
          geolocation.enableSDKLocation(); //允许SDK辅助
          geolocation.getCurrentPosition(function (r) {
        if(this.getStatus() == 0){
          localStorage.setItem("point",JSON.stringify(r.point));
          localStorage.setItem("city",r.address.city);
        }
      })

     
    }
    
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/home" component={HomePage}/>
                    <Route exact path="/KeyServices" component={KeyServices}/>
                    <Route exact path="/Seminar/:typeid" component={Seminar}></Route>
                    <Route exact path="/HotProduct" component={HotProduct} />
                    <Route exact path="/ClassiCase/:typeid" component={ClassiCase}/>
                    <Route exact path="/KeyServersMsg" component={KeyServersMsg}/>
                    <Route exact path="/KeyServersMsg1" component={KeyServersMsg1}/>
                    <Route exact path="/LookMoreView/:typeid" component={LookMoreView}/>
                    <Route exact path="/Question" component={Question}/>
                    <Route exact path="/PutQuestion" component={PutQuestion}/>
                    <Route exact path="/Region" component={Region}/>
                    <Route exact path="/SearchPage" component={SearchPage}/>
                    <Route exact path="/ServiceList" component={ServiceList}/>
                    <Route exact path="/ShowQuestion" component={ShowQuestion}/>
                    <Route exact path="/Marketing" component={Marketing}/>
                    <Route exact path='/MarketingList' component={MarketingList} />
                    <Route exact path='/Assistant' component={Assistant}/>
                    <Route exact path='/Slectware/:id' component={Slectware}/>
                    <Route exact path='/SeeSearchView/:data' component={SeeSearchView}/>
                    <Route exact path='/SeeSearchProgram' component={SeeSearchProgram}/>
                    <Route exact path='/MyProgram' component={MyProgram}/>
                    <Route exact path='/ShowPic/:svgname' component={ShowPic}/>
                    <Route exact path='/Iframe/:url' component={Iframe}/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
