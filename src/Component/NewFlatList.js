
import React from 'react'

import { withRouter } from 'react-router-dom'

class NewFlatList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: this.props.flatList
        }
    }
    componentWillReceiveProps(nex){
        this.setState({list:nex.flatList})
    }
    gotunewPage = (item) =>{
        console.log(item,"nnnnnnnnooooooooonnnnnnn")
        localStorage.setItem('docInfo',JSON.stringify(item))
        localStorage.setItem("shareName",item.name)
        localStorage.setItem("shareImg",item.shareImg)
        localStorage.setItem("shareDesc",item.shareDesc);
        let docId = item.id?item.id:0;
        window.pageClick(item.name)
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
                      pathname:`/Iframe/nameUrl=${encodeURIComponent('http://health.arvate-top.com/html/pdfview.html?file='+this.props.baseUrl+URL+'?doctype='+doctype+'&docId='+docId)}`,
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
            let URL = encodeURIComponent(this.props.baseUrl+item.pageUrl)
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
    render() {
        let {list} = this.state;
        return (
            <div className="key_server">
                {list&&list.map((item,index)=>{
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
                                            item.type=='video'?<img src={'/static/shipin.png'} style={{width: '30px',height:"27px"  }} />:<img src={'/static/book_icon.png'} style={{ width: '27px',height:"33px"  }} />
                                        }
                                    </div>
                                    <div className="key_ser_t_b_left" style={{ width: '80%' }}>
                                        <p className="leftclass">{item.name}</p>
                                        <div className='key_ser_t_right'>
                                            {item.title1&&item.title2&&<div className="TextItemend">
                                                <p style={{ color: "#646C80" }}>{item.title1&&item.title1.toUpperCase()||'链接'}</p>
                                                <div style={{ width: 2, height: '1rem', background: "#646C80", marginLeft: '1rem',    marginTop:' 0.2rem' ,display: 'flex' }}></div>
                                                <p style={{ color: "#646C80",marginLeft: '1rem', }}>{item.title2||'暂无'}</p>
                                                {/* <span style={{ color: "#646C80" }}>{item.time}</span> */}
                                            </div>}
                                            {item.title1&&item.title2&&<div style={{ color: "#646C80" ,fontSize:"10px"}}>{item.time&&item.time.substr(0,10)}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default withRouter(NewFlatList)