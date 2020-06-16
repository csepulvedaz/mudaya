import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import moment from 'moment';

import firebase from "../../../firebase";
import AuthContext from "../../../context/auth-context";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#ff1111",
    },
    send_message_form: {
        gridArea: "f",
    },
    input: {
        width: "87%",
        margin: "10px 10px 0px 0px",
        padding: "10px 10px 10px 20px",
        border: "none",
        borderRadius: "24px",
    },
    button: { background: `${theme.palette.primary.light}` },
    icon: { fontSize: "20px", color: "#fff" },
}));

const SendMessageForm = (props) => {
    var database = firebase.database();
    const classes = useStyles();
    const context = useContext(AuthContext);
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {
        database
            .ref(`chats/${props.valueService._id}`)
            .on("value", (snapshots) => {
                const currentMessages = snapshots.val();
                if (currentMessages != null) {
                    setMessagesList(currentMessages);
                }
            });
    }, [database, props]);

    return (
        <Formik
            id="chat"
            initialValues={{ text: "" }}
            className={classes.send_message_form}
            validationSchema={Yup.object({
                text: Yup.string()
                    .required("Campo requerido!")
                    .matches(/^[A-Z]|[a-z]|[0-9]+/),
            })}
            onSubmit={(values, { resetForm }) => {
                values.text = values.text.trim();
                const newMessage = {
                    id: context.client,
                    text: values.text,
                    timestamp: moment(new Date()).format("DD/MM/YYYY, h:mm a")
                };
                database
                    .ref(
                        `chats/${props.valueService._id}/${messagesList.length}`
                    )
                    .set(newMessage);
                resetForm();
            }}
        >
            {(formik) => (
                <Form
                    className={classes.form}
                    onSubmit={formik.handleSubmit}
                    noValidate
                >
                    <Field
                        name="text"
                        placeholder="Escribe algo..."
                        type="text"
                        className={classes.input}
                    />
                    <IconButton type="submit" className={classes.button}>
                        <SendIcon className={classes.icon} />
                    </IconButton>
                </Form>
            )}
        </Formik>
    );
};

export default SendMessageForm;
