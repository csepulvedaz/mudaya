import React from "react";
import {Button, Modal, Row, Col} from "antd";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

import HeightWhite from "../../../assets/height-white-icon.png";
import DepthWhite from "../../../assets/depth-white-icon.png";
import WidthWhite from "../../../assets/width-white-icon.png";

import HeightBlue from "../../../assets/height-blue-icon.png";
import DepthBlue from "../../../assets/depth-blue-icon.png";
import WidthBlue from "../../../assets/width-blue-icon.png";
import theme from "../../utils/AppTheme";

const useStyles = makeStyles((theme)=>({ 
    box_horizontal:{
        display: "flex",
        justifyContent: "center",
    },
    box_vertical:{ 
        display:"flex", 
        flexDirection:"column", 
        justifyContent:"center",
    },
    text_brand:{
        fontSize:"28px",
        fontWeight:"bold",
        color:theme.palette.grey[800],
        textAlign:"left",
    },
    text_model:{
        fontSize:"18px",
        fontWeight:"bold",
        color:theme.palette.grey[800],
        textAlign:"left",
    },
    text_year:{
        fontSize:"14px",
        color:theme.palette.grey[500],
        textAlign:"center",
    },
    text_location:{
        fontSize:"14px",
        color:theme.palette.grey[400],
        textAlign:"left",
    },
    blue_section_text:{
        width:"100%",
        fontSize:"18px",
        fontWeight:"bold",
        textAlign:"center",
        color:"#fff",
    },
    
    white_section_text:{
        width:"100%",
        fontSize:"18px",
        fontWeight:"bold",
        textAlign:"center",
        color:theme.palette.primary.main,
    },
    icon_media: {
        height: "40px",
        //border:`1px ${theme.palette.grey[200]} solid`,
        marginBottom: "14px",
    },
    commentary_header:{
        fontSize:"18px",
        fontWeight:"bold",
        color:theme.palette.grey[600],
        textAlign:"center",
    },
    commentary:{
        fontSize:"14px",
        color:theme.palette.grey[500],
        textAlign:"left",
        fontStyle:"italic",
        width:"80%"
    },
    button: {
        margin: "5px 0px",
        borderRadius: "7px",
        background: theme.palette.primary.main,
        color: "#fff",
        focus: "false",
        fontWeight: "600",
        "&:hover": {
            background: theme.palette.primary.main,
            color: "#fff !important",
            boxShadow: theme.shadows[26],
        },
    },
    backButton: {
        margin: "5px 0px",
        borderRadius: "7px",
        background: "#fff",
        color: theme.palette.primary.main,
        fontWeight: "600",
        "&:hover":{
            boxShadow: "0 3px 3px rgba(0, 0, 0, 0.16)",
        }
    },
}));

