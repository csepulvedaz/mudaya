import React from 'react';
import {makeStyles} from "@material-ui/core/styles";


const DUMMY_DATA = [
    {
        senderId: 'perborgen',
        text: 'Hey, how is it going?'
    },
    {
        senderId: 'janedoe',
        text: 'Great! How about you?'
    },
    {
        senderId: 'perborgen',
        text: 'Good to hear! I am great as well'
    }
]
const useStyles = makeStyles((theme)=>({
    message_list: {
        boxSizing: "border-box",
        paddingLeft: "6px",
        width:"100%",
        height: "100%",
        overflow: "scroll",
        background: "var(--secondary-color)",
    },
    message_username: {
        fontSize: "11px",
        color: "var(--main-text-color)",
        opacity: "0.9",
        marginBottom: "6px",
    },
    message_text: {
        background: "var(--main-color)",
        color: "var(--secondary-color)",
        display: "inline",
        padding: "4px 8px",
        borderRadius: "8px",
    }
}));


const MessageList = () => {
    const classes = useStyles();
    return (
        <div className={classes.message_list}>
            {DUMMY_DATA.map((message, index) => {
                return(
                <div key={index}>
                    <div className={classes.message_username}>{message.senderId}</div>
                    <div className={classes.message_text}>{message.text}</div>
                </div>
                )
            })}
        </div>
    );
};

export default MessageList;