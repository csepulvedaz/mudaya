import React, { useState, useContext } from "react";
import { Col, Drawer, Modal, Row, Steps } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
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

const stepsUser = [
    {
        title: "Solicitud del servicio",
    },
    {
        title: "Confirmación del servicio",
    },
    {
        title: "Datos del servicio",
    },
];

const stepsDriver = [
    {
        title: "Recibir servicio",
    },
    {
        title: "Datos del servicio",
    },
];

const CustomSteps = (props) => {
    const classes = useStyles();
    const { client } = useContext(AuthContext);
    const [current, setCurrent] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState(false);
    const steps = client === "user" ? stepsUser : stepsDriver;

    const next = () => {
        setCurrent(current + 1);
    };

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
                        ) : current === 0 &&
                          client === "driver" &&
                          props.value.state === "started" ? (
                            <StepTwo
                                value={props.value}
                                setVisible={props.setVisibleService}
                                next={next}
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
                        ) : client === "user" &&
                          props.value.state === "onHold" ? (
                            <StepThree
                                setVisible={props.setVisibleService}
                                next={next}
                            />
                        ) : (
                            <div>Paso 4</div>
                        )}
                    </div>
                </Col>
                <Col span={3} onClick={onClickSteps}>
                    <Steps direction="vertical" size="small" current={current}>
                        {steps.map((item) => (
                            <Step
                                key={item.title}
                                //  title={item.title}
                            />
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

export default CustomSteps;
