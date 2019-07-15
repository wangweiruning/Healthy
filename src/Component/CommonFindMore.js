import React from 'react';
import '../css/allstyle.css';
import {withRouter } from 'react-router-dom'

//首页公共跳转 左边文字+ 右边文字+go图片


class CommonFindMore extends React.Component{
    constructor(porps){
        super(porps)
        this.state={
            Titie:'',
            cangoTo:true,
            routerName:''
        }
    }

    componentDidMount(){
      this.setState({
          Titie:this.props.Title,
          cangoTo:this.props.cangoTo,
          routerName:this.props.routerName
      })
    }


    
    render(){
        return(
            <div>
                <div className="gotuMore">
                    <div onClick={()=>this.state.cangoTo&&
                        this.props.history.push({
                            pathname:this.props.typeid?`${this.state.routerName}/${this.props.typeid}`:`${this.state.routerName}`,
                           })} className="goAndTo">
                    <div className='commserver' style={{}}>
                        <p style={{fontSize:"20px",fontFamily:"PingFangSC-Medium",color:"black",fontWeight:"550"}}>{this.state.Titie}</p>
                    </div>
                    {this.state.cangoTo&&<div className='commserver'>
                        <span style={{color:"#646C80",fontSize:"12px",fontFamily:"PingFangSC-Regular"}}>{'查看更多'}</span>
                        <img src="./static/seemore.png"  className="SeeMoreImg"/>
                    </div>}
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CommonFindMore)