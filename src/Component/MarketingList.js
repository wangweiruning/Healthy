
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import NewFlatList from './NewFlatList'
import {getprodoct} from './../api/api'
import CommonASK from './CommonASK'


class MarketingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list:[],
            thisIndex:0,
            headimgList:["./static/healthyig.png","./static/pro3x.png","./static/serv3x.png"],
            baseUrl:""
        }
       
    }

    gotuMsgPage = (rootname,typeid)=>{
        this.props.history.push({pathname:`${rootname}/${typeid}`})
    }

    componentDidMount(){
        window.pageView("/行销宣传详情")
        this.getData();

        // window.getTestWxShareConfig();
        var a={
            title:"行销宣传详情-详情好友",
            desc: "行销宣传详情-详情好友",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        var b={
            title:"行销宣传详情-详情朋友圈",
            desc: "行销宣传详情-详情朋友圈",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        window.wxshare(a,b)
        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','行销宣传列表');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('MaketingList','行销宣传文档列表')
       }
     getData=async () => {
        let marketingid =  window.localStorage.getItem('marketingid');
        let data = `?&pdtId=${marketingid}`;
        let res = await getprodoct(data);
        let datass = res.data;
        let datalistArr = [];
        datass.map(item=>{
            datalistArr.push({
                name:item.title,
                title1:item.type,
                type:item.type,
                time:item.addTime||item.startTime,
                IMG:'./static/PDFicon.png',
                pageUrl:item.pageUrl,
            })
        })

        this.setState({
            list:datalistArr,
            baseUrl:res.baseUrl
        })
    }
    render() {
        let data=localStorage.getItem("marketlist");
        data = JSON.parse(data);
        
        return(
            <div>
                <CommonASK/>
                <div className='box_url'>
                <div style={{width:"100%"}}> 
                <div style={{marginBottom:'1.5rem',width:"100%"}}>
                    {
                        data.imgSrc.substr(0,4)=="http"?<img src={data.imgSrc} alt="" style={{width:'100%'}}/>:
                        <img src={this.state.baseUrl+data.imgSrc} alt="" style={{width:'100%'}}/>
                    }
                </div>
               <CommonStars title={data.title} starLevel={data.starLevel} />
                </div>
                <NewFlatList flatList={this.state.list} baseUrl={this.state.baseUrl}/>
            </div>
            </div>
          
        )
            
    }
}

export default withRouter(MarketingList)

  
class CommonStars extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            item:[]
        }
    }
    componentDidMount(){
        this.getStarLevel();
    }
    getStarLevel(){
        let starLevel = this.props.starLevel;
        this.setState(({item})=>{
            for (let i = 0; i < starLevel; i++) {
                item.push('/static/strts.png');
            }
           return {item}
        })
    }
    render(){
        return (
            <div className="Stars" style={{paddingBottom:0}}>
                <div className='Stars_left'>
                    <span>{this.props.title}</span>
                </div>
                {/* <div className="Stars_right">
                    <span className="hot_star">热度</span>
                    <div className="Hot_stats_all">
                        {
                            this.state.item&&this.state.item.map((items,index)=>{
                            return <img src={items} style={{width:'1rem'}} key={index}/>
                        })
                        }
                    </div>
                </div> */}
            </div>
        )
    }
}