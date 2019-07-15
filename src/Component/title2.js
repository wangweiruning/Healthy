import React from 'react';
import '../css/allstyle.css';
import { withRouter } from 'react-router-dom'

class TitleHe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: false
    }
  }
  fanhui() {
    window.history.go(-1)
  }
  componentDidMount() {
    let currentPage = window.location.pathname.replace("/", "");
    console.log(currentPage)
    if (currentPage === "home" || currentPage === "") {
      this.setState({
        currentPage: true
      })
    }
  }
  render() {
    return (
      <div className="x_xtitle_tow">
        <div className="x_xtitlediv">
          <img onClick={() => this.fanhui()}
            src={this.props.img||'./static/blueback.png'}
            style={{ width: '1rem', height: '1rem', marginLeft: '.38rem', zIndex: 555 }} alt="" />
          <h3 className="title_centers">{this.props.TitleText || '核保助手'}</h3>
        </div>
      </div>
    )
  }

}

export default withRouter(TitleHe)