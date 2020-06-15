import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from 'antd';
import { ErrorMessage, Form, Formik,Field } from "formik";
import * as Yup from "yup";
import firebase from "../../../firebase";
import AuthContext from "../../../context/auth-context";

const  useStyles = makeStyles((theme)=>({
    root:{
        background: "#ff1111",
    },
    send_message_form:{
        gridArea: "f",
    },
}))

const SendMessageForm = (props) => {
    var database = firebase.database();
    const classes = useStyles();
    const context = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {
        database.ref(`chats/${props.valueService._id}`).on('value', snapshots =>{
            const currentMessages = snapshots.val();
            if(currentMessages != null){
                setMessagesList(currentMessages);
            }
        });    
    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(message!==""){
            const newMessage={
                id:context.client,
                text:message
            };
            database.ref(`chats/${props.valueService._id}/${messagesList.length}`).set(newMessage);
            setMessage('');
            document.getElementById("chat").reset();
        }
        
    }    
    const updateMessage = (e) => {
        setMessage(e.target.value);
    };
    return (
        <Formik id="chat"
            initialValues={{text:""}}
            className={classes.send_message_form}
            validationSchema={Yup.object({
                text: Yup.string()
                    .required("Campo requerido!")
                    .matches(/^[A-Z]|[a-z]|[0-9]+/),
                
            })}
            onSubmit={(values,{resetForm}) => {   
                values.text=values.text.trim();             
                const newMessage={
                    id:context.client,
                    text:values.text
                };
                database.ref(`chats/${props.valueService._id}/${messagesList.length}`).set(newMessage);
                resetForm();
                // document.getElementById("chat").reset();
                
            }}
            
        >
            {(formik) => (
                        <Form
                            className={classes.form}
                            onSubmit={formik.handleSubmit}
                            noValidate
                        >
                            <Field name="text"
                placeholder="SendMessageForm"
                type="text"  />
           
                        <Button
                            type="submit"
                        >
                            Enviar
                        </Button>
        </Form>)}
        </Formik>
    );
};

export default SendMessageForm;