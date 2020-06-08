import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {Button, Col, Descriptions, Row, Spin, Tag} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {useQuery} from "@apollo/client";

import {VEHICLE} from "../../../graphql/queries";
import CreateServiceModal from "../service/CreateServiceModal";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "720px",
        padding: "30px 0px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: theme.shadows[4],
    },
    media: {
        height: "100px",
    },
    title: {
        fontSize: "30px",
        textAlign: "center",
        color: "#3d3d3d",
    },
    text: {
        fontSize: "15px",
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
}));

const DriverServiceCard = (props) => {
    const classes = useStyles();
    const [visibleService, setVisibleService] = useState(false);
    const openModal = (e) => {
        e.preventDefault();
        setVisibleService(true);
    };
    const { loading, error, data } = useQuery(VEHICLE, {
        variables: { _id: props.value.idVehicle },
    });
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
        <Row className={classes.root}>
            <Col span={6} className={classes.col}>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="img"
                />
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
                    className={classes.button}
                    onClick={(e) => openModal(e)}
                >
                    Ver más...
                </Button>
                <CreateServiceModal
                    value={props.value}
                    visibleService={visibleService}
                    setVisibleService={setVisibleService}
                />
            </Col>
        </Row>
    );
};

export default DriverServiceCard;
