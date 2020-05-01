import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { Col, Row } from "antd";

import TruckLicense from "../../header/service/TruckLicense";

const useStyles = makeStyles({
    root: {
        width: "700px",
        border: "solid 0.5px #707070",
        background: "#FFFFFF",
    },
    media: {
        height: 100,
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
        fontSize: "15px",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        letterSpacing: "normal",
        textAlign: "left",
        color: "#acacac",
    },
    chip: {
        width: "108px",
        height: "40px",
        border: "solid 2px #ffee00",
        backgroundColor: "#ffffc8",
        fontWeight: "bold",
    },
    row: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    col: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    margins: {
        padding: "10px",
    },
    innerMargins: {
        paddingInline: "30px",
    },
});

const DriverVehicleCard = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Row className={classes.margins}>
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
                            {props.value.brand + " • " + props.value.model}
                        </Typography>
                    </Row>
                    <Row>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            className={classes.year}
                        >
                            {props.value.year}
                        </Typography>
                    </Row>
                    <Row className={classes.innerMargins}>
                        <Typography variant="body1" className={classes.text}>
                            • Capacidad:{" " + props.value.capacity}
                        </Typography>
                        <Typography
                            variant="body1"
                            gutterBottom
                            className={classes.text}
                        >
                            • Dimensiones:{" " + props.value.dimensions}
                        </Typography>
                    </Row>
                </Col>
                <Col span={6} className={classes.col}>
                    <Row className={classes.row}>
                        <TruckLicense vehicleId={props.value._id} />
                    </Row>
                    <Row className={classes.row}></Row>
                    <Row className={classes.row}></Row>
                </Col>
            </Row>
        </div>
    );
};

export default DriverVehicleCard;
