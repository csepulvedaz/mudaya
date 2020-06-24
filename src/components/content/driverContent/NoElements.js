import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Col, Row } from "antd";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import img from "../../../assets/bush.png";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "700px",
        background: theme.palette.grey[100],
        borderRadius: "64px",
        padding: "40px",
        boxShadow: "inset 0px 0px 19px rgba(0,0,0,0.1)",
    },
    col: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    row: {
        margin: "5px 0",
    },
    media: {
        width: "80px",
        height: "80px",
        margin: "5px auto",
        borderRadius: "16px",
    },
    title: {
        fontWeight: "bold",
        fontSize: "30px",
        color: theme.palette.grey["A400"],
    },
    text: {
        color: theme.palette.grey[600],
    },
    button_insert: {
        borderRadius: "8px",
        padding: "5px 8px",
        fontWeight: "bold",
        color: theme.palette.primary.main,
        background: "#fff",
    },
}));

const NoElements = (props) => {
    const classes = useStyles();

    return (
        <>
            <Row className={classes.root}>
                <Col span={6} className={classes.col}>
                    <CardMedia
                        className={classes.media}
                        image={img}
                        title="img"
                    />
                </Col>
                <Col span={18} className={classes.col}>
                    <Row className={classes.row}>
                        {(props.element === "servicios" ||
                            props.element === "valoraciones") && (
                            <Typography variant="h4" className={classes.title}>
                                Aún no tienes {props.element}
                            </Typography>
                        )}
                        {props.element === "vehículos" && (
                            <Typography variant="h4" className={classes.title}>
                                ¡Oh oh! No tienes {props.element}
                            </Typography>
                        )}
                    </Row>
                    <Row className={classes.row}>
                        {props.element === "servicios" && (
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                className={classes.text}
                            >
                                No te preocupes, ya te buscaran :)
                            </Typography>
                        )}
                        {props.element === "valoraciones" && (
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                className={classes.text}
                            >
                                No te preocupes, sigue dando lo mejor de ti ;)
                            </Typography>
                        )}
                        {props.element === "vehículos" && (
                            <>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    className={classes.text}
                                >
                                    Puedes registrar uno dando clic al botón
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    className={classes.text}
                                >
                                    <span className={classes.button_insert}>
                                        PUBLICA TU VEHICULO
                                    </span>{" "}
                                    que se encuentra arriba a la derecha ;)
                                </Typography>
                            </>
                        )}
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default NoElements;
