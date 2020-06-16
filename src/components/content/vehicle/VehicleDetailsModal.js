import React from "react";
import {Button, Modal} from "antd";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import MyLocationRoundedIcon from '@material-ui/icons/MyLocationRounded';
import LocalShippingRoundedIcon from '@material-ui/icons/LocalShippingRounded'; 
import AspectRatioRoundedIcon from '@material-ui/icons/AspectRatioRounded';
import RecordVoiceOverRoundedIcon from '@material-ui/icons/RecordVoiceOverRounded';

const useStyles = makeStyles((theme)=>({
    text: {
        fontSize: "15px",
        textAlign: "left",
        marginLeft: "",
    },
    boldText: { fontWeight: "bold" },
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
    commentary:{
        fontSize: "13px",
        textAlign: "left",
        color: theme.palette.grey[500],
        width: "90%",
        fontStyle: "italic"
    },
    divider:{
        borderTop: `1px ${theme.palette.grey[100]} solid`,
        width: "70%",
        margin: "12px auto",
    },
    icon:{
        color:theme.palette.grey[500],
    }
}));

const VehicleDetaisModal = (props) => {
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
            title="Detalles del vehículo"
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
        >
            <LocalShippingRoundedIcon className={classes.icon}/>
            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
            >
                Marca:{" "}
                <span className={classes.boldText}>{props.value.brand}</span>
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
            >
                Modelo:{" "}
                <span className={classes.boldText}>{props.value.model}</span>
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
            >
                Año:{" "}
                <span className={classes.boldText}>{props.value.year}</span>
            </Typography>
            <div className={classes.divider}/>

            <AspectRatioRoundedIcon className={classes.icon}/>

            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
            >
                Dimensiones del vehículo:{" "}
                <span className={classes.boldText}>
                    {props.value.dimensions}
                </span>
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
            >
                Capacidad de carga:{" "}
                <span className={classes.boldText}>
                    {props.value.capacity}
                </span>
            </Typography>
            <div className={classes.divider}/>
            
            <MyLocationRoundedIcon className={classes.icon}/>

            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
            >
                Departamento:{" "}
                <span className={classes.boldText}>
                        {props.value.department}
                    </span>
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
            >
                Municipio:{" "}
                <span className={classes.boldText}>
                        {props.value.city}
                    </span>
            </Typography>
            <div className={classes.divider}/>

            <RecordVoiceOverRoundedIcon className={classes.icon}/>

            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
            >
                Comentario del conductor:{" "}
                <span className={classes.commentary}>
                    {props.value.commentary}
                </span>
            </Typography>
        </Modal>
    );
};

export default VehicleDetaisModal;
