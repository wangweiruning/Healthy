import React from 'react';
import '../css/allstyle.css';
import {withRouter,Link} from 'react-router-dom'
//公共组件 图片+ 文字
 class ItemCommPicList extends React.Component{
    constructor(porps){
        super(porps)
        this.state={
            datalist:this.props.listDATA,
            baseUrl:"",
            caseImg:""
        }
    }
    componentWillReceiveProps(prv){
    this.setState({
        datalist:prv.listDATA,
        baseUrl:prv.baseUrl,
        caseImg:prv.caseImg
    })
    }
    componentDidMount(){
    }
    gotuRouter=(v)=>{
        if(v.type&&v.type=='pdf'||v.type&&v.type=='book'){
            window.pageClick("首页-"+v.title)
            if(v.pageUrl.substr(0,4)=="http"){
                window.open(`http://health.arvate-top.com/html/pdfview.html?file=${v.pageUrl}`)
            }
            window.open(`http://health.arvate-top.com/html/pdfview.html?file=${this.props.baseUrl+v.pageUrl}`);
        }else if(v.type&&v.type=="链接"){
            window.pageClick("首页-"+v.title)
            window.open(v.pageUrl)
        }else if(v.type&&v.type=="video"||v.type=="image"){
            window.pageClick("首页-"+v.title)
            if(v.pageUrl.substr(0,4)=="http"){
                window.open(`${v.pageUrl}`)
            }
            window.open(`${this.props.baseUrl+v.pageUrl}`);
        }else if(v.search=="1"){
            let tt = { 
            id: v.id,
            proid:3,
            title:v.name,
            name:v.name,
            img:v.extensionImg,
            priority:v.priority,
            id_types:1,
            starLevel:v.starLevel,
            description:v.description
        } ;
            window.pageClick("首页-"+v.name)
            window.localStorage.setItem('serviceList',JSON.stringify(tt));
            this.props.history.push({pathname:`/KeyServersMsg1`,query:{name : v.name,proid:v.proid,id:v.id,img:v.img }})

        }else{
            let tt = { 
                id: v.id,
                proid:3,
                title:v.name,
                name:v.name,
                img:v.extensionImg,
                priority:v.priority,
                id_types:1,
                starLevel:v.starLevel,
                description:v.description
            } ;
            window.localStorage.setItem('serviceList',JSON.stringify(tt));
            if(this.props.type=="product"){
                window.pageClick("首页-"+v.title)
                let ss= JSON.stringify({id:v.id,imgSrc:v.img,title:v.title,starLevel:v.starLevel})
                localStorage.setItem("regionList",ss)
                this.props.history.push({pathname:`/HotProduct`})
            }else if(this.props.Types=="case"){
                v.name=="1"?window.pageClick("首页理赔案例"):window.pageClick("首页服务案例")
                
                // let ss= encodeURIComponent(JSON.stringify({id:v.id,imgSrc:v.img,title:v.title,starLevel:v.starLevel}))
                this.props.history.push({pathname:`/ClassiCase/${v.name}`})
            }
            else{
                
                this.props.history.push({pathname:`${v.router}`,query:{name : v.name,proid:v.proid,id:v.id,img:v.img }})
            }
        }
        
    }
    gotospecialist(v,i){
        i==0?window.pageClick("首页健康篇"):
        i==1?window.pageClick("首页产品篇"):window.pageClick("首页服务篇")
        this.props.history.push({pathname:`${v}/${i}`})
    }
    render(){
        let arrs= this.state.datalist;
        let isarr = arrs.constructor == Array;
        return(
        <div style={{flex:1,justifyItems:'center',alignItems:'center'}}>
            {
        isarr?this.state.datalist.map((v,i)=> <span onClick={()=>this.gotuRouter(v)} style={{marginLeft:"10px"}} className='commitema' key={i}>
        <div className="every_div" style={{position:'relative',top:0,width:'46%',textAlign:'center',paddingLft:'0.3rem',borderRadius:'0.2rem'}}>
            {
                v.topimg&&<div style={{position:'absolute',left:0,top:"2.5rem",width:'100%',textAlign:'center',display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"5px",overflow:"hidden"}}>
                    {v.type=="pdf"?<img src={"./static/PDFicon.png"} style={{width:'31px'}}/>:<img src={"./static/playVideo.png"} style={{width:'35px'}}/>}
                </div>
            }
            <div style={{width:"100%",height: this.props.Types=="case"?"":"",borderRadius:"6px"}}>
                
            {
                this.props.Types=="case"?<img src={`${v.img}`} style={{width:'100%',height:""}}/>:

                v.img&&v.img.substr(0,4)=="http"?<img src={v.img} alt={v.title} style={{width:'100%'}}/>:

                !v.img?<img src={"./static/default.png"} style={{width:'100%'}}/>:<img src={`${this.state.baseUrl}${v.img}`} style={{width:'100%'}}/>
            }
            {this.props.Types=="case"?"":<p className="listTitleOf" >{v.title}</p>}
           </div>
        </div>
        
        </span>):
        <div style={{ display: 'flex',flex:1,flexDirection:'row',alignItems:'center'}}>
            <span style={{ width:'48%',paddingLeft:'10px'}}>
                <img src={arrs.img} alt="" style={{width:'100%'}} onClick={()=>this.gotospecialist(arrs.router,0)}/>
            </span>
            
            <div style={{display:"flex",width:'46%',flexDirection:'column',marginLeft:'10px'}}>
                <img src={arrs.img1} alt="" style={{width:'100%',marginBottom:"10px"}}  onClick={()=>this.gotospecialist(arrs.router,1)}/>
                <img src={arrs.img2} alt="" style={{width:'100%'}}  onClick={()=>this.gotospecialist(arrs.router,2)}/>
            </div>
        </div>
    }
        </div>)
    }
}

export default withRouter(ItemCommPicList)