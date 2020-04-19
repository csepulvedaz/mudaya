import React, { useState } from "react";
import { Steps, Modal, Row, Col, Drawer } from "antd";

const { Step } = Steps;

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
            >
                <Col span={20}>
                    {current === 0 ? (
                        <div>Paso 1</div>
                    ) : current === 1 ? (
                        <div>Paso 2</div>
                    ) : current === 2 ? (
                        <div>Paso 3</div>
                    ) : (
                        <div>Paso 4</div>
                    )}
                </Col>
                <Col
                    span={3}
                    onClick={onClickSteps}
                    style={{ borderLeft: "1px solid #ccc" }}
                >
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
                style={{ position: "absolute" }}
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
