import React from 'react';
import { Col, Row } from 'antd';
import { makeStyles } from "@material-ui/core/styles";

import ChatInfo from "./ChatInfo"
import CustomChat from "./CustomChat";

const  useStyles = makeStyles((theme)=>({
    root:{
        background: "#f9f9f9",
    },
    temp:{
        width: "400px",
        padding: "0px 20px",
        background: "#8b8b8b",
    },
}))

const ChatRightSider = (props) => {
    const classes = useStyles();
    return (
        <Row className= {classes.root}>
            <Col span={14}>
                <CustomChat valueService={props.valueService}/>
                {/*Aquí pondría mi chat, si lo tuviera :'v*/}
            </Col>
            <Col span ={10}>
                <ChatInfo valueService={props.valueService}/>
            </Col>
        </Row>

    );
};

export default ChatRightSider;