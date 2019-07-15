import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
class GoBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        let props=this.props;
        this.setState({
            backColor:props.backColor || "#E4007F", // 背景颜色
            leftText:props.leftText || "返回", // 左边文字
            rightText:props.rightText || "",// 右边文字
            rightIcon: props.rightIcon && "./../images/"+props.rightIcon || "", // 右边icon
            height:props.height || "37px", // 高度
            centerText: props.height || "" // 中间文字
        })
    }

    goBack () {
        this.props.history.goBack()
    }

    render() {
        let state = this.state;
        return (
            <div>
                <div style={{ backgroundColor: state.backColor, color: "#fff", height: state.height, width: "100%" }}>
                    <div style={{ display: "flex",margin:"0 10px",alignItems:"center",height:"100%"}}>
                        <div style={{ width: 130, display: "flex" }}>
                            <div onClick={this.goBack}>
                                <img style={{width:20,height:15}} src={require('./../images/fanhuis.png')} />
                            </div>
                            <div>{state.leftText}</div>
                        </div>
                        <div style={{ flex: 1,display:"flex",justifyContent:"center"}}>{state.centerText}</div>
                        <div style={{ width: 130,display:"flex",flexDirection:"row-reverse"}}>
                            {state.rightIcon!=='' && <img style={{width:20,height:15}} src={require('./../images/fanhui.png')} />}
                            <div>{state.rightText}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(GoBack);