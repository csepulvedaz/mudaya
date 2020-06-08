import React, { useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import ChatBot, { Loading } from "react-simple-chatbot";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";

import AuthContext from "../../context/auth-context";
import { CREATE_COMPLAIN_USER } from "../../graphql/mutations";

const config = {
    width: "400px",
    height: "500px",
    headerFontSize: "10px",
    floating: true,
    placeholder: "Selecciona una opción.",
    userDelay: 500,
    // submitButtonStyle: { display: "none" },
};
const theme = {
    background: "#f5f8fb",
    fontFamily: "Open Sans",
    headerBgColor: "#FFFFFF",
    headerFontColor: "#63b6bf",
    headerFontSize: "15px",
    botBubbleColor: "#63b6bf",
    botFontColor: "#FFFFFF",
    userBubbleColor: "#FFFFFF",
    userFontColor: "#4a4a4a",
};

function errorModal(msg) {
    Modal.error({
        title: "Error",
        content: msg,
    });
}

const Response = (props) => {
    const context = useContext(AuthContext);
    const { steps } = props;
    console.log(steps.complain2.value);

    const [createComplain, { loading }] = useMutation(CREATE_COMPLAIN_USER, {
        onError: (error) => {
            errorModal(error.graphQLErrors[0].message);
        },
    });

    useEffect(() => {
        createComplain({
            variables: { _id: context.userId, complain: steps.complain2.value },
        });
    }, [context.userId, createComplain, steps.complain2.value]);

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <span>
                    La queja: "{steps.complain2.value}" ha sido procesada con
                    exito.
                </span>
            )}
        </div>
    );
};

Response.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
};

Response.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};

const CustomChatBot = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <ChatBot
                steps={[
                    {
                        id: "welcome",
                        message: "Hola! Soy el Bruce, el asistente de PRAVA.",
                        trigger: "question",
                    },
                    {
                        id: "question",
                        message: "¿En que puedo ayudar?",
                        trigger: "options",
                    },
                    {
                        id: "question2",
                        message: "¿Puedo ayudar en algo mas?",
                        trigger: "options",
                    },
                    {
                        id: "options",
                        options: [
                            {
                                value: 1,
                                label: "Quiero solicitar un servicio.",
                                trigger: "service0",
                            },
                            {
                                value: 2,
                                label: "Tengo una queja.",
                                trigger: "complain1",
                            },
                        ],
                    },
                    // -------- Complain ---------
                    {
                        id: "complain1",
                        message: "Por favor, escriba la queja.",
                        trigger: "complain2",
                    },
                    {
                        id: "complain2",
                        placeholder: "Escriba un mensaje...",
                        user: true,
                        validator: (value) => {
                            if (value === "") {
                                return "Debe escribir algo.";
                            }
                            return true;
                        },
                        trigger: "complain3",
                    },
                    {
                        id: "complain3",
                        component: <Response />,
                        asMessage: true,
                        trigger: "complain4",
                    },
                    {
                        id: "complain4",
                        message:
                            "Nuestro equipo de atención al cliente te responderá lo mas pronto posible. :)",
                        trigger: "question2",
                    },
                    // -------- Service ---------
                    {
                        id: "service0",
                        message:
                            "Para solicitar un servicio, siga los siguientes pasos:",
                        trigger: "service1",
                    },
                    {
                        id: "service1",
                        message:
                            "Por favor, seleccione el vehiculo de su preferencia en el panel vehiculos disponibles o en el filtro de vehiculos.",
                        trigger: "service2",
                    },
                    {
                        id: "service1",
                        message:
                            "Por favor, seleccione el vehiculo de su preferencia en el panel vehiculos disponibles o en el filtro de vehiculos.",
                        trigger: "service2",
                    },
                    {
                        id: "service2",
                        options: [
                            {
                                value: 1,
                                label: "Siguiente",
                                trigger: "service3",
                            },
                        ],
                    },
                    {
                        id: "service3",
                        message: "Presione el botón para reservar.",
                        trigger: "service4",
                    },
                    {
                        id: "service4",
                        options: [
                            {
                                value: 1,
                                label: "Siguiente",
                                trigger: "service5",
                            },
                        ],
                    },
                    {
                        id: "service5",
                        message: "Seleccione el día y la hora del trasteo.",
                        trigger: "service6",
                    },
                    {
                        id: "service6",
                        options: [
                            {
                                value: 1,
                                label: "Siguiente",
                                trigger: "service7",
                            },
                        ],
                    },
                    {
                        id: "service7",
                        message: "Digite la dirección de origen.",
                        trigger: "service8",
                    },
                    {
                        id: "service8",
                        options: [
                            {
                                value: 1,
                                label: "Siguiente",
                                trigger: "service9",
                            },
                        ],
                    },
                    {
                        id: "service9",
                        message: "Digite la dirección de destino.",
                        trigger: "service10",
                    },
                    {
                        id: "service10",
                        options: [
                            {
                                value: 1,
                                label: "Siguiente",
                                trigger: "service11",
                            },
                        ],
                    },
                    {
                        id: "service11",
                        message:
                            "Si quiere darle algún comentario al conductor.",
                        trigger: "service12",
                    },
                    {
                        id: "service12",
                        options: [
                            {
                                value: 1,
                                label: "Siguiente",
                                trigger: "service13",
                            },
                        ],
                    },
                    {
                        id: "service13",
                        message:
                            "Presione enviar y el conductor le respondera con el precio del servicio.",
                        trigger: "service14",
                    },
                    {
                        id: "service14",
                        message:
                            "Prava dando las mejores soluciones de transporte, gracias por elegirnos.",
                        trigger: "question2",
                    },
                ]}
                {...config}
            />
        </ThemeProvider>
    );
};

export default CustomChatBot;
