import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {Col, Row} from "antd";

const useStyles = makeStyles({
    root: {
        width: "700rx",
        height: "360px",
        margin: "20px 25px",
        borderRadius: "9px",
    },
    media: {
        height: 100,
    },
    title: { textAlign: "center", color: "#3d3d3d" },
    text: {
        fontSize: "12px",
        textAlign: "center",
    },
    chip: {
        width: "108px",
        height: "40px",
        border: "solid 2px #ffee00",
        backgroundColor: "#ffffc8",
    },
});

const DriverVehicleCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={4}>
            <Col>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="img"
                />
            </Col>
            <CardContent>
                <Col>
                    <Row>
                        <Typography variant="h4" gutterBottom className={classes.title}>
                            {props.value.brand +" • "+ props.value.model}
                        </Typography>
                    </Row>
                    <Row>
                        <Typography variant="subtitle1" gutterBottom className={classes.text}>
                            {props.value.year}
                        </Typography>
                    </Row>
                    <Row>
                        <Typography variant="body1" className={classes.text}>
                            •Capacidad:{" "+props.value.capacity}
                        </Typography>
                        <Typography variant="body1" className={classes.text}>
                            •Dimensiones:{" "+props.value.dimensions}
                        </Typography>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Chip label={props.value._id} className={classes.chip}/>
                    </Row>
                    <Row>

                    </Row>
                    <Row>

                    </Row>
                </Col>
            </CardContent>
        </Card>
    );
};

export default DriverVehicleCard;
