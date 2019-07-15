
import React from 'react'
import CommonASK from './CommonASK'
import { Link, withRouter } from 'react-router-dom'
import NewFlatList from './NewFlatList'
import {prodlist,provincials,selectData1} from '../api/api'
import {PickerView} from 'antd-mobile';
// 关键详情

class KeyServersMsg1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list:[],
            storagedata:{},
            workvaluechange: ['选择省份', '分公司'],
            workvalue:['选择省份', '分公司'],
            baseUrl:"",
            CityData:null,
            isshow:false,
        }
    }
    componentWillMount() {
        let serviceList = window.localStorage.getItem('serviceList');
        this.setState({
            storagedata:JSON.parse(serviceList)
        })
    }
    componentDidMount() {
        // window.goto()
        window.pageView("关键服务详情")
        this.getCityData();
        this.getdata(1)
        window.scrollTo(0,0)
        // window.getTestWxShareConfig();
     
        let root = this.refs.root;
        root.addEventListener("touchstart",this.rootTouchStart=(e)=>{
             let t = e.target;
             if(t.id == "showtop"){
                 e.stopPropagation();
                 e.preventDefault()
             }
        });
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
    }
    componentWillUnmount(){
        let root = this.refs.root;
        root.removeEventListener("touchstart",this.rootTouchStart);
    }
    closeModel=()=>{
        this.setState({
          isshow:false
        })
    }

    closeModelaAnd= async()=>{
        window.pageClick("关键服务-返回")
        this.closeModel()
        await this.setState({
          workvalue:['选择省份', '分公司'],
          workvaluechange:['选择省份', '分公司']
        })
        this.getdata(1)
    }
    changeValueAndClose=async()=>{
        window.pageClick("关键服务-确认")
        this.closeModel();
        // this.setState({
        //   workvaluechange:this.state.workvalue
        // })
        var provincialId=this.state.workvalue[0];
        var cityId =this.state.workvalue[1];
        var selectDatas =  await selectData1(this.state.storagedata.id,provincialId,cityId,1);
        
        let datass = selectDatas.data;
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
                id:item.id
            })
        })
        this.setState({
          list:datalistArr
        })
      }
    getCityData=async()=>{
        let CityData = await provincials();
        this.setState({
          CityData:CityData.data
        })
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
                id:item.id
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
                <div className="key_server" ref={"root"}>
                    <div>
                    <div className="key_ser_topImg">
                        {
                            img&&img.substr(0,4)=="http"?<img src={img} style={{ width: "100%" }} />:
                            <img src={this.state.baseUrl+img} style={{ width: "100%" }} />
                        }
                    </div>
                    <TextItem name={title||'太保蓝'} title1={description||''} title2={''} />
                    <div className="pickerItem">
                        <div className="pickerCenter" onClick={()=>{window.pageClick("关键服务-选择公司");this.setState({isshow:true})}}>
                            <p className="showVueITEM">{this.state.workvaluechange.join("-")}</p>
                            <img src="/static/downing.png"  className="backimg"/>
                        </div>
                    </div>
                    <NewFlatList flatList={this.state.list}  baseUrl={this.state.baseUrl}/>
                    </div>
                    {this.state.list.length>0&&<div style={{fontSize:"12px",color:"#646C80",fontFamily:'PingFangSC-Regular',paddingBottom:"12px"}}>已经到底啦</div>}
                    
                    {this.state.isshow&&<div>
                    <div id="showtop"
                    //  onClick={this.closeModel}
                    style={{width:'100%',height:'100%',background:"#000",
                            position:'absolute',top:'0',zIndex:999,opacity:0.5,
                            display:this.state.isshow?'block':'none'}}>
                    </div>
                    <div style={{width:'100%',height:'18rem',position:'fixed',bottom:0,zIndex:99999,background:"#fff", display:this.state.isshow?'block':'none'}}>
                        <div className="issure">
                            <p onClick={this.closeModelaAnd} style={{color:"#108ee9",fontSize:'1rem',marginLeft:'-2rem'}}>返回</p>
                            <p style={{color:"#000"}}>选择公司</p>
                            <p onClick={()=>{this.changeValueAndClose()}} style={{color:"#108ee9",fontSize:'1rem',marginRight:'-2rem'}}>确认</p>
                        </div>
                        {
                          this.state.CityData && 
                          <PickerView
                            data={this.state.CityData}
                            value={this.state.workvalue}
                            onChange={(v,i)=>{
                              this.state.CityData&&this.state.CityData.map((a,b)=>{
                                if(v[0]==a.value){
                                  var provincial=[];
                                  provincial.push(a.label);
                                  // a.children.map((c,d)=>{
                                  //   if(v[1]==c.value){
                                  //     provincial.push(c.label);
                                  //   }
                                  // })
                                  this.setState({workvaluechange:provincial})
                                  console.log(provincial,"provincial")
                                }
                                
                              })
                              this.setState({workvalue:v})
                            }
                            }
                            />
                        } 
                    </div>
                    </div>}
                </div>
            </div>
        )
    }
}
export default withRouter(KeyServersMsg1)


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


