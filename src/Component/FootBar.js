import React from 'react'
import { withRouter ,Link } from 'react-router-dom'
import './Footer.css'
class TabFooter extends React.Component {
    constructor(props) {
        super(props);
        this.pageGo=this.pageGo.bind(this);
        this.state={
            pageInfo:[
                {pageUrl:"home",text:"首页",isActive:true,icon:'./static/home-1-2.png',icon_select:'./static/home-1.png'},
                {pageUrl:"everydetail",text:"商城",isActive:false,icon:'./static/home-2-2.png',icon_select:'./static/home-2.png'},
                {pageUrl:"translate",text:"代理",isActive:false,icon:'./static/home-3-2.png',icon_select:'./static/home-3.png'},
                {pageUrl:"person",text:"我的",isActive:false,icon:'./static/home-4-2.png',icon_select:'./static/home-4.png'}
            ]
        }
    }

    componentDidMount() {

        console.log(this.state.pageInfo)
        //拿到当前页面的pageUrl，循环state中的pageInfo，把当前页的isActive设置为true
       this.changePage()
    }
    changePage(){
        let currentPage =window.location.pathname.replace("/","");
        let data=this.state.pageInfo;
        data.forEach((item,index)=>{
              item.isActive=false;
              if(item.pageUrl===currentPage){
                  data[index].isActive=true;
                  this.setState({
                      pageInfo: data
                    });
              }
        })
    }
    render() {
        let data=this.state.pageInfo;
        let ClassName="";
        let imgPath="";
        return (
            <ul className="tab_footer_box">
                {
                    data.map((item,index)=>{
                        if(item.isActive){
                            ClassName="selected";
                            imgPath=item.icon_select
                        }else{
                            ClassName="";
                            imgPath=item.icon
                        }
                        return(
                                <Link to={item.pageUrl} key={index}>
                                    <li className={ClassName} key={index} data-to={item.pageUrl} onClick={this.pageGo}>
                                        <img src={imgPath} alt=""/>
                                        <p>{item.text}</p>
                                    </li>
                                </Link>
                        )
                    })
                }
            </ul>
        )
    }

    //定义点击跳转页面函数
    pageGo (event){
        let page=event.currentTarget.getAttribute("data-to");
        console.log(page)
        this.props.history.push("/"+page);
        this.changePage()
    }
}

export default withRouter(TabFooter)
