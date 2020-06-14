import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const  useStyles = makeStyles((theme)=>({
    root:{
        background: "#ff1111",
    },
    send_message_form:{
        gridArea: "f",
    },
}))

const SendMessageForm = () => {
    const classes = useStyles();
    return (
        <form className={classes.send_message_form}>
            <input
                placeholder="SendMessageForm"
                type="text" />
        </form>
    );
};

export default SendMessageForm;