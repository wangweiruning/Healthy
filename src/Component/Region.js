
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {product} from './../api/api'
import CommonASK from './CommonASK'

// tab 切换组件


class Region extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datalist:[],
            baseUrl:"",
            thisIndex:0,
            headimgList:["./static/healthyig.png","./static/pro3x.png","./static/serv3x.png"],
        }
       
    }

    gotuMsgPage = (rootname,typeid)=>{
        this.props.history.push({pathname:`${rootname}/${typeid}`})
    }

    componentDidMount(){
        window.pageView("/热门产品列表")
        this.getData();
        // window.getTestWxShareConfig();
        var a={
            title:"热门产品列表-详情好友",
            desc: "热门产品列表-详情好友",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        var b={
            title:"热门产品列表-详情朋友圈",
            desc: "热门产品列表-详情朋友圈",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        window.wxshare(a,b)
        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','热门产品');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('Region','热门产品列表')
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
        return(
            <div>
              <CommonASK />  
            <div >
            {this.state.datalist&&this.state.datalist.map((v,i)=>{
               return <div onClick={()=>{
                let ss= JSON.stringify({id:v.id,imgSrc:v.smallImg,title:v.name,starLevel:v.starLevel})
                localStorage.setItem("regionList",ss)
                   window.pageClick("热门产品-"+v.name)
                  this.props.history.push({pathname:`/HotProduct`})
               }} style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <div style={{width:"96%",height:"100%",marginTop:"7px",marginBottom:"7px"}}>
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
            </div>
        )
            
    }
}

export default withRouter(Region)

 