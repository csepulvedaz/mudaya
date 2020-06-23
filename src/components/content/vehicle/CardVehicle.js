import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { CardActionArea } from "@material-ui/core";
import { Button, Rate, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import VehicleDetailsModal from "./VehicleDetailsModal";
import CreateServiceModal from "../service/CreateServiceModal";
import { useQuery } from "@apollo/client";
import { RANK_BY_VEHICLE } from "../../../graphql/queries";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "190rx",
        height: "360px",
        margin: "20px 25px",
        borderRadius: "8px",
        border:`1px ${theme.palette.grey[300]} solid`,
        boxShadow:"none",
        "&:hover": {
            border:`2px ${theme.palette.primary.light} solid`,
            boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        },
    },
    media: {
        height: "90px",
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
        margin: "10px 0px",
        borderRadius: "8px",
        background: theme.palette.primary.main,
        color: "#fff",
        fontWeight: "600",
        fontSize: "13px",
        boxShadow: theme.shadows[0],
        "&:hover": {
            background: theme.palette.primary.main,
            color: "#fff !important",
            boxShadow: theme.shadows[3],
        },
    },
    rankText:{
        color:theme.palette.grey[500],
        fontSize:"13px",
    }
}));

const CardVehicle = (props) => {
    const classes = useStyles();
    const [visible, setVisible] = useState(false);
    const [visibleService, setVisibleService] = useState(false);
    const openModal = (e) => {
        e.preventDefault();
        setVisible(true);
    };

    const { loading: loadingRank, error: errorRank, data: dataRank } = useQuery(
        RANK_BY_VEHICLE,
        {
            variables: { idVehicle: props.value._id },
            fetchPolicy: "no-cache",
        }
    );

    if (loadingRank)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );

    if (errorRank) return `Error! ${errorRank}`;

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
                    <span className={classes.boldText}>{props.capacity}</span>
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.text}
                >
                    Dimensiones:{" "}
                    <span className={classes.boldText}>
                        {props.dimensions}
                    </span>
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.text}
                >
                    Departamento:{" "}
                    
                    {props.value.department === null && 
                        <span className={classes.text} style= {{fontStyle:"italic"}}>No especificado</span>
                    }
                    {props.value.department !== null && 
                        <span className={classes.boldText}>
                            {props.value.department}
                        </span>
                    }
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.text}
                >
                    Municipio:{" "}
                    {props.value.city === null && 
                        <span className={classes.text} style= {{fontStyle:"italic"}}>No especificado</span>
                    }
                    {props.value.city !== null && 
                        <span className={classes.boldText}>{props.value.city}</span>
                    }
                </Typography>
                <div className={classes.footer}>
                    <Rate
                        disabled
                        allowHalf
                        defaultValue={
                            dataRank.rankByVehicle
                                ? dataRank.rankByVehicle.value
                                : 5
                        }
                        className={classes.rate}
                    />
                    <span className={classes.rankText}>
                        Calificaciones: 
                        <span style={{fontWeight:"bold"}}>
                            {" "}
                            {dataRank.rankByVehicle
                            ? dataRank.rankByVehicle.totalRatings
                            : 0}
                        </span>
                    </span>
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
                        setVisibleService={setVisibleService}
                    />
                    <CreateServiceModal
                        idVehicle={props.value._id}
                        idDriver={props.value.idDriver}
                        visibleService={visibleService}
                        setVisibleService={setVisibleService}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default CardVehicle;
