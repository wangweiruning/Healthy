import React from 'react'
import {Carousel, WingBlank,} from 'antd-mobile'
import CommonItem from './CommonItem';
import CommonFindMore from './CommonFindMore'
import ItemCommPicList from './ItemCommPicList'
import {Link} from 'react-router-dom'
import {homemsg, saveLoginInfo} from './../api/api'
import CommonASK from './CommonASK'
import {serverUrl} from "../api/serviceAPI.config";
// import WxShare from "./wxshare"

// 首页信息

window.shareImgSrc = serverUrl;

var config1 = {
  title: "首页",
  desc: "首页",
  link: window.location.href,
  imgUrl: window.shareImgSrc + "/profile/upload/2019/06/25/c5da76c7bd245bd893c7a4f990babedb.png",
}
var config2 = { 
  title: "首页",
  desc: "首页",
  link: window.location.href,
  imgUrl: window.shareImgSrc + "/profile/upload/2019/06/25/c5da76c7bd245bd893c7a4f990babedb.png",
}

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      imgHeight: 300,
      productList: "",
      searchValue: '',
      baseUrl: window.baseUrl,
      caseSelection: "",
      listDATA: [],
      listDATAProdct: [],
      listDATASever: [],
      listDATASlect: [
        // {title:'',img:'./static/payfocase.png',router:'/ClassiCase',name:1,proid:'4'},
        // {title:'',img:'./static/serverase.png',router:'/ClassiCase',name:0,proid:'4'}
      ],
      listDATAClass: {
        // img:'./static/healthy.png',
        // img1:'./static/prod.png',
        // img2:'./static/serversss.png',
        // router:'/Seminar',
        // name:""
      },
    }
  }

  


  componentDidMount() {
    localStorage.setItem('oldurl',window.location.href);
    window.goto();
    window.pageView("/首页")
 
    window.sharePdf();

    this.getDate();
    this.urlToObj(decodeURIComponent(window.location.href))
    
    localStorage.setItem('pageIdnew',window.returnNewUrl());
    localStorage.setItem('titlenew','首页');
    localStorage.setItem('readTimenew',new Date().getTime());
   }
 
   componentWillUnmount(){
     window.openPages('HomePage','首页')
   }
  urlToObj = async (str) => {
    var obj = {};
    var arr1 = str.split("?");
    if (arr1.length <= 1) return
    var arr2 = arr1[1].split("&");
    for (var i = 0; i < arr2.length; i++) {
      var res = arr2[i].split("=");
      obj[res[0]] = res[1];
    }
    let a = obj.empno?obj.empno:'';
    let b = obj.fgsName?obj.fgsName:'';
    let c = obj.p13Account?obj.p13Account:'';
    let d = obj.userid?obj.userid:'';
    if(d==undefined) {localStorage.setItem("userId","-")}
    else{
      localStorage.setItem("userId", d)
    }
    if(c==undefined) {localStorage.setItem("p13no","-")}
    else{
      localStorage.setItem("p13no",c);
    }
    if(a==undefined) {localStorage.setItem("empno","-")}
    else{
      localStorage.setItem("empno",a);
    }
    if(b==undefined){ localStorage.setItem("fgsName","-")}
    else{
      localStorage.setItem("fgsName",b);
    }

    let point = localStorage.getItem('point');
    let city = localStorage.getItem("city");
    let msgdata = await saveLoginInfo(a, b, c, d,encodeURIComponent(point),city);
    console.log(msgdata,"gggggggggggggggggggggggggggggggg")
  }
  getDate = async () => {
    let data = await homemsg();
    this.setState({
      baseUrl: data.baseUrl
    })
    data = data.data;
    if (!data) return;
    let doc = data.documents;
    let product = data.products;
    let service = data.services;
    let caseSelection = data.caseSelection;//案例
    let specialist = data.specialist;//专家讲堂
    let documentsArr = [];
    let productsArr = [];
    let servicesArr = [];


    doc.map((item) => {
      documentsArr.push({
        type: item.type,
        id: item.id,
        title: item.title,
        pageUrl: item.pageUrl,
        img: item.extensionImg || './static/default.png',
        resSize: item.resSize,
        router: '/KeyServices',
        topimg: item.type == "pdf" ? './static/PDFicon.png' : item.type == "video" ? './static/playing.png' : './static/book_icon.png',
        proid: '1'
      })
    })
    product.map((item) => {
      productsArr.push({
        id: item.id,
        title: item.name,
        img: item.smallImg,
        resSize: item.resSize,
        router: '/HotProduct',
        proid: '2',
        starLevel: item.starLevel
      })
    })

    service.map((item) => {
      servicesArr.push({
        id: item.id,
        title: item.name,
        img: item.extensionImg,
        router: '/KeyServersMsg',
        proid: '3',
        name: item.name,
        description: item.description,
        ...item
      })
    })

    this.setState({
      data: data.adverts,
      listDATA: documentsArr,
      listDATAProdct: productsArr,
      listDATASever: servicesArr,
      caseSelection: caseSelection,
      listDATAClass: {
        img: specialist != null ? this.state.baseUrl + specialist.healthImg : './static/healthy.png',
        img1: specialist != null ? this.state.baseUrl + specialist.productImg : './static/prod.png',
        img2: specialist != null ? this.state.baseUrl + specialist.serviceImg : './static/serversss.png',
        router: '/Seminar',
        name: ""
      },
      listDATASlect: [
        {
          title: '',
          img: caseSelection != null ? this.state.baseUrl + caseSelection.leftImg : './static/payfocase.png',
          router: '/ClassiCase',
          name: 1,
          proid: '4'
        },
        {
          title: '',
          img: caseSelection != null ? this.state.baseUrl + caseSelection.rightImg : './static/serverase.png',
          router: '/ClassiCase',
          name: 0,
          proid: '4'
        }
      ]
    })
  }


  gotosearch = () => {
    window.pageClick("首页-SearchPage")
    this.props.history.push({pathname: 'SearchPage'})
  }

  render() {
    let {listDATA} = this.state;
    return (
      <div style={{flex: 1, width: '100%', heiht: '100%'}}>
        {/* <Title TitleText={'首页'}/> */}
        {/* <div style={{height:'1.2rem'}}>
                </div> */}
        <CommonASK/>
        {/* 搜索框 */}
        <div className="search_input">
          <div className="search_input_btn" onClick={() => this.gotosearch()}>
            <img src="./static/search.png" alt="搜索"
                 style={{width: "15px", marginLeft: "10px", position: "relative", top: "3px"}}/>
            <input disabled={"disabled"} onChange={this.myFunction} type="text" className="input_search"
                   placeholder="搜索热门产品、投保问题、保费"/>
          </div>
        </div>

        {/* 轮播 */}
        <div style={{padding: 0}}>
          <WingBlank>
            <Carousel
              autoplay={true}
              infinite
            >
              {this.state.data.map((val, indd) => {
                return <a onClick={() => {
                  window.pageClick("首页-" + val.title);
                }}
                          key={indd}
                          href={val.pageUrl}
                          style={{
                            display: 'inline-block', width: '100%',
                            height: this.state.imgHeight,
                            margin: '0 auto',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100% 90%',
                            // backgroundImage:`url(${val.imgUrl.substr(0,4)=="http"?`${val.imgUrl}`:`${this.state.baseUrl+val.imgUrl}`})`
                          }
                          }
                >
                  {
                    val.imgUrl.substr(0, 4) == "http" ?
                      <div>
                        <img
                          src={`${val.imgUrl}`}
                          alt=""
                          style={{width: '94%', verticalAlign: 'top'}}
                          onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                            this.setState({imgHeight: 'auto'});
                          }}
                        />
                        {/* <div style={{width:"95%",
                                        // boxShadow:"0px 10px 8px 0px  #3679FF",
                                        height:"5px",position:"relative",left:'-5px',top:'150px',zIndex:99}}></div> */}
                      </div> :
                      <div>
                        <img
                          src={`${this.state.baseUrl + val.imgUrl}`}
                          alt=""
                          style={{width: '100%', verticalAlign: 'top'}}
                          onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                            this.setState({imgHeight: 'auto'});
                          }}
                        />
                        {/* <div style={{width:"95%",boxShadow:"0px 10px 10px 0px  #3679FF",height:"5px",position:"relative",left:'-5px',top:'152px',zIndex:99 }}></div> */}
                      </div>
                  }
                </a>
              })}
            </Carousel>
          </WingBlank>
        </div>

        {/* 产品区 */}
        <CommonItem/>


        {/* 查看跟多东西------111 */}
        <CommonFindMore Title={'鲜资讯'} cangoTo={true}
          // routerName="/LookMoreView" typeid={1}
                        routerName="/Region"
        />
        {console.log(this.state.listDATA, "this.state.listDATA")}
        <ItemCommPicList listDATA={this.state.listDATA} baseUrl={this.state.baseUrl}/>
        {/* <ItemCommPicList type={"product"} listDATA={this.state.listDATAProdct} baseUrl={this.state.baseUrl}/> */}


        <CommonFindMore Title={'最新产品'} cangoTo={true} routerName="/Region"/>
        <ItemCommPicList type={"product"} listDATA={this.state.listDATAProdct} baseUrl={this.state.baseUrl}/>

        <CommonFindMore Title={'关键服务'} cangoTo={true} routerName="/ServiceList"/>
        <ItemCommPicList listDATA={this.state.listDATASever} baseUrl={this.state.baseUrl}/>

        <CommonFindMore Title={'案例精选'} cangoTo={false}/>
        <ItemCommPicList Types={"case"} caseImg={this.state.caseSelection} listDATA={this.state.listDATASlect}
                         baseUrl={this.state.baseUrl}/>

        <CommonFindMore Title={'专家讲堂'} cangoTo={false}/>
        <ItemCommPicList listDATA={this.state.listDATAClass} baseUrl={this.state.baseUrl}/>

        <div style={{margin: '1rem', width: '93%'}}>
          <Link to="/Assistant">
            <img src="./static/saveDomthing.png" width="100%"/>
          </Link>

          <p style={{
            marginTop: '1rem',
            color: "#000",
            fontSize: '10px',
            textAlign: 'center'
          }}>本频道版权及最终解释权归太保安联健康保险股份有限公司所有</p>
        </div>
      </div>
    )
  }
}

export default HomePage