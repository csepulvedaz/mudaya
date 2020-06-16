import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../../firebase";

import Message from "./Message";

const useStyles = makeStyles((theme) => ({
    message_list: {
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        padding: "20px",
        width: "100%",
        height: "520px",
        overflowY: "scroll",
    },
}));

const MessageList = (props) => {
    const classes = useStyles();
    var database = firebase.database();
    const [messagesList, setMessagesList] = useState([]);

    const messages = useRef(null);

    const scrollToBottom = () => {
        messages.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        database
            .ref(`chats/${props.valueService._id}`)
            .on("value", (snapshots) => {
                const currentMessages = snapshots.val();
                if (currentMessages != null) {
                    setMessagesList(currentMessages);
                    scrollToBottom();
                }
            });
    }, [database, props, messages]);
    return (
        <div className={classes.message_list}>
            {messagesList.map((message, index) => {
                return (
                    <Message
                        messageId={message.id}
                        messageText={message.text}
                        index={index}
                    />
                );
            })}
            <div ref={messages} />
        </div>
    );
};

export default MessageList;