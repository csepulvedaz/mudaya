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
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
    },
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