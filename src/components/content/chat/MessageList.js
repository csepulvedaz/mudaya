import React,{useState, useEffect, useContext} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import firebase from "../../../firebase";

import Message from "./Message";

const useStyles = makeStyles((theme)=>({
    message_list: {
        boxSizing: "border-box",
        paddingLeft: "6px",
        width:"100%",
        height: "80%",
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


const MessageList = (props) => {
    const classes = useStyles();
    var database = firebase.database();
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {
        database.ref(`chats/${props.valueService._id}`).on('value', snapshots =>{
            const currentMessages = snapshots.val();
            if(currentMessages != null){
                setMessagesList(currentMessages);
            }
        });    
    }, []);
    console.log(messagesList);
    return (
        <div className={classes.message_list}>
            {messagesList.map((message, index) => {
                return(                    
                    <Message messageId={message.id} messageText={message.text} index={index}/>
                )
            })}
        </div>
    );
};

export default MessageList;