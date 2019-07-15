
import React from 'react'
import { withRouter,Link } from 'react-router-dom'
import {qalist} from './../api/api'


class MyProgram extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultSelect:0,
            datalist:null,
        }
       
    }

    componentDidMount(){
       this.getdata(0)
        
       localStorage.setItem('pageIdnew',window.returnNewUrl());
       localStorage.setItem('titlenew','我的问题');
       localStorage.setItem('readTimenew',new Date().getTime());
      }
    
      componentWillUnmount(){
        window.openPages('MyQuestion','我的问题')
      }
    getdata = async (keys=0)=>{
        let userid = localStorage.getItem("userId")
        let p13no = localStorage.getItem("p13no");
        let empno = localStorage.getItem("empno");
        let fgsName = localStorage.getItem("fgsName");
        let res = await qalist(`?userId=${userid}&replyState=${keys}&p13no=${p13no}&empno=${empno}`);
        let data = res.data;
        this.setState(
           { datalist:data,
            defaultSelect:keys
        }
        )
    }
    render() {
       let {datalist,defaultSelect} = this.state;
        return(
            <div>
                <div className="nav-bar">
                    <p
                    onClick={()=>this.getdata(0)}
                    className={defaultSelect==0?"aitem_more":"aitems"} >未回复</p>
                    <p
                     onClick={()=>this.getdata(1)}
                    className={defaultSelect==1?"aitem_more":"aitems"}>已回复</p>

                </div>
                <div style={{paddingTop:"6rem"}}></div>
           {datalist&&datalist.map((subitem,index)=><Link to={{pathname:'ShowQuestion',query:{subitem}}} className="changeList" key={'sub'+index}>{subitem.content}</Link>)}
            </div>
          )
            
    }
}

export default withRouter(MyProgram)

 