import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Button, Col, Descriptions, Row, Spin, Tag, Drawer} from "antd";
import {LoadingOutlined, MessageOutlined} from "@ant-design/icons";
import {useQuery} from "@apollo/client";

import {VEHICLE} from "../../../graphql/queries";
import CreateServiceModal from "../../content/service/CreateServiceModal";
import theme from "../../utils/AppTheme";
import CustomChatSider from "../../content/chat/ChatRightSider";
// import TruckLicense from "./TruckLicense";

const useStyles = makeStyles({
    root: {
        width: "550px",
        padding: "25px 0px",
        border: "solid 0.5px #ccc",
        background: "#FFFFFF",
        borderRadius: "5px",
    },
    image_box: {
        width: "90px",
        height: "90px",
        margin: "20px 15px 20px 15px",
        borderRadius: "4px",
        background: "#EEEEEE", // para el skeleton
    },

    title: {
        fontSize: "15px",
        textAlign: "center",
        color: "#3d3d3d",
    },
    text: {
        fontSize: "14px",
        textAlign: "center",
    },
    year: {
        marginBottom: "10px",
        fontSize: "15px",
        textAlign: "left",
        color: "#acacac",
    },
    button: {
        borderRadius: "7px",
        background: theme.palette.primary.main,
        color: "#fff",
        fontWeight: "600",
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.16)",
        fontSize: "13px",
    },
    col: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    colState: {
        paddingTop: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    tag: {
        padding: "5px",
        fontSize: "13px",
    },
    chatButtonIcon:{
        color: theme.palette.primary.main,
        transform: "scaleX(-1)",
        fontSize: "24px",
    },
    chatButton:{
        boxShadow: "none !important",
    },
});

/**
 * @return {string}
 * @return {string}
 */

export default function DropListElement(props) {
    const classes = useStyles();
    const [visibleService, setVisibleService] = useState(false);
    const [visibleChat, setVisibleChat] = useState(false);

    const { loading, error, data } = useQuery(VEHICLE, {
        variables: { _id: props.value.idVehicle },
        fetchPolicy: "no-cache",
    });

    const openModal = (e) => {
        e.preventDefault();
        setVisibleService(true);
    };

    if (loading)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );

    const { vehicle } = data;
    const { origin, destination, commentaryUser, date, state } = props.value;
    if (error) return `Error! ${error}`;

    return (
        <>
            <Row className={classes.root}>
                <Col span={6}>
                    <div className={classes.image_box}/>
                </Col>
                <Col span={12} className={classes.col}>
                    <Row>
                        <Typography variant="h4" className={classes.title}>
                            {vehicle.brand + " • " + vehicle.model}
                        </Typography>
                    </Row>
                    <Row>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            className={classes.year}
                        >
                            {vehicle._id} - {vehicle.year}
                        </Typography>
                    </Row>
                    <Row>
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Origen">
                                <Typography
                                    variant="body1"
                                    className={classes.text}
                                >
                                    {origin}
                                </Typography>
                            </Descriptions.Item>
                            <Descriptions.Item label="Destino">
                                <Typography
                                    variant="body1"
                                    className={classes.text}
                                >
                                    {destination}
                                </Typography>
                            </Descriptions.Item>
                            <Descriptions.Item label="Comentarios">
                                <Typography
                                    variant="body1"
                                    className={classes.text}
                                >
                                    {commentaryUser}
                                </Typography>
                            </Descriptions.Item>
                        </Descriptions>
                    </Row>
                </Col>
                <Col span={6} className={classes.colState}>
                    <Typography variant="body1" className={classes.text}>
                        {date}
                    </Typography>

                    {state === "accepted" && (
                        <Tag color="success" className={classes.tag}>
                            Aceptado
                        </Tag>
                    )}
                    {state === "cancelled" && (
                        <Tag color="red" className={classes.tag}>
                            Cancelado
                        </Tag>
                    )}
                    {state === "onHold" && (
                        <Tag color="blue" className={classes.tag}>
                            En espera
                        </Tag>
                    )}
                    {state === "started" && (
                        <Tag color="cyan" className={classes.tag}>
                            En solicitud
                        </Tag>
                    )}
                    {state === "finished" && (
                        <Tag color="gold" className={classes.tag}>
                            Finalizado
                        </Tag>
                    )}
                    {state === "rated" && (
                        <Tag color="gold" className={classes.tag}>
                            Calificado
                        </Tag>
                    )}
                    <Button 
                        className={classes.chatButton} 
                        icon={<MessageOutlined className={classes.chatButtonIcon} />}
                        onClick={()=>{
                            setVisibleChat(true);
                        }}
                    /> 
                    {(state === "onHold" ||
                        state === "accepted" ||
                        state === "started" ||
                        state === "finished" ||
                        state === "rated") && (
                        <Button
                            className={classes.button}
                            onClick={(e) => openModal(e)}
                        >
                            Ver más...
                        </Button>
                    )}
                    <CreateServiceModal
                        value={props.value}
                        visibleService={visibleService}
                        setVisibleService={setVisibleService}
                    />
                </Col>
            </Row>
            <Drawer
                placement="right"
                width={800}
                closable={false}
                onClose={() => setVisibleChat(false)}
                visible={visibleChat}
            >
                <CustomChatSider valueService={props.value}/>
            </Drawer>
        </>
    );
}
