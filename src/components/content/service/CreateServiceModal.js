import React, { useState } from "react";
import { Col, Drawer, Modal, Row, Steps } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import StepOne from "./StepOne";

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
        title: "Precio del servicio",
    },
    {
        title: "Confirmación del servicio",
    },
    {
        title: "Finalización del servicio",
    },
];

const CustomSteps = (props) => {
    const classes = useStyles();
    const [current, setCurrent] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState(false);

    const next = () => {
        const nextStep = current + 1;
        setCurrent(nextStep);
    };

    const prev = () => {
        const prevStep = current - 1;
        setCurrent(prevStep);
    };

    const onClickSteps = () => {
        setVisibleSteps(true);
    };

    return (
        <Modal
            visible={props.visibleService}
            onCancel={() => props.setVisibleService(false)}
            footer={null}
            style={{ overflow: "hidden" }}
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
                    {current === 0 ? (
                        <div className={classes.container}>
                            <StepOne setVisible={props.setVisibleService} />
                        </div>
                    ) : current === 1 ? (
                        <div>Paso 2</div>
                    ) : current === 2 ? (
                        <div>Paso 3</div>
                    ) : (
                        <div>Paso 4</div>
                    )}
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
