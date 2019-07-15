import React from 'react';
import '../css/allstyle.css';
import {withRouter,Link} from 'react-router-dom'
//公共组件 图片+ 文字
class CommonItem extends React.Component{
    constructor(porps){
        super(porps)
        this.state={
            datalist:[
                {title:'热门产品',img:'./static/product.png',more:'推荐',router:'/Region'},
                {title:'关键服务',img:'./static/servers.png',router:'/ServiceList'},
                {title:'行销宣传',img:'./static/workwerer.png',router:'/Marketing'},
                {title:'答疑解惑',img:'./static/ansers.png',router:'/Question'},
            ]
        }
    }

    componentDidMount(){
      
    }

    
    render(){
        return(
            <div>
                <div className="scrollsa">
                        {
                    this.state.datalist.map((v,i)=> <div key={i}   
                            style={{textDecoration:'none',display:'inline-block',width:'25%'}}
                            onClick={()=>{
                                window.pageClick("首页"+v.title)
                                // window.location="#"+v.router;
                                this.props.history.push({
                                    pathname:`${v.router}`,
                                   })
                            }} className='commitema'>
                    {v.more&&<p className="hot_very">推荐</p>}
                    <div className="every_div">
                        <img src={v.img} alt={v.title} className="listimg"/>
                        <p className="listTitle" style={{width:'4.8rem'}}>{v.title}</p>
                    </div>
                    </div>)
                }
        </div>
        <div>

        </div>
        </div>
        )
        return(
        <div>
                <div className="scrollsa">
                        {
                    this.state.datalist.map((v,i)=> <Link key={i}   
                            style={{textDecoration:'none',display:'inline-block',width:'25%'}}
                             to={'/Region'} className='commitema'>
                    {v.more&&<p className="hot_very">推荐</p>}
                    <div className="every_div">
                        <img src={v.img} alt={v.title} className="listimg"/>
                        <p className="listTitle" style={{width:'4.8rem'}}>{v.title}</p>
                    </div>
                    </Link>)
                }
        </div>
        <div>

        </div>
        </div>)
    }
}
export default withRouter(CommonItem)