const VehicleDetaisModal = (props) => {
    var dimension=props.value.dimensions.split(' x ');
    var capacity=props.value.capacity.split(' x ');
    console.log(dimension[0]);
    console.log(capacity[0]);
    const classes = useStyles();
    const handleOk = () => {
        props.setVisible(false);
        props.setVisibleService(true);
    };

    const handleCancel = () => {
        props.setVisible(false);
    };
    return (
        <Modal
            visible={props.visible}
            centered
            title={
                <Row className={classes.box_horizontal}>
                    <Col span={16} style={{margin:"14px 0", padding:"0 32px"}}>
                        <Row style={{marginBottom:"11px"}}>      
                            <Typography className={classes.text_brand} >
                                {props.value.brand}
                            </Typography> 
                        </Row> 
                        <Row > 
                            <Col span = {18}>
                                <Typography className={classes.text_model} style={{marginLeft:"4px"}} >
                                    {props.value.model}
                                </Typography> 
                            </Col>  
                            <Col span={6}>
                                <Typography className={classes.text_year} >
                                    {props.value.year}
                                </Typography> 
                            </Col>
                        </Row> 
                    </Col>  
                    <Col span={8} 
                        className={classes.box_vertical} 
                        style={{margin:"20px 0", paddingLeft:"24px", borderLeft: `1px ${theme.palette.grey[300]} solid`}}> 
                        <Row>
                            <Typography className={classes.text_location} >
                                {props.value.department}
                            </Typography> 
                        </Row>   
                        <Row>
                            <Typography className={classes.text_location} >
                                {props.value.city}
                            </Typography> 
                        </Row> 
                    </Col>  
                </Row>}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button
                    key="back"
                    onClick={handleCancel}
                    className={classes.backButton}
                >
                    Volver
                </Button>,
                <Button
                    key="submit"
                    onClick={handleOk}
                    className={classes.button}
                >
                    Reservar
                </Button>,
            ]}
            bodyStyle={{padding:"0"}}
        >
            <Col 
                className={classes.box_vertical} 
                style={{background:theme.palette.primary.light, marginBottom:"24px"}} >
                <Row>
                    <Typography className={classes.blue_section_text} style={{marginBottom:"24px",marginTop:"24px"}}>
                        CAPACIDAD
                    </Typography>
                </Row>
                <Row style={{paddingBottom:"16px"}} >
                    <Col span={8} className={classes.box_vertical} >
                        <Row style={{justifyContent:"center"}}>
                            <img 
                                className={classes.icon_media}
                                src= {HeightWhite} 
                                alt="alto" 
                            />
                        </Row>
                        <Row style={{justifyContent:"center"}}>
                            <Typography className={classes.blue_section_text} >
                                {capacity[0]}
                            </Typography>
                        </Row>
                    </Col>
                    <Col span={8} 
                        className={classes.box_vertical}
                        style={{borderLeft:`1px ${theme.palette.primary.main} solid`,
                                borderRight:`1px ${theme.palette.primary.main} solid`
                        }} 
                    >
                        <Row style={{justifyContent:"center"}}>
                            <img 
                                className={classes.icon_media}
                                src= {WidthWhite} 
                                alt="ancho" 
                            />
                        </Row>
                        <Row style={{justifyContent:"center"}}>
                            <Typography className={classes.blue_section_text} >
                                {capacity[1]}
                            </Typography>
                        </Row>
                    </Col>
                    <Col span={8} className={classes.box_vertical} >
                        <Row style={{justifyContent:"center"}}>
                            <img 
                                className={classes.icon_media}
                                src= {DepthWhite} 
                                alt="largo" 
                            />
                        </Row>
                        <Row style={{justifyContent:"center"}}>
                            <Typography className={classes.blue_section_text} >
                                {capacity[2]}
                            </Typography>
                        </Row>
                    </Col>
                </Row>
            </Col>

            <Col 
                className={classes.box_vertical} 
                style={{background:"#fff",marginBottom:"24px",}} >
                <Row>
                    <Typography className={classes.white_section_text} style={{marginBottom:"24px",marginTop:"8px"}}>
                        DIMENSIONES
                    </Typography>
                </Row>
                <Row style={{paddingBottom:"16px"}} >
                    <Col span={8} className={classes.box_vertical} >
                        <Row style={{justifyContent:"center"}}>
                            <img 
                                className={classes.icon_media}
                                src= {HeightBlue} 
                                alt="alto" 
                            />
                        </Row>
                        <Row style={{justifyContent:"center"}}>
                            <Typography className={classes.white_section_text} >
                                {dimension[0]}
                            </Typography>
                        </Row>
                    </Col>
                    <Col span={8} 
                        className={classes.box_vertical}
                        style={{borderLeft:`1px ${theme.palette.grey[300]} solid`,
                                borderRight:`1px ${theme.palette.grey[300]} solid`
                        }} 
                    >
                        <Row style={{justifyContent:"center"}}>
                            <img 
                                className={classes.icon_media}
                                src= {WidthBlue} 
                                alt="ancho" 
                            />
                        </Row>
                        <Row style={{justifyContent:"center"}}>
                            <Typography className={classes.white_section_text} >
                                {dimension[1]}
                            </Typography>
                        </Row>
                    </Col>
                    <Col span={8} className={classes.box_vertical} >
                        <Row style={{justifyContent:"center"}}>
                            <img 
                                className={classes.icon_media}
                                src= {DepthBlue} 
                                alt="largo" 
                            />
                        </Row>
                        <Row style={{justifyContent:"center"}}>
                            <Typography className={classes.white_section_text} >
                                {dimension[2]}
                            </Typography>
                        </Row>
                    </Col>
                </Row>
            </Col>
            
            <Row style={{marginBottom:"32px"}}>
                <Col span= {10}>
                    <Typography className={classes.commentary_header} >
                        COMENTARIO
                    </Typography>
                </Col>
                <Col span= {14}>
                    <Typography className={classes.commentary} >
                        {props.value.commentary}
                    </Typography>
                </Col>
            </Row>
        </Modal>
    );
};

export default VehicleDetaisModal;
