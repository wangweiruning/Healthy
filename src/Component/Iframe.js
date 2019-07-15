
import React from 'react';
import { withRouter } from 'react-router-dom'
import {documentOpen,ClickVIEW,getNewPageMsg,documentClick} from '../api/api'
import URL from '../api/serviceAPI.config'

class Iframe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            htmlMsg:'',
        }
    }
    componentWillMount(){
        this.getHtmlData();
        localStorage.setItem('iframeurl',window.location.href)  
    }
    componentDidMount(){
        let paramsnew = window.parseQueryString(decodeURIComponent(window.location.href));
        
        if(paramsnew.userid)localStorage.setItem('userId',paramsnew.userid);
        if(paramsnew.ouserid)localStorage.setItem('ouserId',paramsnew.ouserid);
        if(paramsnew.suserid)localStorage.setItem('suserId',paramsnew.suserid);

        let userid = localStorage.getItem("userId")?localStorage.getItem("userId"):'';
       let p13no = localStorage.getItem("p13no")?localStorage.getItem("p13no"):'';
       let empno = localStorage.getItem("empno")?localStorage.getItem("empno"):'';
       let shareTime = window.fnDate(new Date().getTime());
       let title = localStorage.getItem("shareName")?localStorage.getItem("shareName"):"健康险专栏-文档浏览";

       let url = decodeURIComponent(window.location.href).split('.pdf?')[1];
       let params = window.parseQueryString(decodeURIComponent(url));
       let docType = params.doctype;
       let docId = params.docId;
    
       let view = {docId, docType , empno  ,p13no ,shareTime ,title, userid};

        window.getTestWxShareConfig(function (){
            var a = {
                title:  localStorage.getItem("shareName")?localStorage.getItem("shareName"):"健康险专栏-文档浏览",
                desc:   localStorage.getItem("shareName")?localStorage.getItem("shareName"):"健康险专栏-文档浏览",
                link:   window.location.href,
                imgUrl: window.shareImgSrc+"/profile/upload/2019/06/25/c5da76c7bd245bd893c7a4f990babedb.png",
                success:async()=>{
    
                   await ClickVIEW(view);
                   window.sharePdf("02",docId,title,docId)
                }
            }
            var b = {
                title:  localStorage.getItem("shareName")?localStorage.getItem("shareName"):"健康险专栏-文档浏览",
                desc:   localStorage.getItem("shareName")?localStorage.getItem("shareName"):"健康险专栏-文档浏览",
                link:   window.location.href,
                imgUrl: window.shareImgSrc+"/profile/upload/2019/06/25/c5da76c7bd245bd893c7a4f990babedb.png",
                success:async()=>{
                    window.sharePdf("02",docId,title,docId)
                    await ClickVIEW(view);
                 }
            }
        
            window.geturldata(a,b,'11');//分享
        });
      

        
       
        //缓存点击的文档信息
        let item  = JSON.parse(localStorage.getItem('docInfo'));
        if(item){
            sessionStorage.setItem('docType',item.catalogType==1?1:2)
            sessionStorage.setItem('docId',item.id)
            sessionStorage.setItem('title',item.title?item.title:'PDF文档查看')
            sessionStorage.setItem('openTime',new Date().getTime())
        }

        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','文档浏览');
        localStorage.setItem('readTimenew',new Date().getTime());    
        
       

    }

    //获取文章内容 + 文档点击
    getHtmlData = async()=>{
        let url = decodeURIComponent(window.location.href).split('Iframe/')[1];

        let params = window.parseQueryString(decodeURIComponent(url));
      

        let doctype = params.doctype;
        let docId = params.docId;
        let id = params.nameid;

            if(doctype==3){
                let resdata = await getNewPageMsg(id);
                let msg  = resdata.data.content;

                 let newmsg = msg.replace(/\/profile\/upload\//ig,URL.fileURL)
                 sessionStorage.setItem('title',resdata.data.title)
                this.setState({
                    htmlMsg:newmsg
                })
            }
            let openTime = window.fnDate(parseInt(new Date().getTime()));
            let title = sessionStorage.getItem('title');
            let userid = localStorage.getItem('userId');
            let empno = localStorage.getItem('empno');
            let p13no = localStorage.getItem('p13no');
            let datas = {docId,docType:doctype,empno,openTime,p13no,title,userid};

            await documentClick(datas);
    }

    async componentWillUnmount(){
        // docId  文档类型 docType:1/2  打开时间openTime  结束时间readTime  文档title title  用户id userid
        let iframeurl = localStorage.getItem('iframeurl');
        let url = decodeURIComponent(iframeurl).split('.pdf?')[1];
        url = url==undefined?decodeURIComponent(iframeurl).split('Iframe/')[1]:url;
        let params = window.parseQueryString(decodeURIComponent(url));
       
        let docType = params.doctype;
        let docId = params.docId;
        let openTime = sessionStorage.getItem('openTime');
        let title = sessionStorage.getItem('title')?sessionStorage.getItem('title'):'PDF文档查看';
        let readTime =parseInt((new Date().getTime()-openTime)/1000);
        let userid = localStorage.getItem('userId');
        let suserid = localStorage.getItem('suserId');
        let closeTime = new Date().getTime();
            
            closeTime= window.fnDate(closeTime);
            openTime =window.fnDate(parseInt(openTime)); 
        //记录浏览文档

        let isecond = suserid==userid?0:1;
        await documentOpen({docId,docType,openTime,readTime,title,userid,closeTime,isecond});
        window.sharePdf("01",docId,title,docId,readTime)
        
       }
     
    render() {
       
        let url = decodeURIComponent(window.location.href).split('.pdf?')[1];
            url = url==undefined?decodeURIComponent(window.location.href).split('Iframe/')[1]:url;
        let  newurl = window.location.href.split('nameUrl=')[1]; 
        let params = window.parseQueryString(decodeURIComponent(url));
        let doctype = params.doctype;
        let isIMG = newurl.indexOf('.jpg' || '.png' || '.gif');


        return (
            <div>
             { doctype==3 ?//文章类
                    <div id="iframe_tu" dangerouslySetInnerHTML={{__html:this.state.htmlMsg}} />
                :
                isIMG!=-1?<img src={decodeURIComponent(newurl)} style={{width:'100%'}}/>:<iframe id="iframe_tu" scrolling="no"  src={decodeURIComponent(newurl)} style={{width:'100%',height:"40rem"}}/>}
             
            </div>
              
                
        )
    }
}

export default withRouter(Iframe)