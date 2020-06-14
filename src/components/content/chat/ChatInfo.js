import React, { useContext } from 'react';
import { Col, Row } from 'antd';
import {makeStyles} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import AuthContext from "../../../context/auth-context";

import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';

import TruckLicense from "../../header/service/TruckLicense";
import carrito from "../../../assets/van.png";

const  useStyles = makeStyles((theme)=>({
    root:{
        width: "340px",
        height:"100%",
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
        margin: "3px 0",
        padding: "15px 0",
    },
    box_horizontal:{
        background:"#fff",
        borderRadius:"4px",
        margin:"0 18px",
        display: "flex",
        justifyContent: "center",
        margin: "3px 0",
        padding: "15px 0",
    },
    comment_container:{
        width:"100%",
        display: "flex",
        justifyContent: "center",
    },
    media: {
        height: "100px",
        width: "100px",
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
    bold_text_error:{
        fontSize: "14px",
        textAlign: "right",
        color: theme.palette.error.light,   
        fontWeight: "bold",
    },
    comment_text:{
        fontSize: "13px",
        textAlign: "left",
        color: "#7b7b7b",
        width:"90%",
        margin:"10px 0",
    },
    comment_text_null:{
        fontSize: "13px",
        textAlign: "left",
        color: "#b5b5b5",
        width:"90%",
        margin:"10px 0",
        fontStyle:"italic",
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
    calendarIcon:{
        color: theme.palette.primary.light,
    },
    priceIcon:{
        color: theme.palette.warning.light,
    },
    placeIcon:{
        color: theme.palette.success.light,
    },
}))

const ChatInfo = (props) => {
    const classes = useStyles();
    const { origin, destination, date, price, commentaryDriver, commentaryUser, idVehicle } = props.valueService;
    console.log(props.valueService);
    console.log(price);
    const { client } = useContext(AuthContext);
    const spanIcon = 5;
    const spanContent = 19;
    return (
        <div className={classes.root}>
        <Col>
                {/* TRUCK IMAGE & LICENSE:  */}
            <Row className={classes.box_vertical}>
                <CardMedia
                    className={classes.media}
                    image={carrito}
                    title="img"
                />
                <TruckLicense vehicleId={idVehicle}/>
            </Row>
                {/* DATE: */}
            <Row className={classes.box_horizontal}>
                <Col span={spanIcon} className={classes.col} style={{justifyContent: "center"}}>
                    <Row className={classes.icon_Row}>  
                        <CalendarTodayRoundedIcon className={classes.calendarIcon}/>
                    </Row>
                </Col>
                <Col span={spanContent} className={classes.col}>
                    <Row className={classes.row} style={{ marginTop:"3px"}}>
                        <Typography className={classes.tiny_text}>
                            Fecha:
                        </Typography>
                        <Typography className={classes.bold_text}>
                            {date}
                        </Typography>
                    </Row>
                </Col>  
            </Row> 
                {/* PRICE: */}
            <Row className={classes.box_horizontal}>
                <Col span={spanIcon} className={classes.col} style={{justifyContent: "center"}}>
                    <Row className={classes.icon_Row}>  
                        <MonetizationOnRoundedIcon className={classes.priceIcon}/>
                    </Row>
                </Col>
                <Col span={spanContent} className={classes.col}>
                    <Row className={classes.row} style={{marginTop:"3px"}}>
                    <Typography className={classes.tiny_text}>
                        Precio:
                    </Typography>
                    {(price === null || price === "") && (
                        <Typography className={classes.bold_text_error}>
                            No establecido
                        </Typography>
                    )}
                    {price !== null && (
                        <Typography className={classes.bold_text}>
                            {price} COP
                        </Typography>
                    )}
                    
                    </Row>
                </Col>                
            </Row>
                {/* ADRESSES */}
            <Row className={classes.box_horizontal}>

                <Col span={spanIcon} className={classes.col} style={{justifyContent: "center"}}>
                    <Row className={classes.icon_Row}>      
                        <RoomRoundedIcon className={classes.placeIcon}/> 
                    </Row>
                </Col>
                <Col span={spanContent} className={classes.col} >
                    <Row className={classes.row} style={{margin:"4px 0"}}>
                        <Typography className={classes.tiny_text}>
                            Origen:
                        </Typography>
                        <Typography className={classes.bold_text} style={{fontSize:"14px"}}>
                            {origin}
                        </Typography>
                    </Row>
                    <Row className={classes.row} style={{margin:"4px 0"}}>
                        <Typography className={classes.tiny_text}>
                            Destino:
                        </Typography>
                        <Typography className={classes.bold_text} style={{fontSize:"14px"}}>
                            {destination}
                        </Typography>
                    </Row>
                </Col>                
            </Row>
                {/* COMMENTS */}
            <Col className={classes.box_vertical}>
                <Row className={classes.comment_container}>
                    {/* COMMNETARY 1 */}
                    <Col span={spanIcon} className={classes.col}>
                        <Row className={classes.icon_Row}>
                            {client === "user" && (
                                <ChatBubbleOutlineRoundedIcon style={{transform: "scaleX(-1)"}}/>
                            )} 
                            {client === "driver" && (
                                <ChatBubbleOutlineRoundedIcon/>
                            )} 
                        </Row>
                    </Col>
                    <Col span={spanContent} className={classes.col} >
                    {client === "driver" && (
                    <>
                        <Row className={classes.leftRow} >
                            <Typography className={classes.bold_text} style={{fontSize: "14px", marginTop:"5px"}}>
                            Usuario
                            </Typography>
                        </Row>
                        <Row className={classes.leftRow}>
                            <>
                                {(commentaryUser === "" || commentaryUser === null) && (
                                    <Typography className={classes.comment_text_null}>
                                        El usuario no ha comentado nada durante la creación del servicio.
                                    </Typography>
                                )}
                                {commentaryUser !== "" && (
                                    <Typography className={classes.comment_text}>
                                        {commentaryUser}
                                    </Typography>
                                )}
                            </>
                        </Row>
                    </>
                    )}
                    {client === "user" && (
                    <>
                        <Row className={classes.leftRow} >
                            <Typography className={classes.bold_text} style={{fontSize: "14px", marginTop:"5px"}}>
                            Tú
                            </Typography>
                        </Row>
                        <Row className={classes.leftRow}>
                            <>
                                {(commentaryUser === "" || commentaryUser === null) && (
                                    <Typography className={classes.comment_text_null}>
                                        No has comentado nada durante la creación del servicio.
                                    </Typography>
                                )}
                                {commentaryUser !== "" && (
                                    <Typography className={classes.comment_text}>
                                        {commentaryUser}
                                    </Typography>
                                )}
                            </>
                        </Row>
                    </>
                )}
                    </Col>
                </Row>
                <Divider variant="middle" />
                <Row className={classes.comment_container}>
                {/* COMMNETARY 2 */}
                <Col span={spanIcon} className={classes.col}>
                    <Row className={classes.icon_Row}>
                        {client === "user" && (
                            <ChatBubbleOutlineRoundedIcon />
                        )} 
                        {client === "driver" && (
                            <ChatBubbleOutlineRoundedIcon style={{transform: "scaleX(-1)"}}/>
                        )} 
                    </Row>
                </Col>
                <Col span={spanContent} className={classes.col} >
                    {client === "driver" && (
                        <>
                            <Row className={classes.leftRow} >
                                <Typography className={classes.bold_text} style={{fontSize: "14px", marginTop:"5px"}}>
                                Tú
                                </Typography>
                            </Row>
                            <Row className={classes.leftRow}>
                                <>
                                    {(commentaryDriver === "" || commentaryDriver === null )&& (
                                        <Typography className={classes.comment_text_null}>
                                            No has comentado nada durante la creación del servicio.
                                        </Typography>
                                    )}
                                    {commentaryDriver !== "" && (
                                        <Typography className={classes.comment_text}>
                                            {commentaryDriver}
                                        </Typography>
                                    )}
                                </>
                            </Row>
                        </>
                        )}
                        {client === "user" && (
                        <>
                            <Row className={classes.leftRow} >
                                <Typography className={classes.bold_text} style={{fontSize: "14px", marginTop:"5px"}}>
                                Conductor
                                </Typography>
                            </Row>
                            <Row className={classes.leftRow}>
                                <>
                                    {(commentaryDriver === "" || commentaryDriver === null) && (
                                        <Typography className={classes.comment_text_null}>                                            
                                        El conductor no ha comentado nada durante la creación del servicio.
                                        </Typography>
                                    )}
                                    {commentaryDriver !== "" && (
                                        <Typography className={classes.comment_text}>
                                            {commentaryDriver}
                                        </Typography>
                                    )}
                                </>
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
            </Col>
        </Col>
        </div>
    );
};

export default ChatInfo;