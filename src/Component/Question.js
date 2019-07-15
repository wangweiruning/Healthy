

import React  from 'react'
import { Accordion, } from 'antd-mobile'
import {Link,withRouter} from 'react-router-dom'
import {qaTypeAlllist,queryTypeToQa} from './../api/api'
 class Question extends React.Component{
    constructor(props){
        super(props)
        this.state = {
         listdata:[{
             header:'产品相关问题',
             list:[
                 
                ]
            },
            {
                header:'运营相关问题',
                list:[
                  
                   ]
               },
               {
                header:'销售相关问题',
                list:[
                   
                   ]
               },
               {
                header:'服务相关问题',
                list:[
                  
                   ]
               },
               {
                header:'其他相关问题',
                list:[
                   
                   ]
               },
        ]
          }
    }
  
    componentDidMount() {
        window.pageView("答疑解惑详情")
        this.getdata();
        // window.getTestWxShareConfig();
        var a={
            title:"答疑解惑详情-详情好友",
            desc: "答疑解惑详情-详情好友",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        var b={
            title:"答疑解惑详情-详情朋友圈",
            desc: "答疑解惑详情-详情朋友圈",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        window.wxshare(a,b)
        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','答疑解惑');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('Question','答疑解惑')
       }
    getdata= async()=>{
        let datatypelsit = await qaTypeAlllist();
        console.log(datatypelsit)
        let datatype = datatypelsit.data.datas;

        let type_one = await queryTypeToQa(datatype[0].id);
        let type_tow = await queryTypeToQa(datatype[1].id);
        let type_three = await queryTypeToQa(datatype[2].id);
        let type_four = await queryTypeToQa(datatype[3].id);
        let type_five = await queryTypeToQa(datatype[4].id);
        let data_one = type_one.data.datas.slice(0,20);
        let data_tow = type_tow.data.datas.slice(0,20);
        let data_three = type_three.data.datas.slice(0,20);
        let data_four = type_four.data.datas.slice(0,20);
        let data_five = type_five.data.datas.slice(0,20);
   


        this.setState({
            listdata:[
                { header:datatype[0].type+'相关问题',list:data_one},
                { header:datatype[1].type+'相关问题',list:data_tow},
                { header:datatype[2].type+'相关问题',list:data_three},
                { header:datatype[3].type+'相关问题',list:data_four},
                { header:datatype[4].type+'相关问题',list:data_five}
            ]
        })
    }

    onChange = (key) => {
        console.log(key);
    }

    render(){
       let listdata = this.state.listdata;


        return (
            <div style={{flex:1,width:'100%',heiht:'100%'}}>
                {/* <Title TitleText={'答疑'}/> */}

                <div>
                    <p className="questions">常见问题</p>
                </div>


                <div style={{ marginTop: 10, marginBottom: 64}}>
                    <Accordion className="my-accordion" onChange={this.onChange}>
                        {listdata&&listdata.map((item,indexs)=>{
                            let itemList = item.list;
                            return <Accordion.Panel header={item.header} className="pad" key={'top'+indexs}>
                                <ul style={{display:'block'}}>
                                    {itemList&&itemList.map((subitem,subindex)=>{
                                        return <Link to={{pathname:'ShowQuestion',query:{subitem}}} className="changeList" key={'sub'+subindex}>{subitem.content}</Link>
                                    })}
                                    
                                </ul>
                            </Accordion.Panel>
                        })} 
                    </Accordion>
                </div>
            <div className="ppss">
            <p className="ppss_left" onClick={()=>{window.pageClick("答疑解惑-我的问题");this.props.history.push({pathname:'MyProgram'})}}>我的问题</p>
            <p  className="ppss_right" onClick={()=>{window.pageClick("答疑解惑-我要提问");this.props.history.push({pathname:'PutQuestion',query:{name :'太保蓝',proid:3,id:0}})}}>我要提问</p>
            </div>
         </div>
        )
    }
}
export default withRouter(Question)
