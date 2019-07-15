// 查看更多

import React  from 'react'
import Title from './title'
import ItemCommPicList from './ItemCommPicList'


 class LookMoreView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listDATA:[],
            title:''
          }
    }
    componentWillMount(){
        let name = this.props.match.params.typeid==1?"热门榜单":this.props.match.params.typeid==2?'热门产品':"关键服务";
       this.setState({
           title:name,
           typeid:this.props.match.params.typeid
       })
    }
    componentDidMount() {
      

      }

    render(){
        let list = this.state.listDATA.filter(v=>v.proid==this.state.typeid)
        return (
            <div style={{flex:1,width:'100%',heiht:'100%'}}>
                <Title TitleText={this.state.title}/>
                <div style={{height:'4rem'}}>
                </div>
                <ItemCommPicList listDATA={list}/>
            </div>
        )
    }
}
export default LookMoreView