import React from 'react';
import '../css/allstyle.css';
import { withRouter, Link } from 'react-router-dom'
import URL from './../api/serviceAPI.config'



class Slectware extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: false
        }
    }
 componentDidMount(){
    window.getTestWxShareConfig();
    var a={
        title:"核保疾病选择",
        desc: "核保疾病选择",
        link: window.location.href,
        imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
    }
    var b={
        title:"核保疾病选择",
        desc: "核保疾病选择",
        link: window.location.href,
        imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
    }
    window.wxshare(a,b)
    localStorage.setItem('pageIdnew',window.returnNewUrl());
    localStorage.setItem('titlenew','病例选择');
    localStorage.setItem('readTimenew',new Date().getTime());
   }
 
   componentWillUnmount(){
     window.openPages('Slectware','病例选择')
   }
    gotoJiBing = (kk=1)=>{        
        let id = this.props.match.params.id;
        let ip = URL.http;
        switch(kk){
            case  1:            
                 this.props.history.push({pathname:`/ShowPic/${id==1?'huxi_man':"huxi_man_wo"}`})
                break;
            case  2:
                this.props.history.push({pathname:`/ShowPic/${id==1?'xiaohua_man':"xiaohua_man_wo"}`})
                break;
            case  3:
                this.props.history.push({pathname:`/ShowPic/${id==1?'xinzhang_man':"xinzhang_man_wo"}`})
                break; 
            case  4:
                this.props.history.push({pathname:`/ShowPic/${id==1?'wuguan_man':"wuguan_man_wo"}`})
                break;
            case  5:
                this.props.history.push({pathname:`/ShowPic/${id==1?'fifu_man':"fifu_man_wo"}`})
                break;
            case  6:
                this.props.history.push({pathname:`/ShowPic/${id==1?'shenjn_man':"shenjn_man_wo"}`})
                break;
            case  7:
                this.props.history.push({pathname:`/ShowPic/${id==1?'neifenmi_man':"neifenmi_man_wo"}`})
                break; 
            case  8:
                this.props.history.push({pathname:`/ShowPic/${id==1?'miliao_man':"miliao_man_wo"}`})
                break;
            case  9:
                this.props.history.push({pathname:`/ShowPic/${id==1?'guuge_nam':"guuge_nam_wo"}`})
                break;
            case  10:
                this.props.history.push({pathname:`/ShowPic/${id==1?'zhongliiu_man':"zhongliiu_man_wo"}`})
                break;
            case  11:
                this.props.history.push({pathname:`/ShowPic/${id==1?'xueye_man':"xueye_man_wo"}`})
                break; 
            case  12:
                this.props.history.push({pathname:`/ShowPic/${id==1?'jidi_man':"jidi_man_wo"}`})
                break;
            case  13:
                this.props.history.push({pathname:`/ShowPic/${id==1?'waishang_man':"waishang_man_wo"}`})
                break;
            case  14:
                this.props.history.push({pathname:`/ShowPic/${id==1?'xiantian_man':"xiantian_man_wo"}`})
                break;
            case  15:
                this.props.history.push({pathname:`/ShowPic/${id==1?'woman_all':"woman_all"}`})
                break;
           default:
               break;
        }
    }
    render() {
        let id = this.props.match.params.id;
        return (
            <div>
                {/* <TitleHe TitleText="核保助手" img={'/static/blueback.png'}/> */}
                {/* <div style={{width:"100%",height:"4rem"}}></div> */}
                <div style={{padding:'2rem',backgroundColor:"white"}}>
                    <h2 style={{textAlign:'center',letterSpacing: '-1px',fontSize:'1.5rem'}}>请选择<span style={{color:"#007AFF",fontSize:'1.5rem'}}>疾病</span></h2>
                </div>

                <div className="cent_mens">
                    <ul className="cent_mens_left" style={{zIndex:22}}>
                        <li className="center_li_item" onClick={()=>this.gotoJiBing(1)}>呼吸系统</li>
                        <li className="center_li_item" onClick={()=>this.gotoJiBing(2)}>消化系统疾病</li>
                        <li className="center_li_item" onClick={()=>this.gotoJiBing(3)}>心脏、血管疾病</li>
                        <li className="center_li_item" onClick={()=>this.gotoJiBing(4)}>五官疾病</li>
                        <li className="center_li_item" onClick={()=>this.gotoJiBing(5)}>皮肤及感染</li>
                        <li className="center_li_item" onClick={()=>this.gotoJiBing(6)}>神经系统</li>
                        <li className="center_li_item" onClick={()=>this.gotoJiBing(7)}>内分泌系统</li>
                    </ul>
                     <div className="cent_mens_center" style={{position:'relative',width:id==1?"45%":"45%",height:'100%'}}>
                        {id==1&&<img src="/static/man_fist.png" width="100%" height="100%"/>}
                        {id==2&&<img src="/static/wuman.png" width="100%" height="100%"/>}
                        </div>
                    <ul className="cent_mens_right">
                        {id==2&&<li className={id==2?"center_li_item_wo":"center_li_item"} onClick={()=>this.gotoJiBing(15)}>女性疾病</li>}
                        <li className={id==2?"center_li_item_wo":"center_li_item"} onClick={()=>this.gotoJiBing(8)}>泌尿系统</li>
                        <li className={id==2?"center_li_item_wo":"center_li_item"} onClick={()=>this.gotoJiBing(9)}>骨骼、肌肉、关节</li>
                        <li className={id==2?"center_li_item_wo":"center_li_item"} onClick={()=>this.gotoJiBing(10)}>良恶性肿瘤</li>
                        <li className={id==2?"center_li_item_wo":"center_li_item"} onClick={()=>this.gotoJiBing(11)}>血液疾病</li>
                        <li className={id==2?"center_li_item_wo":"center_li_item"} onClick={()=>this.gotoJiBing(12)}>结缔组织疾病</li>
                        <li className={id==2?"center_li_item_wo":"center_li_item"} onClick={()=>this.gotoJiBing(13)}>外伤</li>
                        <li className={id==2?"center_li_item_wo":"center_li_item"} onClick={()=>this.gotoJiBing(14)}>先天遗传疾病</li>
                    </ul>
                </div>
               
            </div>
        )
    }

}

export default withRouter(Slectware)