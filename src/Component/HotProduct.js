import React  from 'react'
import CommonASK from './CommonASK'
import CommonTab from './CommonTab';
import {Link,withRouter} from 'react-router-dom';

 class HotProduct extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            datalist:[
                {title:'下发资料',img:'./static/blueTEE.png',router:'/KeyServices',dataType:"DOWN"},
                {title:'辅助资料',img:'./static/orange.png',router:'/KeyServices',dataType:"AUXILIARY"},
                // {title:'营销类',img:'./static/pink.png',router:'/KeyServices',dataType:"PROPAGATE"},
            ],
            headimgList:["./static/prodct3x.png","./static/prodct3x.png","./static/prodct3x.png"]
          }
    }
    
    componentDidMount() {
        // window.getTestWxShareConfig();
        var a={
            title:"核保选择-详情好友",
            desc: "核保选择-详情好友",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        var b={
            title:"核保选择-详情朋友圈",
            desc: "核保选择-详情朋友圈",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        window.wxshare(a,b)
        localStorage.getItem("dataTypes")=="AUXILIARY"?window.pageView("热门产品详情-辅助资料"):window.pageView("热门产品详情-下发资料")
        window.scrollTo(0,0);
        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','产品列表');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('HotProduct','热门产品文档列表')
       }
    render(){
        // let data=decodeURIComponent(this.props.match.params.data)
        let data= localStorage.getItem("regionList");
        if(!data) {
            this.props.history.push({pathname:`/`})
            return false;
        }
        return (
            <div style={{flex:1,width:'100%',heiht:'100%'}}>
                <CommonASK />
              <CommonTab datalist={this.state.datalist} headimgList={this.state.headimgList} canShowStar={true} data={data}/>
            </div>
        )
    }
}
export default withRouter(HotProduct)