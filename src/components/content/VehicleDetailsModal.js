import React from "react";
import {Button, Modal} from 'antd';
import Typography from "@material-ui/core/Typography";

export default class VehicleDetailsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            loading: false,
            visible: props.visible,
        };
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading, value } = this.state;
        return (
                <Modal
                    visible={visible}
                    title="Detalles del vehículo"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Regresar
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            Reservar
                        </Button>,
                    ]}
                >
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Marca:{" "}
                        <span>
                            {value.brand}
                        </span>
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Modelo:{" "}
                        <span>
                            {value.model}
                        </span>
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Año:{" "}
                        <span>
                            {value.year}
                        </span>
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Capacidad:{" "}
                        <span>
                            {value.capacity} toneladas
                        </span>
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Dimensiones:{" "}
                        <span>
                            {value.dimensions}
                        </span>
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Comentario:{" "}
                        <span>
                            {value.commentary}
                        </span>
                    </Typography>
                </Modal>
        );
    }
}