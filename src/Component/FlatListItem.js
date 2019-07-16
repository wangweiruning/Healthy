

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {productDetail} from './../api/api';
class FlatListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            baseUrl:""
        }
    }
    componentDidMount(){
        this.getData()
    }
    componentWillReceiveProps(nex){
        this.getData()
        this.setState({dataType:nex.dataType})
    }
    gotunewPage = (item) =>{
        window.pageClick(item.title);
        let docId =item.id;
        let iscamp = item.iscamp;
        let isdoc =item.isdoc;
        let doctype = 1;
        if(iscamp==undefined){
            doctype = isdoc==1? 1:2;
        }
        if(isdoc==undefined){
            doctype = iscamp==null? 1:2;
        }
        if(item.isArticle){//文章
            doctype = 3
          }
        localStorage.setItem("docType",doctype)
        localStorage.setItem('docInfo',JSON.stringify(item));
        localStorage.setItem("shareName",item.title?item.title:'健康险专栏-保障您的权益')
        localStorage.setItem("shareImg",item.shareImg)
        localStorage.setItem("shareDesc",item.shareDesc);

        if(doctype==3){
            return this.props.history.push({
                pathname:`/Iframe/nameUrl=${encodeURIComponent('http://healthy.relywisdom.com?nameid='+item.id+'&doctype='+doctype+'&docId='+docId)}`,
            })
        }
        
        if(item.type=="pdf"||item.type=="book"){
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
    async getData(){
        let datas=await productDetail(this.props.id,this.props.dataType,0);
        this.setState({
            list:datas.data,
            baseUrl:datas.baseUrl
        })
        console.log(datas,"datas")
    }
    render() {
        let {list} = this.state;
        return (
            <div className="key_server">
                {list.length>0&&list.map((item,index)=>{
                    return (
                        <div className="key_ser_TOP" onClick={()=>this.gotunewPage(item)} key={index+'healthy'}>
                            <div className='key_ser_t_item'>

                                {/* {index==0&&<div className='key_ser_t_top'>
                                    <img src="./static/NEW.png" alt="" style={{width:'50px'}}/>
                                </div>} */}
                                
                                <div className='key_ser_t_bottom'>
                                    <div style={{ width: '20%' }}>
                                        {
                                            item.type=='pdf'?<img src={'/static/PDFicon.png'} style={{ width: '34px',height:"41px" }} />:
                                            item.type=='video'?<img src={'/static/shipin.png'} style={{ width: '30px',height:"27px" }} />:<img src={'/static/book_icon.png'} style={{ width: '27px',height:"33px" }} />
                                        }
                                    </div>
                                    <div className="key_ser_t_b_left" style={{ width: '80%' }}>
                                        <p className="leftclass">{item.title}</p>
                                        {item.resSize&&<div className='key_ser_t_right'>
                                            <div className="TextItemend">
                                                <p style={{ color: "#646C80" }}>{item.type&&item.type.toUpperCase()}</p>
                                                <div style={{ width: 2, height: '1rem', background: "#646C80", marginLeft: '1rem', display: 'flex' }}></div>
                                                <p style={{ color: "#646C80" ,marginLeft: '1rem',}}>{item.resSize}</p>
                                            </div>
                                            <div style={{ color: "#646C80" ,fontSize:"10px"}}>{item.addTime&&item.addTime.substr(0,10)}</div>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                
                {list.length>0&&<div style={{fontSize:"12px",color:"#646C80",fontFamily:'PingFangSC-Regular',paddingBottom:"12px",textAlign:"center"}}>已经到底啦</div>}
            </div>
        )
    }
}

export default withRouter(FlatListItem)