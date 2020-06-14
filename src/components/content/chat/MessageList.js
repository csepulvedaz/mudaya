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
        color: theme.palette.grey[600],
        opacity: "0.9",
        margin: "10px 0 6px 0",
    },
    message_text: {
        background: theme.palette.primary.light,
        color: "#fff",
        display: "inline",
        padding: "4px 8px",
        borderRadius: "2px 8px 8px 8px",
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