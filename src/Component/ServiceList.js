
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getservices } from "./../api/api";
import CommonASK from './CommonASK'
class ServiceList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datalist: [],
            baseUrl:""
        }

    }
    gotuMsgPage = (item) => {
        window.pageClick("关键服务-"+item.name)
        let tt = { 
            id: item.id,
            proid:3,
            title:item.name, 
            name:item.name,
            img:item.extensionImg,
            description:item.description,
            priority:item.priority,
            id_types:1,
            search:item.search
        } ;
        window.localStorage.setItem('serviceList',JSON.stringify(tt));
        if(item.search=="1"){
            this.props.history.push({ pathname: 'KeyServersMsg1', query: { 
                id: item.id,
                proid:3,
                title:item.name,
                name:item.name,
                description:item.description,
                img:item.extensionImg,
                priority:item.priority,
                id_types:1
            } 
            })
        }else{
            this.props.history.push({ pathname: 'KeyServersMsg', query: { 
                id: item.id,
                proid:3,
                title:item.name,
                name:item.name,
                description:item.description,
                img:item.extensionImg,
                priority:item.priority,
                id_types:1
            } 
            })
        }
        
    }

    componentDidMount() {
        // window.goto()
        this.GetAsyncData(1)
        window.pageView("/关键服务")
        window.getTestWxShareConfig();
        var config1 = {
            title: "关键服务列表好友",
            desc: "关键服务列表好友",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/25/c5da76c7bd245bd893c7a4f990babedb.png",
        }
        var config2 = {
            title: "关键服务列表朋友圈",
            desc: "关键服务列表朋友圈",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/25/c5da76c7bd245bd893c7a4f990babedb.png",
        }
        window.wxshare(config1,config2)
        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','关键服务');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('ServiceList','关键服务')
       }


    GetAsyncData = async () => {
        // let data = `?pageNum=${pageNum}&pageSize=18`;

        let res = await getservices();
        this.setState({
            datalist: res.data,
            baseUrl:res.baseUrl
        })
    }
    render() {
        let { datalist } = this.state;
      
        return (
            <div>
                <CommonASK />
                <div className="key_server" style={{}}>
                    {
                        datalist && datalist.map((item, index) => {
                            return <div onClick={() => this.gotuMsgPage(item)} key={'serv' + index} className="listitem_server">
                                <div style={{ marginBottom: '.5rem' }}>
                                    {
                                        item.extensionImg.substr(0,4)=="http"?<img style={{width:"100%"}} src={item.extensionImg}/>:
                                        <img style={{width:"100%"}} src={this.state.baseUrl+item.extensionImg}/>
                                    }
                                </div>
                                <p className="listitem_serv_p" style={{color:"black",fontSize: '18px',fontWeight:"bold"}}>{item.name}</p>
                                <p className="listitem_serv_p" style={{color:"#b5b1b1"}}>{item.description}</p>
                                </div>
                        })
                    }


                </div>

            </div>
        )
    }
}

export default withRouter(ServiceList)
