import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../../context/auth-context";

const useStyles = makeStyles((theme) => ({
    container:{
        //display:"flex",
        //flexDirection:"column",
    },
    message_text_you: {
        background: theme.palette.chat.yourBubble,
        color: theme.palette.chat.yourText,
        float: "left",
        maxWidth: "60%",
        display: "inline-lbock",
        margin: "4px 0",
        padding: "10px 16px",
        borderRadius: "2px 16px 16px 16px",
    },
    message_text_me: {
        background: theme.palette.chat.myBubble,
        color: theme.palette.chat.myText,
        float: "right",
        maxWidth: "60%",
        display: "inline-lbock",
        padding: "10px 16px",
        margin: "4px 0",
        borderRadius: "16px 2px 16px 16px",
    },
    time_stamp: {
        fontSize: "11px",
        color: theme.palette.grey[600],
        opacity: "0.9",
        margin: "10px 0 6px 0",
    },
}));

const Message = (props) => {
    const classes = useStyles();
    const { client } = useContext(AuthContext);

    return (
        <>
            {client === "user" && props.messageId === "user" && (
                <div key={props.index} className={classes.container}>
                    <div className={classes.message_text_me}>
                        {props.messageText}
                    </div>
                </div>
            )}
            {client === "driver" && props.messageId === "driver" && (
                <div key={props.messageIndex} className={classes.container}>
                    <div className={classes.message_text_me}>
                        {props.messageText}
                    </div>                    
                    <div className={classes.time_stamp}>
                        13:02
                    </div>
                </div>
            )}
            {client === "user" && props.messageId === "driver" && (
                <div key={props.index} className={classes.container}>
                    <div className={classes.message_text_you}>
                        {props.messageText}
                    </div>
                </div>
            )}
            {client === "driver" && props.messageId === "user" && (
                <div key={props.messageIndex} className={classes.container}>
                    <div className={classes.message_text_you}>
                        {props.messageText}
                    </div>                    
                    <div className={classes.time_stamp}>
                        13:02
                    </div>
                </div>
            )}
        </>
    );
};

export default Message;
