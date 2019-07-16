

import React from 'react'
import CommonASK from './CommonASK'
import { Link, withRouter } from 'react-router-dom'
import NewFlatList from './NewFlatList'
import {prodlist} from '../api/api'
// 关键详情

class KeyServersMsg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list:[],
            storagedata:{},
            baseUrl:""
        }
    }
    componentWillMount() {
        let serviceList = window.localStorage.getItem('serviceList');
        this.setState({
            storagedata:JSON.parse(serviceList)
        })
    }
    componentDidMount() {
        this.getdata(1)
        window.scrollTo(0,0)

        // window.getTestWxShareConfig();
        var a={
            title:"关键服务-详情好友",
            desc: "关键服务-详情好友",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        var b={
            title:"关键服务-详情朋友圈",
            desc: "关键服务-详情朋友圈",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        window.wxshare(a,b)
        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','关键服务--详情');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('keyServersMsg','关键服务文档列表')
       }
    getdata = async ()=>{
        let data =`?pdtType=1&pdtId=${this.state.storagedata.id}`
        let res = await prodlist(data);
        this.setState({
            baseUrl:res.baseUrl
        })
        let datass = res.data;
        let datalistArr = [];
        datass.map(item=>{
            datalistArr.push({
                name:item.title,
                title1:item.type,
                type:item.type,
                title2:item.resSize,
                time:item.addTime,
                IMG:'./static/PDFicon.png',
                pageUrl:item.pageUrl,
                fileType:item.fileType,
                iscamp:item.iscamp,
                isdoc:item.isdoc,
                isArticle:item.isArticle,
                id:item.id,
                shareDesc:item.shareDesc
            })
        })


        this.setState({
            list:datalistArr
        })
    }
    render() {
        let {title,proid,name,id_types,img,description} = this.state.storagedata;
        return (
            <div style={{ flex: 1, width: '100%', heiht: '100%' }}>
                <CommonASK />
                <div className="key_server">
                    <div>
                    <div className="key_ser_topImg">
                        {
                            img.substr(0,4)=="http"?<img src={img} style={{ width: "100%" }} />:
                            <img src={this.state.baseUrl+img} style={{ width: "100%" }} />
                        }
                    </div>
                    <TextItem name={title||'太保蓝'} title1={description||''} title2={''} />
                    <NewFlatList flatList={this.state.list}  baseUrl={this.state.baseUrl}/>
                    </div>
                    {this.state.list.length>0&&<div style={{fontSize:"12px",color:"#646C80",fontFamily:'PingFangSC-Regular',paddingBottom:"12px"}}>已经到底啦</div>}
                  
                </div>
            </div>
        )
    }
}
export default withRouter(KeyServersMsg)


class TextItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            title1: this.props.title1,
            title2: this.props.title2
        }
    }
    render() {
        let { name, title1, title2 } = this.state;
        return (
            <div className="TextItem">
                <p style={{fontWeight:"bold",fontSize:"18px"}}>{name}</p>
                <div style={{height:"12px",border:"1px solid #ccc",marginLeft:"10px",marginRight:"10px"}}></div>
                <p style={{fontSize:"14px"}}>{title1}</p>
            </div>
        )
    }
}


