import React from 'react';

import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import ChatHeader from "./ChatHeader";


const CustomChat = (props) => {
    return (
        <>
            <ChatHeader valueService={props.valueService}/>
            <MessageList />
            <SendMessageForm />
        </>
    );
};

export default CustomChat;