import React from 'react';
import '../css/allstyle.css';
import { withRouter,Link} from 'react-router-dom'
import { Button, } from 'antd-mobile'
import { IndexSeach} from '../api/api'
import NewFlatList from './NewFlatList'
import CommonASK from './CommonASK'
class SearchPage extends React.Component {
    constructor(porps) {
        super(porps)
        this.state = {
            searchValue: "",
            getProdoct: null,
            getService: null,
            campaignsArr:null
        }
    }

    componentDidMount() {
        setTimeout(()=>{

            document.getElementById('input_search').focus();

        },1000)

        // window.getTestWxShareConfig();
        var a={
            title:"问题搜索-详情好友",
            desc: "问题搜索-详情好友",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        var b={
            title:"问题搜索-详情朋友圈",
            desc: "问题搜索-详情朋友圈",
            link: window.location.href,
            imgUrl: window.shareImgSrc+"/profile/upload/2019/06/20/29d9795deb4bdd0c254f4d42340b15de.png",
        }
        window.wxshare(a,b)


        localStorage.setItem('pageIdnew',window.returnNewUrl());
        localStorage.setItem('titlenew','产品搜索');
        localStorage.setItem('readTimenew',new Date().getTime());
       }
     
       componentWillUnmount(){
         window.openPages('SearchPage','产品搜索')
       }

    getNewData = async () => {
        let { searchValue } = this.state;
        
        let datalist = await IndexSeach(searchValue);
        let getProdoct = datalist.data.documents;
        let getService =  datalist.data.questions;
        let campaigns  =  datalist.data.campaigns;
        let datalistArr = [];
        let datalistArrsss = [];
        let campaignsArr =[];
        campaigns.map((item,indexs)=>{
            campaignsArr.push({
                name: item.title,
                title1: item.type,
                type: item.type,
                title2: item.resSize,
                time: item.addTime,
                IMG: './static/PDFicon.png',
                pageUrl: item.pageUrl,
                id: indexs
            })
        })
        getProdoct.map((item, index) => {
            datalistArr.push({
                name: item.title,
                title1: item.type,
                type: item.type,
                title2: item.resSize,
                time: item.addTime,
                IMG: './static/PDFicon.png',
                pageUrl: item.pageUrl,
                id: index
            })
        })
  
        this.setState({
            getProdoct: datalistArr,
            getService: getService,
            campaignsArr:campaignsArr
        })

        console.log(getProdoct, getService)

    }

    myFunction = (val) => {
        let input_search = document.querySelector(".input_search");

        this.setState({
            searchValue: input_search.value
        })
    }


    searchValues = () => {
        this.getNewData();
    }

    gotoProgram=(data)=>{
        window.localStorage.setItem("proList",JSON.stringify(data));
        this.props.history.push({ pathname: "SeeSearchProgram"});
    }
    render() {
        let { getProdoct, getService,campaignsArr } = this.state;
        return (
            <div>
                <CommonASK />
                {/* 搜索框 */}
                <div className="search_input" >
                    <div className="search_input_btn" >
                        <img src="./static/search.png" alt="搜索" style={{ width: "15px",marginLeft:"10px",position:"relative",top:"3px" }} />
                        <input onChange={this.myFunction} type="text"  autofocus="autofocus" id="input_search" className="input_search" placeholder="搜索热门产品、投保问题、保费" />

                        <Button className="inputvat" onClick={() => this.searchValues()} style={{ position: 'absolute' }}>
                            搜索
                        </Button>
                    </div>
                </div>
                {/* 产品资料 */}
                {getProdoct && <div>
                    <h2 className="ziliao_p">产品资料</h2>
                    <div>
                        <NewFlatList flatList={getProdoct.filter(v => v.id < 3)} />
                        {getProdoct.length ? <p
                            onClick={() => this.props.history.push({ pathname: `SeeSearchView/${encodeURIComponent(JSON.stringify(getProdoct))}`,query:{type:2} })}
                            style={{ color: "#189BE7", textAlign: 'center',padding:"1rem"  }}>查看全部{getProdoct.length}个产品资料</p> :
                            <p style={{ color: "#189BE7", textAlign: 'center',padding:"1rem"  }}>0个产品资料</p>
                        }
                    </div>

                </div>}
                {/* 行销支持 */}
                {campaignsArr && <div>
                            <h2 className="ziliao_p">行销支持</h2>
                            <div>
                            <NewFlatList flatList={campaignsArr.filter(v => v.id < 3)} />
                                {campaignsArr.length ? <p
                                    onClick={() => this.props.history.push({ pathname: `SeeSearchView/${encodeURIComponent(JSON.stringify(campaignsArr))}`,query:{type:2} })}
                                    style={{ color: "#189BE7", textAlign: 'center',padding:"1rem"  }}>查看全部{campaignsArr.length}个行销支持</p> :
                                    <p style={{ color: "#189BE7", textAlign: 'center',padding:"1rem"  }}>0个行销支持</p>
                                }
                            </div>

                        </div>}
                {/*  问题列表*/}
                        
        
                {getService && <div>
                    <h2 className="ziliao_p">问题列表</h2>
                    <div>
                        {getService.map((subitem,index)=>{
                            console.log(subitem,"vvvvvvvvvvvvvvvvvvvvv")
                           if (index<5) return <Link to={{pathname:'ShowQuestion',query:{subitem}}} className="changeList" key={'sub'+index}>{subitem.content}</Link>
                        })}
                        {getService.length ? <p
                            onClick={() =>this.gotoProgram(getService)}
                            style={{ color: "#189BE7", textAlign: 'center',padding:"1rem" }}>查看全部{getService.length}问题列表</p> :
                            <p style={{ color: "#189BE7", textAlign: 'center',padding:"1rem"  }}>0个问题列表</p>
                        }
                    </div>
                </div>}

            </div>
        )
    }
}

export default withRouter(SearchPage)