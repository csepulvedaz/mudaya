import React from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";

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
// import AuthContext from "../../context/auth-context";
//   const context = useContext(AuthContext);
//   const { loading: loading1, error: error1, data: data1 } = useQuery(
//     context.client === "user" ? PROFILEUSER : PROFILEDRIVER,
//     {
//       variables: { _id: context.userId },
//       onError: (error) => {
//         errorModal(error.graphQLErrors[0].message);
//       },
//     }
//   );

// const User = (props) => {
//   const { steps } = props;
//   console.log(steps);
//   const origen = steps[6].value;
//   const destino = steps[8].value;
//   const comentario = steps[10].value;

//   return (
//     <div style={{ width: "100%" }}>
//       <h3>Servicio</h3>
//       <table>
//         <tbody>
//           <tr>
//             <td>Origen</td>
//             <td>{origen}</td>
//           </tr>
//           <tr>
//             <td>Destino</td>
//             <td>{destino}</td>
//           </tr>
//           <tr>
//             <td>Comentario</td>
//             <td>{comentario}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };
const CustomChatBot = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <ChatBot
                steps={[
                    {
                        id: "welcome",
                        component: (
                            <span>
                                Hola! Soy el Bruce, el asistente de PRAVA.
                            </span>
                        ),
                        asMessage: true,
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
                                trigger: "service1",
                            },
                            {
                                value: 2,
                                label: "Tengo una queja.",
                                trigger: "complain1",
                            },
                        ],
                    },
                    {
                        id: "complain1",
                        message: "Por favor, escriba la queja.",
                        trigger: "complain2",
                    },
                    {
                        id: "complain2",
                        placeholder: "Escriba un mensaje...",
                        user: true,
                        trigger: "complain3",
                    },
                    {
                        id: "complain3",
                        message: "Queja procesada con exito.",
                        trigger: "complain4",
                    },
                    {
                        id: "complain4",
                        message:
                            "Nuestro equipo de atención al cliente te responderá lo mas pronto posible. :)",
                        trigger: "question2",
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
