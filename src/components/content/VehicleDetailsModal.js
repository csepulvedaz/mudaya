import React, { useState } from "react";
import { Button, Modal } from "antd";
import Typography from "@material-ui/core/Typography";

const VehicleDetaisModal = (props) => {
    const handleOk = () => {
        props.setVisible(false);
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
                <Button key="back" onClick={handleCancel}>
                    Regresar
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Reservar
                </Button>,
            ]}
        >
            <Typography variant="body2" color="textSecondary" component="p">
                Marca: <span>{props.value.brand}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Modelo: <span>{props.value.model}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Año: <span>{props.value.year}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Capacidad: <span>{props.value.capacity} toneladas</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Dimensiones: <span>{props.value.dimensions}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Comentario: <span>{props.value.commentary}</span>
            </Typography>
        </Modal>
    );
};

export default VehicleDetaisModal;
