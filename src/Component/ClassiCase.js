// ClassiCase经典案例
import React  from 'react'
import CommonASK from './CommonASK'
import {withRouter} from 'react-router-dom'
import {PickerView} from 'antd-mobile';
import {provincials,getCaseData,selectData} from './../api/api';
import { Item } from 'antd-mobile/lib/tab-bar';
 class ClassiCase extends React.Component{
    constructor(props){
        super(props)
        console.log("this.props",this.props.match.params.typeid)
        this.state = {
            flatList:[
                {name:'乐享百万(HOST 2018)',title1:"PDF",title2:'2.45M',time:'2019-04-23',IMG:'./static/PDFicon.png'},
                {name:'乐享百万(HOST 2018)',title1:"电子书",title2:'2.45M',time:'2019-04-23',IMG:'./static/shipin.png'},
                {name:'乐享百万(HOST 2018)',title1:"视 频",title2:'2.45M',time:'2019-04-23',IMG:'./static/book_icon.png'},
            ],
            headimgList:["/static/servercase3x.png","/static/payfocaase3x.png"],
            workvaluechange: ['选择省份', '分公司'],
            workvalue:['选择省份', '分公司'],
            productData:null,
            CityData:null,
            isshow:false,
            baseUrl:window.baseUrl,
            istirst:JSON.parse(this.props.match.params.typeid)||0,
          }
    }
    
    componentDidMount() {
      JSON.parse(this.props.match.params.typeid)=="0"?window.pageView("理赔案例详情"):window.pageView("服务案例详情")
        this.getData()
        this.getCityData();
        window.scrollTo(0,0)
        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','精选案例');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('ClassiCase','精选案例')
       }
      closeModel=()=>{
          this.setState({
            isshow:false
          })
      }
    
      closeModelaAnd=()=>{
        JSON.parse(this.props.match.params.typeid)=="0"?window.pageClick("理赔案例-返回"):window.pageClick("服务案例-返回")
          this.closeModel()
          this.setState({
            workvalue:['选择省份', '分公司']
          })
      }
      changeValueAndClose=async()=>{
        JSON.parse(this.props.match.params.typeid)=="0"?window.pageClick("理赔案例-确认"):window.pageClick("服务案例-确认")
        this.closeModel();
        // this.setState({
        //   workvaluechange:this.state.workvalue
        // })
        var provincialId=this.state.workvalue[0];
        var cityId =this.state.workvalue[1];
        if(JSON.parse(this.props.match.params.typeid)==0){
          var selectDatas =  await selectData(3,provincialId,cityId);
        }else{
          var selectDatas =  await selectData(2,provincialId,cityId);
        }
        this.setState({
          productData:selectDatas.data
        })
      }
      getData=async()=>{
        if(JSON.parse(this.props.match.params.typeid)==0){
          var productData =  await getCaseData(3);
        }else{
          var productData =  await getCaseData(2);
        }

        console.log(productData,"nnnnnnnnnnnnnnnnnnnnnnn")
        this.setState({
          productData:productData.data
        })
      }
      getCityData=async()=>{
        let CityData = await provincials();
        this.setState({
          CityData:CityData.data
        })
      }

      gotunewpage = (item)=>{
        window.pageClick(item.title)
        let docId = item.id;//文档id
        let iscamp = item.iscamp;
        let isdoc =item.isdoc;
        let doctype = 1;
        if(iscamp==undefined){//文档
            doctype = isdoc==1? 1:2;
        }
        if(isdoc==undefined){//行销
            doctype = iscamp==null? 1:2;
        }
        if(item.isArticle){//文章
          doctype = 3
        }
       
        localStorage.setItem("docType",doctype)
        localStorage.setItem('docInfo',JSON.stringify(item))
        localStorage.setItem("shareName",item.title);
        localStorage.setItem("shareImg",item.shareImg);
        localStorage.setItem("shareDesc",item.shareDesc);
        
        if(doctype==3){
          return this.props.history.push({
            pathname:`/Iframe/nameUrl=${encodeURIComponent('http://healthy.relywisdom.com?nameid='+item.id+'&doctype='+doctype+'&docId='+docId)}`,
          })
      }else if(item.type=="pdf"||item.type=="book"){
          let URL = encodeURIComponent(`${item.pageUrl}`)
          if(item.pageUrl.substr(0,4)=="http"){
                  this.props.history.push({
                    pathname:`/Iframe/nameUrl=${encodeURIComponent('http://health.arvate-top.com/html/pdfview.html?file='+URL+'?doctype='+doctype+'&docId='+docId)}`,
                  })
              }else{
                  this.props.history.push({
                    pathname:`/Iframe/nameUrl=${encodeURIComponent('http://health.arvate-top.com/html/pdfview.html?file='+this.state.baseUrl+URL+'?doctype='+doctype+'&docId='+docId)}`,
                  })
          }
      }else if(item.type=="video"||item.type=="image"){
        if(item.pageUrl.substr(0,4)=="http"){
          let URL = encodeURIComponent(item.pageUrl)
          if(URL.indexOf("weixin.qq.com")==-1){
              this.props.history.push({
                  pathname:`/Iframe/nameUrl=${URL+'?doctype='+doctype+'&docId='+docId}`,
              })
          }else{window.open(`${item.pageUrl}`);}
      }else{
          let URL = encodeURIComponent(this.state.baseUrl+item.pageUrl)
          this.props.history.push({
              pathname:`/Iframe/nameUrl=${URL+'?doctype='+doctype+'&docId='+docId}`,
             })
      }
      }else if(item.type=="链接"||item.type==null){
        return  window.open(`${item.pageUrl}`);
          let URL = item.pageUrl;
              if(URL.indexOf('.aiwall.com')!=-1||URL.indexOf('weixin.qq.com')!=-1||URL.indexOf('h5.rc288.com')!=-1||URL.indexOf('book')!=-1||URL.indexOf('eqxiu.com')!=-1){
                  window.open(`${item.pageUrl}`);
              }else{
                  this.props.history.push({
                      pathname:`/Iframe/${doctype}/${docId}/${URL}`,
                  })
              }
      }
  }
    render(){
        let {headimgList,seasons,isshow,istirst,productData} =this.state;
        return (
            <div style={{flex:1,width:'100%',heiht:'100%'}}>
              <CommonASK/>
                <div style={{marginBottom:'1.5rem'}}>
                    <img src={headimgList[istirst]} alt="" style={{width:'100%'}}/>
                </div>

                <div>
                    {/* <div className="pickerItem">
                        <div className="pickerCenter" onClick={()=>this.setState({isshow:true})}>
                            <p className="showVueITEM">{this.state.workvaluechange.join("-")}</p>
                            <img src="/static/downing.png"  className="backimg"/>
                        </div>
                    </div> */}
                    <div>
                    {productData&&productData.map((v,i)=>{
                        return <div className="key_ser_TOP" key={i} onClick={()=>this.gotunewpage(v)}>
                            <div className='key_ser_t_item'>
                                {/* {i==0&&<div className='key_ser_t_top'>
                                    <img src="./static/NEW.png" alt="" style={{width:'2rem'}}/>
                                </div>} */}
                                <div className='key_ser_t_bottom'>
                                    <div style={{ width: '20%' }}>
                                        {
                                            v.type=='pdf'?<img src={'/static/PDFicon.png'} style={{ width: '34px',height:"41px" }} />:
                                            v.type=='pdt'?<img src={'/static/shipin.png'} style={{ width: '30px',height:"27px" }} />:<img src={'/static/book_icon.png'} style={{width: '27px',height:"33px" }} />
                                        }
                                    </div>
                                    <div className="key_ser_t_b_left" style={{ width: '80%' }}>
                                        <p className="leftclass">{v.title}</p>
                                        <div className='key_ser_t_right'>
                                            <div className="TextItemend">
                                                <p style={{ color: "#646C80" }}>{v.type&&v.type.toUpperCase()}</p>
                                                <div style={{ width: 2, height: '1rem', background: "#646C80", marginLeft: '1rem', display: 'flex' }}></div>
                                                <p style={{ color: "#646C80" ,marginLeft: '1rem',}}>{v.resSize}</p>
                                                {/* <span style={{ color: "#646C80" }}>{item.time}</span> */}
                                            </div>
                                            <div style={{ color: "#646C80" ,fontSize:"10px"}}>{v.addTime&&v.addTime.substr(0,10)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                    {productData&&<div style={{fontSize:"12px",color:"#646C80",fontFamily:'PingFangSC-Regular',paddingBottom:"12px",textAlign:"center"}}>已经到底啦</div>}
                    </div>
                  
                    {isshow&&<div>
                    <div id="showtop"
                    //  onClick={this.closeModel}
                    style={{width:'100%',height:'100%',background:"#000",
                            position:'absolute',top:'0',zIndex:999,opacity:0.5,
                            display:isshow?'block':'none'}}>
                    </div>
                    <div style={{width:'100%',height:'18rem',position:'fixed',bottom:0,zIndex:99999,background:"#fff", display:isshow?'block':'none'}}>
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

                
                {/* <FlatListItem flatList={this.state.flatList}/> */}
            </div>
        )
    }
}
export default withRouter(ClassiCase)