import React from 'react';
import { Col, Row } from 'antd';
import {makeStyles} from "@material-ui/core/styles";

import ChatInfo from "./ChatInfo"

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
            <Col span={8}>
                <p className={classes.temp}>CHAT INCOMING</p>
                {/*Aquí pondría mi chat, si lo tuviera :'v*/}
            </Col>
            <Col span ={4}>
                <ChatInfo/>
            </Col>
        </Row>

    );
};

export default ChatRightSider;