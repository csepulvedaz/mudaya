import React from 'react';
import { Col, Row } from 'antd';
import {makeStyles} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';

import TruckLicense from "../../header/service/TruckLicense";
import carrito from "../../../assets/van.png";

const  useStyles = makeStyles((theme)=>({
    root:{
        width: "340px",
        padding: "0px 20px",
        background: "#e0e0e0",
    },
    box_vertical:{
        background:"#fff",
        borderRadius:"4px",
        margin:"0 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "2px 0",
        padding: "15px 0",
    },
    box_horizontal:{
        background:"#fff",
        borderRadius:"4px",
        margin:"0 18px",
        display: "flex",
        justifyContent: "center",
        margin: "2px 0",
        padding: "15px 0",
    },
    comment_container:{
        width:"100%",
        display: "flex",
        justifyContent: "center",
    },
    media: {
        height: "100px",
        borderRadius:"12px",
    },
    tiny_text:{
        fontSize: "14px",
        textAlign: "left",
        color: "#8b8b8b",
    },
    bold_text:{
        fontSize: "18px",
        textAlign: "right",
        color: "#646464",   
        fontWeight: "bold",
    },
    comment_text:{
        fontSize: "13px",
        textAlign: "left",
        color: "#8b8b8b",
        width:"80%",
        margin:"10px 0",
    },
    col: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    icon_Row: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingBlock: "5px"
    },
    centerRow: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    row: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        justifyContent: "space-between",
        paddingRight:"24px"
    },
    leftRow: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
        backgroundColor: "#fff",
    },
}))

const ChatInfo = (props) => {
    const classes = useStyles();
    const spanIcon = 5;
    const spanContent = 19;
    return (
        <div className={classes.root}>
        <Col>
            <Row className={classes.box_vertical}>
                <CardMedia
                    className={classes.media}
                    image={carrito}
                    title="img"
                />
                <TruckLicense vehicleId="ESO-000"/>
                {/* Imagen y Placa */}
            </Row>
            <Row className={classes.box_horizontal}>
                {/* DATE */}
                <Col span={spanIcon} className={classes.col} style={{justifyContent: "center"}}>
                    <Row className={classes.icon_Row}>  
                        <CalendarTodayRoundedIcon/>
                    </Row>
                </Col>
                <Col span={spanContent} className={classes.col}>
                    <Row className={classes.row} style={{ marginTop:"3px"}}>
                        <Typography className={classes.tiny_text}>
                            Fecha:
                        </Typography>
                        <Typography className={classes.bold_text}>
                            01/01/2020
                        </Typography>
                    </Row>
                </Col>  
            </Row>
            <Row className={classes.box_horizontal}>
                {/* PRICE */}
                <Col span={spanIcon} className={classes.col} style={{justifyContent: "center"}}>
                    <Row className={classes.icon_Row}>  
                        <MonetizationOnRoundedIcon/>
                    </Row>
                </Col>
                <Col span={spanContent} className={classes.col}>
                    <Row className={classes.row} style={{marginTop:"3px"}}>
                    <Typography className={classes.tiny_text}>
                        Precio:
                    </Typography>
                    <Typography className={classes.bold_text}>
                        00.000 COP
                    </Typography>
                    </Row>
                </Col>                
            </Row>
            <Row className={classes.box_horizontal}>
                {/* ADRESSES */}
                <Col span={spanIcon} className={classes.col} style={{justifyContent: "center"}}>
                    <Row className={classes.icon_Row}>      
                        <RoomRoundedIcon/> 
                    </Row>
                </Col>
                <Col span={spanContent} className={classes.col} >
                    <Row className={classes.row} style={{margin:"4px 0"}}>
                        <Typography className={classes.tiny_text}>
                            Origen:
                        </Typography>
                        <Typography className={classes.bold_text} style={{fontSize:"14px"}}>
                            Calle 00 A # 00 - 00
                        </Typography>
                    </Row>
                    <Row className={classes.row} style={{margin:"4px 0"}}>
                        <Typography className={classes.tiny_text}>
                            Destino:
                        </Typography>
                        <Typography className={classes.bold_text} style={{fontSize:"14px"}}>
                            Calle 00 A # 00 - 00
                        </Typography>
                    </Row>
                </Col>                
            </Row>
            <Col className={classes.box_vertical}>
                <Row className={classes.comment_container}>
                    {/* COMMNETARY 1 */}
                    <Col span={spanIcon} className={classes.col}>
                        <Row className={classes.icon_Row}>
                            <ChatBubbleOutlineRoundedIcon style={{transform: "scaleX(-1)"}}/> 
                        </Row>
                    </Col>
                    <Col span={spanContent} className={classes.col} >
                        <Row className={classes.leftRow} >
                            <Typography className={classes.bold_text} style={{fontSize: "14px", marginTop:"5px"}}>
                            Tú
                            </Typography>
                        </Row>
                        <Row className={classes.leftRow}>
                            <Typography className={classes.comment_text}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Typography>
                        </Row>
                    </Col>
                </Row>
                <Divider variant="middle" />
                <Row className={classes.comment_container}>
                {/* COMMNETARY 2 */}
                <Col span={spanIcon} className={classes.col}>
                    <Row className={classes.icon_Row}>
                        <ChatBubbleOutlineRoundedIcon/> 
                    </Row>
                </Col>
                <Col span={spanContent} className={classes.col} >
                    <Row className={classes.leftRow} >
                        <Typography className={classes.bold_text} style={{fontSize: "14px", marginTop:"5px"}}>
                        Usuario
                        </Typography>
                    </Row>
                    <Row className={classes.leftRow}>
                        <Typography className={classes.comment_text}>
                            Sed ut perspiciatis unde omnis iste natus
                        </Typography>
                    </Row>
                </Col>
            </Row>
            </Col>
        </Col>
        </div>
    );
};

export default ChatInfo;