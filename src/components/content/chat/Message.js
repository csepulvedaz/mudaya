import React, {useState, useContext} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import AuthContext from "../../../context/auth-context";

const useStyles = makeStyles((theme)=>({
    message_username: {
        fontSize: "11px",
        color: theme.palette.grey[600],
        opacity: "0.9",
        margin: "10px 0 6px 0",
    },
    message_text_you: {
        background: "#fff",
        color: theme.palette.primary.light,
        float:"left",
        maxWidth:"60%",
        display: "inline-lbock",
        margin:"4px 0",
        padding: "10px 16px",
        borderRadius: "2px 16px 16px 16px",
    },
    message_text_me: {
        background: theme.palette.primary.light,
        color: "#fff",
        float:"right",
        maxWidth:"60%",
        display: "inline-lbock",
        padding: "10px 16px",
        margin:"4px 0",
        borderRadius: "16px 2px 16px 16px",
    }
}));

const Message = (props) => {    
    const classes = useStyles();
    const {client} = useContext(AuthContext);

    return (
        <>
            {(client === "user") && (props.messageId === "user") && (
                <div key={props.index}>
                    <div className={classes.message_text_me}>{props.messageText}</div>
                </div>
            )}
            {(client === "driver")&& (props.messageId === "driver") && (
                <div key={props.messageIndex}>
                    <div className={classes.message_text_me}>{props.messageText}</div>
                </div>
            )}
            {(client === "user") && (props.messageId === "driver") && (
                <div key={props.index}>
                    <div className={classes.message_text_you}>{props.messageText}</div>
                </div>
            )}
            {(client === "driver")&& (props.messageId === "user") && (
                <div key={props.messageIndex}>
                    <div className={classes.message_text_you}>{props.messageText}</div>
                </div>
            )}
        </>
    );
};

export default Message;