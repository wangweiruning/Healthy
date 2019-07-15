
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Spacialflatlist from './spacialflatlist'

// tab 切换组件


class CommonTabitem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                // {name:'乐享百万(HOST 2018)',title1:"PDF",title2:'2.45M',time:'2019-04-23',IMG:'./static/PDFicon.png'},
                // {name:'乐享百万(HOST 2018)',title1:"电子书",title2:'2.45M',time:'2019-04-23',IMG:'./static/shipin.png'},
                // {name:'乐享百万(HOST 2018)',title1:"视 频",title2:'2.45M',time:'2019-04-23',IMG:'./static/book_icon.png'},
                // {name:'乐享百万(HOST 2018)',title1:"小说网",title2:'2.45M',time:'2019-04-23',IMG:'./static/shipin.png'},
            ],
            datalist:[],
            thisIndex:JSON.parse(this.props.match.params.typeid),
            headimgList:["/static/healthyig.png","/static/pro3x.png","/static/serv3x.png"],
            canShowStar:false
        }
       
    }
    componentDidMount(){
        JSON.parse(this.props.match.params.typeid)=="0"?window.pageView("健康篇详情"):
        JSON.parse(this.props.match.params.typeid)=="1"?window.pageView("产品篇详情"):window.pageView("服务篇详情")
        this.setState({
            datalist:this.props.datalist,
            headimgList:this.props.headimgList ||this.state.headimgList,
            canShowStar:this.props.canShowStar?true:false,
        })
    }
    // getdata=async()=>{
    //     let data = await specialistClass(1);
    //     this.setState({
    //         list:data.data
    //     })
    //     console.log(data,"data")
    // }
    render() {
        let {thisIndex,headimgList,canShowStar} = this.state;
        return (
            <div className="key_server">
                <div style={{marginBottom:'1.5rem'}}>
                    <img src={headimgList[thisIndex]} alt="" style={{width:'100%'}}/>
                </div>
               { canShowStar&&<CommonStars />}
                <div className="scrollsa">
                {
                    this.state.datalist.map((v,i)=> <div key={i}   onClick={()=>{
                        this.setState({thisIndex:i})
                        this.state.thisIndex=="0"?window.pageView("健康篇详情"):
                        this.state.thisIndex=="1"?window.pageView("产品篇详情"):window.pageView("服务篇详情")
                    }
                    }
                            style={{textDecoration:'none',display:'inline-block',width:'33%'}}
                              className='commitema'>
                    <div className="every_div_tab">
                        <p className="listTitle" style={{width:'6.8rem',color:thisIndex==i?'black':"#646C80",fontSize:thisIndex==i?'1.5rem':'1rem'}}>{v.title}</p>
                        {thisIndex==i&&<img src={v.img} alt={v.title} className="listimg_tab"/>}
                    </div>
                    </div>)
                }
                </div>
                    {this.state.thisIndex===0?<Spacialflatlist flatList={this.state.list} ProductId={1}/>:
                    this.state.thisIndex==1?<Spacialflatlist flatList={this.state.list} ProductId={2}/>:
                    <Spacialflatlist flatList={this.state.list} ProductId={3}/>
                }
            </div>
        )
    }
}

export default withRouter(CommonTabitem)

 
class CommonStars extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            stars:['./static/strts.png','./static/strts.png','./static/strts.png','./static/strts.png','./static/strts.png',]
        }
    }
    render(){
        return (
            <div className="Stars">
                <div className='Stars_left'>
                    <h2>乐享百万 (H2018)</h2>
                </div>
                <div className="Stars_right">
                    <span className="hot_star">热度</span>
                    <div className="Hot_stats_all">
                        {this.state.stars.map((items,index)=>{
                            return <img src={items} style={{width:'1.3rem'}} key={index}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}