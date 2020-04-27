import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {Col, Row, Spin} from "antd";
import {useQuery} from "@apollo/client";
import {VEHICLE} from "../../../graphql/queries";
import {LoadingOutlined} from "@ant-design/icons";

const useStyles = makeStyles({
    root: {
        width: "700px",
        border: "solid 0.5px #707070",
        background: "#FFFFFF"
    },
    media: {
        height: 100,
    },
    title: {
        fontSize: "30px",
        textAlign: "center",
        color: "#3d3d3d" },
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
    dateChip: {
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

const DriverServiceCard = (props) => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(VEHICLE,{variables: { _id: props.value.idVehicle }});
    if (loading)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );
    if (error) return `Error! ${error}`;

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
                    <Row >
                        <Typography variant="h4" className={classes.title}>
                            {data.vehicle.brand +" • "+ data.vehicle.model}
                        </Typography>
                    </Row>
                    <Row >
                        <Typography variant="subtitle1" gutterBottom className={classes.year}>
                            {data.vehicle.year}
                        </Typography>
                    </Row>
                    <Row className={classes.innerMargins}>
                        <Typography variant="body1" className={classes.text}>
                            • Origen:{" "+props.value.origin}
                        </Typography>
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            • Destino:{" "+props.value.destination}
                        </Typography>
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            • Comentarios:{" "+props.value.commentaryUser}
                        </Typography>
                    </Row>
                </Col>
                <Col span={6} className={classes.col}>
                    <Row className={classes.row}>
                        <Chip label={props.value.date} className={classes.dateChip}/>
                    </Row>
                    <Row className={classes.row}>
                        <Chip label={data.vehicle._id} className={classes.chip}/>
                    </Row>
                    <Row className={classes.row}>

                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default DriverServiceCard;
