import React from 'react';
import '../css/allstyle.css';
import { withRouter, Link } from 'react-router-dom'
// 核保助手



class Assistant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    componentDidMount(){
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
        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','核保助手');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('Assistant','核保助手')
       }
    selectPeople = (kk)=>{
        this.props.history.push(`/Slectware/${kk}`)
    }

    render() {
        return (
            <div style={{backgroundColor:"white"}}>
                {/* <TitleHe TitleText="核保助手" /> */}
                {/* <div style={{width:"100%",height:"4rem"}}></div> */}
                <div style={{padding:'2rem'}}>
                    <h2 style={{textAlign:'center',letterSpacing: '-1px',fontSize:'1.5rem'}}>请选择<span style={{color:"#007AFF",fontSize:"1.5rem"}}>男女</span></h2>
                </div>
                
                <div style={{margin:'2rem auto',width:"40%"}} onClick={()=>this.selectPeople(1)}>
                    
                    <img src='./static/man3x.png'  width="100%"/>
                </div>
                <div  style={{margin:'2rem auto',width:"40%"}} onClick={()=>this.selectPeople(2)}>
                    <img src='./static/woman3x.png' width="100%"/>
                </div>
            </div>
        )
    }

}

export default withRouter(Assistant)