import React from 'react';
import '../css/allstyle.css';
import { withRouter, Link } from 'react-router-dom'

class CommonASK extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: false
        }
    }

    componentDidMount() {

    }
    render() {
        console.log(this.props.history)
        return (
            <img src="/static/anserquest.png" alt=""
                style={{ position: 'fixed', right: '0rem', bottom:'10rem', width: '5rem', zIndex: 99 }}
                onClick={() =>{this.props.history.push({ pathname: '/Question' })}} />
        )
    }

}

export default withRouter(CommonASK)