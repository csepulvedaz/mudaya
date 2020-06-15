import React from 'react';
import { Col, Row } from 'antd';
import { makeStyles } from "@material-ui/core/styles";

import ChatInfo from "./ChatInfo"
import CustomChat from "./CustomChat";

const  useStyles = makeStyles((theme)=>({
    root:{
        background: theme.palette.chat.background,
    },
}))

const ChatRightSider = (props) => {
    const classes = useStyles();
    return (
        <Row className= {classes.root}>
            <Col span={14}>
                <CustomChat valueService={props.valueService}/>
            </Col>
            <Col span ={10}>
                <ChatInfo valueService={props.valueService}/>
            </Col>
        </Row>

    );
};

export default ChatRightSider;