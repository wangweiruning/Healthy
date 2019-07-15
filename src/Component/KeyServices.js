
import React from 'react'
import { Link, withRouter } from 'react-router-dom'


// 关键服务
class KeyServices extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list:[{name:'乐享百万(HOST 2018)',title1:"PDF",title2:'2.45M',time:'2019-04-23',IMG:'./static/PDFicon.png'},
            {name:'乐享百万(HOST 2018)',title1:"电子书",title2:'2.45M',time:'2019-04-23',IMG:'./static/shipin.png'},
            {name:'乐享百万(HOST 2018)',title1:"视 频",title2:'2.45M',time:'2019-04-23',IMG:'./static/book_icon.png'},
            {name:'乐享百万(HOST 2018)',title1:"小说网",title2:'2.45M',time:'2019-04-23',IMG:'./static/shipin.png'},]
        }
    }
  
    componentDidMount() {
        
        window.scrollTo(0,0)
    }
    render() {
        return (
            <div style={{ flex: 1, width: '100%', heiht: '100%' }}>
                <div className="key_server">
                    <div  onClick={()=>this.props.history.push({pathname:'KeyServersMsg',query:{name :'太保蓝',proid:3,id_types:0}})}>
                        <div className="key_ser_topImg">
                            <img src="./static/blue.png" style={{ width: "100%" }} />
                        </div>
                        <TextItem name={'太保蓝'} title1={'贴心服务'} title2={'与时间赛跑'} />
                    </div>
                   <div onClick={()=>this.props.history.push({pathname:'KeyServersMsg',query:{name :'住院垫付',proid:3,id_types:1}})}>
                   <div className="key_ser_topImg" >
                        <img src="./static/hosptial.png" style={{ width: "100%" }} />
                    </div>

                    <TextItem name={'住院垫付'} title1={'服务升级'} title2={'人性化管理'} />
                   </div>
                    
                </div>
            </div>
        )
    }
}
export default withRouter(KeyServices)


class TextItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            title1: this.props.title1,
            title2: this.props.title2
        }
    }
    render() {
        let { name, title1, title2 } = this.state;
        return (
            <div className="TextItem">
                <h2>{name}</h2>
                <div style={{ width: 2, height: '1rem', background: "#646C80", marginLeft: '1rem', marginRight: '1rem', display: 'flex' }}></div>
                <p style={{ color: "#646C80" }}>{title1}&nbsp;&nbsp;&nbsp;&nbsp;{title2}</p>
            </div>
        )
    }
}


