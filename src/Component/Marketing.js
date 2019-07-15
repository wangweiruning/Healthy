
import React from 'react'
import { withRouter } from 'react-router-dom'
import {product} from './../api/api'
import CommonASK from './CommonASK'
// tab 切换组件


class Marketing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datalist:[],
            thisIndex:0,
            baseUrl:"",
            headimgList:["./static/healthyig.png","./static/pro3x.png","./static/serv3x.png"],
        }
       
    }

    gotomarker = (v)=>{
        window.pageClick("行销宣传-"+v.name)
        window.localStorage.setItem('marketingid',v.id);
        let ss = JSON.stringify({id:v.id,imgSrc:v.smallImg,title:v.name,starLevel:v.starLevel})
        localStorage.setItem("marketlist",ss)
        this.props.history.push({pathname:`/MarketingList`})
    }

    componentDidMount(){
        this.getData();
        window.pageView("/行销宣传")
        // window.getTestWxShareConfig();
        var a={
            title:"行销宣传-详情好友",
            desc: "行销宣传-详情好友",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        var b={
            title:"行销宣传-详情朋友圈",
            desc: "行销宣传-详情朋友圈",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        window.wxshare(a,b)
        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','行销宣传');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('Marketing','行销宣传列表')
       }
    async getData(){
        let data = await product();
        this.setState({
            datalist:data.data,
            baseUrl:data.baseUrl
        })
    }
    render() {
        let {datalist} = this.state;
        console.log(this.state.datalist,datalist)
        return(
            <div>
                <CommonASK/>
            {this.state.datalist&&this.state.datalist.map((v,i)=>{
                        return <div onClick={()=>{
                            this.gotomarker(v)
                        }} style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <div style={{width:"96%",height:"100%",marginTop:"7px",marginBottom:"7px"}}>
                                    {/* <img style={{width:"100%"}} src={v.smallImg}/> */}
                                    {
                                        v.smallImg.substr(0,4)=="http"?<img style={{width:"100%"}} src={v.smallImg}/>:
                                        <img style={{width:"100%"}} src={this.state.baseUrl+v.smallImg}/>
                                    }
                                    <p style={{fontSize:"18px",fontWeight:"bold"}}>{v.name}</p>
                                    <p style={{color:"#b5b1b1",marginTop:"5px"}}>{v.description}</p>
                                </div>
                            </div>
                    })}
            </div>
          )
            
    }
}

export default withRouter(Marketing)

 