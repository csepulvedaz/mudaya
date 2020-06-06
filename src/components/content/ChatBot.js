import React, { useState, useContext } from "react";
import Bot from "react-simple-chatbot";
import AuthContext from "../../context/auth-context";
const config = {
  width: "400px",
  height: "500px",
  headerFontSize: "10px",
  floating: true,
};
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

const User = (props) => {
  const { steps } = props;
  console.log(steps);
  const origen = steps[6].value;
  const destino = steps[8].value;
  const comentario = steps[10].value;

  return (
    <div style={{ width: "100%" }}>
      <h3>Servicio</h3>
      <table>
        <tbody>
          <tr>
            <td>Origen</td>
            <td>{origen}</td>
          </tr>
          <tr>
            <td>Destino</td>
            <td>{destino}</td>
          </tr>
          <tr>
            <td>Comentario</td>
            <td>{comentario}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const ChatBot = (props) => {
  return (
    <Bot
      steps={[
        {
          id: "Welcome",
          component: <span>hola</span>,
          asMessage: true,
          trigger: "2",
        },

        {
          id: "2",
          message:
            "soy el asistente de PRAVA para ayudarte a solicitar servicios",
          trigger: "3",
        },
        {
          id: "3",
          message: "Primero seleccione el vehiculo de tu preferencia",
          trigger: "4",
        },
        {
          id: "4",
          options: [
            { value: 1, label: "Siguiente", trigger: "5" },
            { value: 2, label: "Repetir", trigger: "2" },
          ],
        },
        {
          id: "5",
          message: "Presione el botón de reservar",
          trigger: "6",
        },
        {
          id: "6",
          options: [
            { value: 1, label: "Siguiente", trigger: "7" },
            { value: 2, label: "Repetir", trigger: "2" },
          ],
        },
        {
          id: "7",
          message: "Seleccione el día y la hora del trasteo",
          trigger: "8",
        },
        {
          id: "8",
          options: [
            { value: 1, label: "Siguiente", trigger: "9" },
            { value: 2, label: "Repetir", trigger: "2" },
          ],
        },
        {
          id: "9",
          message: "Digite la direccion de origen",
          trigger: "10",
        },
        {
          id: "10",
          options: [
            { value: 1, label: "Siguiente", trigger: "11" },
            { value: 2, label: "Repetir", trigger: "2" },
          ],
        },
        {
          id: "11",
          message: "Digite la direccion de destino",
          trigger: "12",
        },
        {
          id: "12",
          options: [
            { value: 1, label: "Siguiente", trigger: "13" },
            { value: 2, label: "Repetir", trigger: "2" },
          ],
        },
        {
          id: "13",
          message: "Si quiere darle algún comentario al conductor",
          trigger: "14",
        },
        {
          id: "14",
          options: [
            { value: 1, label: "Siguiente", trigger: "15" },
            { value: 2, label: "Repetir", trigger: "2" },
          ],
        },
        {
          id: "15",
          message:
            "Presione enviar y el conductor le respondera con el precio del servicio",
          trigger: "16",
        },
        {
          id: "16",
          message:
            "Prava dando las mejores soluciones de transporte, gracias por elegirnos",
          end: true,
        },
      ]}
      {...config}
    />
  );
};

export default ChatBot;
