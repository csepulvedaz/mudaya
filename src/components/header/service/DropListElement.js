import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Row, Col, Descriptions, Tag, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useQuery } from "@apollo/client";

import { VEHICLE } from "../../../graphql/queries";
import CreateServiceModal from "../../content/service/CreateServiceModal";
// import TruckLicense from "./TruckLicense";

const useStyles = makeStyles({
    root: {
        width: "550px",
        padding: "25px 0px",
        border: "solid 0.5px #ccc",
        background: "#FFFFFF",
        boxShadow: "1px 1px 10px #ccc",
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
        background: "#FCB625",
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
});

export default function DropListElement(props) {
    const classes = useStyles();
    const [visibleService, setVisibleService] = useState(false);

    const { loading, error, data } = useQuery(VEHICLE, {
        variables: { _id: props.value.idVehicle },
        fetchPolicy: "no-cache",
    });

    const openModal = (e) => {
        e.preventDefault();
        setVisibleService(true);
    };

    // const { loading: loadingSubscription } = useSubscription(SERVICE_UPDATED, {
    //     variables: { _id: props.value._id },
    //     onSubscriptionData: ({ subscriptionData }) => {
    //         console.log(subscriptionData);
    //     },
    // });

    if (loading)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );

    const { vehicle } = data;
    const { origin, destination, commentaryUser, date } = props.value;
    if (error) return `Error! ${error}`;

    return (
        <Row className={classes.root}>
            <Col span={6}>
                <div className={classes.image_box}></div>
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

                <Tag color="success" className={classes.tag}>
                    Aceptado
                </Tag>

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
}
