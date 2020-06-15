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
        display: "inline",
        padding: "4px 8px",
        borderRadius: "2px 8px 8px 8px",
    },
    message_text_me: {
        background: theme.palette.primary.light,
        color: "#fff",
        display: "inline",
        padding: "4px 8px",
        borderRadius: "2px 8px 8px 8px",
    }
}));

const Message = (props) => {    
    const classes = useStyles();
    const {client} = useContext(AuthContext);

    return (
        <>
            {(client === "user") && (props.messageId === "user") && (
                <div key={props.index}>
                    <div className={classes.message_username}>{props.messageId}</div>
                    <div className={classes.message_text_me}>{props.messageText}</div>
                </div>
            )}
            {(client === "driver")&& (props.messageId === "driver") && (
                <div key={props.messageIndex}>
                    <div className={classes.message_username}>{props.messageId}</div>
                    <div className={classes.message_text_me}>{props.messageText}</div>
                </div>
            )}
            {(client === "user") && (props.messageId === "driver") && (
                <div key={props.index}>
                    <div className={classes.message_username}>{props.messageId}</div>
                    <div className={classes.message_text_you}>{props.messageText}</div>
                </div>
            )}
            {(client === "driver")&& (props.messageId === "user") && (
                <div key={props.messageIndex}>
                    <div className={classes.message_username}>{props.messageId}</div>
                    <div className={classes.message_text_you}>{props.messageText}</div>
                </div>
            )}
        </>
    );
};

export default Message;