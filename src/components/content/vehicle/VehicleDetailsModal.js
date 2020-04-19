import React from "react";
import { Button, Modal } from "antd";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    text: {
        fontSize: "15px",
        textAlign: "left",
    },
    boldText: { fontWeight: "bold" },
    button: {
        margin: "5px 0px",
        borderRadius: "7px",
        background: "#FCB625",
        color: "#fff",
        focus: "false",
        fontWeight: "600",
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.16)",
    },
    backButton: {
        margin: "5px 0px",
        borderRadius: "7px",
        background: "#fff",
        color: "#FCB625",
        fontWeight: "600",
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.16)",
    },
});

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
            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
            >
                Capacidad:{" "}
                <span className={classes.boldText}>
                    {props.value.capacity} Metros
                </span>
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
            >
                Dimensiones:{" "}
                <span className={classes.boldText}>
                    {props.value.dimensions} Metros
                </span>
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
            >
                Comentario:{" "}
                <span className={classes.boldText}>
                    {props.value.commentary}
                </span>
            </Typography>
        </Modal>
    );
};

export default VehicleDetaisModal;
