

import React  from 'react'
import { Button,TextareaItem } from 'antd-mobile'

import {UploadFile,addQuestion} from './../api/api'
import URL from './../api/serviceAPI.config'
 class PutQuestion extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            datalist:[
                {name:'产品',id:1},
                {name:'运营',id:2},
                {name:'销售',id:3},
                {name:'服务',id:4},
                {name:'其他',id:5}
            ],
            indexkey:0,
            defaultValueMore:'',
            imagearr:[]
          }
    }
  
    componentDidMount() {
        // window.getTestWxShareConfig();
        var a={
            title:"答疑解惑-详情好友",
            desc: "答疑解惑-详情好友",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        var b={
            title:"答疑解惑-详情朋友圈",
            desc: "答疑解惑-详情朋友圈",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        window.wxshare(a,b)

        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','我要提问');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('PutQuestion','我要提问')
       }
    onChange = (key) => {
        console.log(key);
    }

    getImages= async (e)=>{
       let file = e.target.files[0];// 文件大小校验的动作
       let data = new FormData()
           data.append('file',file)
            
        if(file.size > 1024 * 1024 * 2) {
            alert('图片大小不能超过 2MB!');
           return false;
        } 
       let res = await UploadFile(data);
       console.log(res,">>>>>>>>>>>")
       let imgURL = URL.fileURL+res.data.path;
        let {imagearr} = this.state;
        imagearr.push(imgURL)
        this.setState({
            imagearr
        })
    }
    delimg=(index)=>{
        let {imagearr} = this.state;
        delete imagearr[index]
        this.setState({
            imagearr
        })
    }

    submitDate= async()=>{
        let { indexkey,
            defaultValueMore,
            imagearr} = this.state;
        
        let userid = localStorage.getItem("userId");
        let p13no = localStorage.getItem("p13no");
        let empno = localStorage.getItem("empno");
        let fgsName = localStorage.getItem("fgsName");
            if(!defaultValueMore)return alert('您的问题不能为空')
            let data = { 
                type:indexkey+1,
                content:defaultValueMore,
                imgUrl1:imagearr[0]?imagearr[0]:'',
                imgUrl2:imagearr[1]?imagearr[1]:'',
                imgUrl3:imagearr[2]?imagearr[2]:'',
                userId:userid,
                empno:empno,
                p13no:p13no,
                fgsName:fgsName
            };
            console.log(data,"==========")
            let res = await addQuestion(data);
            if(res&&res.code==200){
               this.props.history.push({pathname:'home'}) 
            }

            
    }
    render(){

       let {indexkey,datalist,imagearr} = this.state;
        return (
            <div style={{flex:1,width:'100%',heiht:'100%'}}>
                {/* <Title TitleText={'我要提问'}/> */}

                <div style={{paddingTop:'1rem'}}>
                    <p className="questions">意见分类</p>
                </div>

                <div className="box_top">
                    {datalist&&datalist.map((items,index)=>{
                        return <div key={index+"put"}
                                    className={indexkey==index?"put_quest item-type" :"item-type"}
                                    onClick={()=>this.setState({indexkey:index})}
                                    >{items.name}</div>
                    })}
                    
                </div>


                <div>
                <p className="questions">问题描述（必填）</p>
                <TextareaItem
                    placeholder="您好，请简要描述您的问题或建议！"
                    data-seed="logId"
                    rows={5}
                    ref={el => this.autoFocusInst = el}
                    onChange={(e)=>this.setState({defaultValueMore:e})}
          />
                </div>

                <div style={{paddingBottom:'3rem'}}>
                   <p className="questions">上传截图(选项)</p>
                
                <div className="imgbox">
                {imagearr.length>0&&imagearr.map((item,index)=><div style={{position:'relative'}}>
                    <img src={require('../images/del.png')} 
                        style={{width:"2rem",
                            height:'2rem',
                            position: 'absolute',  
                            right: '0.5rem',
                            top:' 0.5rem',}} 
                        onClick={()=>this.delimg(index)}/>
                    <img src={item} style={{width:"8rem",height:'8rem', margin: '0.2rem'}} key={index}/>
                </div>
                )}

                {imagearr.length<3&&<div className="up_pic">
                    <span id="chose_pic_btn">
                        <input type="file" accept="image/*" onChange={(e)=>{this.getImages(e)}}/>
                    </span>
                </div>}
                </div>
                </div>
            
            <div style={{position:'fixed',bottom:0,width:'100%'}} >
                <Button style={{background:"#53A3FE",color:"#FFF"}}  onClick={()=>this.submitDate()}>提交</Button>
               
            </div>
            </div>
        )
    }
}
export default PutQuestion
