

import React  from 'react'
import {Link,withRouter} from 'react-router-dom'
 class ShowQuestion extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          }
    }
  
  
    componentDidMount(){
        window.pageView(this.props.location.query.subitem.content)
        window.getTestWxShareConfig();
        var a={
            title:"问题详情",
            desc: "问题详情",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        var b={
            title:"问题详情",
            desc: "问题详情",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        window.wxshare(a,b)
        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','问题详情');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('ShowQUestion','问题详情')
       }
    onChange = (key) => {
        console.log(key);
    }

    render(){
       let {subitem,type} = this.props.location.query;
        return (
            <div style={{flex:1,width:'100%',heiht:'100%'}}>
                <div style={{color:"#000",fontSize:"1rem",margin:'1rem',borderBottom: '1px solid #d6e3ef',paddingBottom:"1rem"}}>
                    {subitem.content}
                </div>
                <div style={{color:"#a5acb3",padding:'0 1rem'}}>
                    {subitem.replyContent}
                </div>
         </div>
        )
    }
}
export default withRouter(ShowQuestion)
