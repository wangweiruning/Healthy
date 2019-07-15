
import React from 'react'
import { withRouter } from 'react-router-dom'
import NewFlatList from './NewFlatList'



class SeeSearchView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datalist:[],
        }
       
    }

    componentDidMount(){
        let data = decodeURIComponent(this.props.match.params.data);
         data = JSON.parse(data);
        this.setState(
           { datalist:data}
        )
    }
  
    render() {
       
        return(
            <div>
           <NewFlatList flatList={this.state.datalist}/>
            </div>
          )
            
    }
}

export default withRouter(SeeSearchView)

 