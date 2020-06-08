import React, {useContext, useState} from "react";
import {Col, Drawer, Modal, Row, Steps} from "antd";
import {makeStyles} from "@material-ui/core/styles";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepWait from "./StepWait";

import AuthContext from "../../../context/auth-context";

const { Step } = Steps;

const useStyles = makeStyles({
    container: {
        width: "90%",
    },
    drawer: {
        position: "absolute",
    },
});

const steps = [
    {
        title: "Solicitud del servicio",
    },
    {
        title: "Confirmación del servicio",
    },
    {
        title: "Realización del servicio",
    },
    {
        title: "Calificación del servicio",
    },
];

const CreateServiceModal = (props) => {
    const classes = useStyles();
    const { client } = useContext(AuthContext);
    let current=0;
    if (props.value){props.value.state === "onHold"? current = 1
        : props.value.state === "started"? current = 1
        : props.value.state === "accepted"? current = 2
        : props.value.state === "canceled"||props.value.state === "finished"?current = 3
        : props.value.state === "rated"? current = 4
        : current = 0;}
    const [visibleSteps, setVisibleSteps] = useState(false);

    const onClickSteps = () => {
        setVisibleSteps(true);
    };

    const onCancel = () => {
        props.setVisibleService(false);
    };

    return (
        <Modal
            visible={props.visibleService}
            onCancel={onCancel}
            footer={null}
            style={{
                overflow: "hidden",
            }}
        >
            <Row
                gutter={[24, 0]}
                style={{ margin: "20px 0px 10px 10px" }}
                justify="space-between"
                align="middle"
            >
                <Col
                    span={21}
                    style={{
                        borderRight: "1px solid #ccc",
                    }}
                >
                    <div className={classes.container}>
                        {current === 0 && client === "user" ? (
                            <StepOne
                                idVehicle={props.idVehicle}
                                idDriver={props.idDriver}
                                setVisible={props.setVisibleService}
                            />
                        ) : current === 1 &&
                          client === "driver" &&
                          props.value.state === "started" ? (
                            <StepTwo
                                value={props.value}
                                setVisible={props.setVisibleService}
                            />
                        ) : client === "user" &&
                          props.value.state === "started" ? (
                            <StepWait
                                subject="Conductor"
                                setVisible={props.setVisibleService}
                            />
                        ) : client === "driver" &&
                          props.value.state === "onHold" ? (
                            <StepWait
                                subject="Usuario"
                                setVisible={props.setVisibleService}
                            />
                        ) : current === 1 &&
                          client === "user" &&
                          props.value.state === "onHold" ? (
                            <StepThree
                                value={props.value}
                                setVisible={props.setVisibleService}
                            />
                        ) : client === "user" &&
                        props.value.state === "finished" ? (
                            <StepFour
                                value={props.value}
                                setVisible={props.setVisibleService}
                            />
                        ) : client === "driver" &&
                        props.value.state === "finished" ? (
                            <StepWait
                                subject="Usuario"
                                setVisible={props.setVisibleService}
                            />
                        ) : props.value.state === "rated" ? (
                            <StepFive
                                value={props.value}
                                setVisible={props.setVisibleService}
                            />
                        ) : (
                            <StepThree
                                value={props.value}
                                setVisible={props.setVisibleService}
                            />
                        )
                        }
                    </div>
                </Col>
                <Col span={3} onClick={onClickSteps}>
                    <Steps direction="vertical" size="small" current={current}>
                        {steps.map((item) => (
                            <Step key={item.title} />
                        ))}
                    </Steps>
                </Col>
            </Row>
            <Drawer
                placement="right"
                width={250}
                closable={false}
                onClose={() => setVisibleSteps(false)}
                visible={visibleSteps}
                getContainer={false}
                className={classes.drawer}
                bodyStyle={{ display: "flex", alignContent: "center" }}
            >
                <Steps direction="vertical" size="small" current={current}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
            </Drawer>
        </Modal>
    );
};

export default CreateServiceModal;
