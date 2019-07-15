
import React from 'react'
import { withRouter,Link } from 'react-router-dom'



class SeeSearchProgram extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datalist:null,
        }
       
    }

    componentDidMount(){
        let data = window.localStorage.getItem("proList");
         data = JSON.parse(data);
        this.setState(
           { datalist:data}
        )
    }
  
    render() {
       let {datalist} = this.state;
        return(
            <div>
           {datalist&&datalist.map((subitem,index)=><Link to={{pathname:'ShowQuestion',query:{subitem}}} className="changeList" key={'sub'+index}>{subitem.content}</Link>)}
            </div>
          )
            
    }
}

export default withRouter(SeeSearchProgram)

 