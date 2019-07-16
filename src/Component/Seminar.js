import React  from 'react'
import CommonASK from './CommonASK'
import CommonTabitem from './CommonTabitem'
import {Link,withRouter} from 'react-router-dom'

 class Seminar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          datalist:[
            {title:'健康篇',img:'/static/blueTEE.png',router:'/KeyServices',id:0},
            {title:'产品篇',img:'/static/orange.png',router:'/KeyServices',id:1},
            {title:'服务篇',img:'/static/pink.png',router:'/KeyServices',id:2},
        ],
        headimgList:["/static/healthyig.png","/static/pro3x.png","/static/serv3x.png"],
        getname:0
          }
    }
    
    componentDidMount() {
        window.scrollTo(0,0)

        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','专家讲堂');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('Seminar','专家讲堂')
       }
    
    render(){
      console.log(this.props,"this.props")
        return (
            <div style={{flex:1,width:'100%',heiht:'100%'}}>
                <CommonASK />
                
                <div style={{height:'1rem'}}>
                </div>
              <CommonTabitem datalist={this.state.datalist} getname={this.state.getname}/>
            </div>
        )
    }
}
export default withRouter(Seminar)