
import React from 'react'
import { withRouter } from 'react-router-dom'
import FlatListItem from './FlatListItem'

// tab 切换组件

var data;
class CommonTab extends React.Component {
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
            data:null,
            thisIndex:localStorage.getItem("thisIndex")||0,
            baseUrl:window.baseUrl,
            headimgList:["./static/healthyig.png","./static/pro3x.png","./static/serv3x.png"],
            canShowStar:false,
            dataTypes:localStorage.getItem("dataTypes")||"DOWN"
        }
       
    }
    componentDidMount(){
        console.log(this.props.getname,"this.props.getname")
        this.getData()
        this.setState({
            datalist:this.props.datalist,
            headimgList:this.props.headimgList ||this.state.headimgList,
            canShowStar:this.props.canShowStar?true:false,
        })
    }
    async getData(){
        await this.setState({
            data:JSON.parse(this.props.data),
        });
        // let datas=await productDetail(this.state.data.id,'DOWN',0);
    }
    render() {
        let {thisIndex,headimgList,canShowStar} = this.state;
        let thisIndexs=localStorage.getItem("thisIndex");
        return (
            this.state.data&& <div className="key_server">
                <div style={{marginBottom:'1.5rem'}}>
                    {
                        this.state.data.imgSrc.substr(0,4)=="http"?<img src={this.state.data.imgSrc} alt="" style={{width:'100%'}}/>:
                        <img src={this.state.baseUrl+this.state.data.imgSrc} alt="" style={{width:'100%'}}/>
                    }
                </div>
               { canShowStar&&<CommonStars title={this.state.data.title} starLevel={this.state.data.starLevel} />}
                <div className="scrollsa">
                {
                    this.state.datalist.map((v,i)=> <div key={i}   onClick={()=>{
                        localStorage.setItem("dataTypes",v.dataType)
                        localStorage.setItem("thisIndex",i)
                        this.setState({
                            thisIndex:i,
                            dataTypes:v.dataType
                        });
                        localStorage.getItem("dataTypes")=="AUXILIARY"?window.pageClick("热门产品详情-辅助资料"):window.pageClick("热门产品详情-下发资料")
                    }}
                            style={{textDecoration:'none',display:'inline-block',width:'33%'}}
                              className='commitema'>
                    <div className="every_div_tab">
                        <p className="listTitle" style={{width:'6.8rem',color:thisIndexs==i?'black':"#646C80",letterSpacing:thisIndexs==i? "1.2px":"0",fontSize:thisIndexs==i?'18px':'14px',fontWeight:thisIndex==i?'550':'0'}}>{v.title}</p>
                        {thisIndexs==i&&<img src={'/static/blueTEE.png'} alt={v.title} className="listimg_tab"/>}
                    </div>
                    </div>)
                }
                </div>
                {
                    this.state.dataTypes=="DOWN"?<FlatListItem key={1} id={this.state.data.id} dataType={"DOWN"} flatList={this.state.list}/>:
                    this.state.dataTypes=="AUXILIARY"?<FlatListItem key={2} id={this.state.data.id} dataType={"AUXILIARY"} flatList={this.state.list}/>:
                    <FlatListItem id={this.state.data.id} dataType={"PROPAGATE"} flatList={this.state.list}/>
                }
                
            </div>
        )
    }
}

export default withRouter(CommonTab)

 
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
            <div className="Stars">
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