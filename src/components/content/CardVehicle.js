import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { CardActionArea } from "@material-ui/core";
import { Button, Rate } from "antd";

import VehicleDetailsModal from "./VehicleDetailsModal";

const useStyles = makeStyles({
    root: {
        width: "190rx",
        height: "220px",
        margin: "20px 25px",
        borderRadius: "9px",
    },
    media: {
        height: 50,
        marginTop: "15px",
    },
    title: { textAlign: "center", color: "#3d3d3d" },
    text: {
        fontSize: "12px",
        textAlign: "center",
    },
    boldText: { fontWeight: "bold" },
    footer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    rate: {
        margin: "5px 0px",
        fontSize: "14px",
    },
    button: {
        margin: "5px 0px",
        borderRadius: "7px",
        background: "#FCB625",
        color: "#fff",
        fontWeight: "600",
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.16)",
        fontSize: "13px",
    },
});

const CardVehicle = (props) => {
    const classes = useStyles();
    const [visible, setVisible] = useState(false);
    const openModal = (e) => {
        e.preventDefault();
        setVisible(true);
    };

    return (
        <Card className={classes.root} elevation={4}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="img"
                />
            </CardActionArea>
            <CardContent>
                <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    component="p"
                    className={classes.title}
                    gutterBottom={true}
                >
                    {props.type}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.text}
                >
                    Capacidad:{" "}
                    <span className={classes.boldText}>{props.capacity} m</span>
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.text}
                >
                    Dimensiones:{" "}
                    <span className={classes.boldText}>
                        {props.dimensions} m
                    </span>
                </Typography>
                <div className={classes.footer}>
                    <Rate
                        disabled
                        allowHalf
                        defaultValue={props.stars}
                        className={classes.rate}
                    />
                    <Button
                        className={classes.button}
                        onClick={(e) => openModal(e)}
                    >
                        Ver más...
                    </Button>
                    <VehicleDetailsModal
                        visible={visible}
                        setVisible={setVisible}
                        value={props.value}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default CardVehicle;
