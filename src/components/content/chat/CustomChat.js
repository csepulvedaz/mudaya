import React from 'react';

import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import ChatHeader from "./ChatHeader";


const CustomChat = () => {
    return (
        <>
            <ChatHeader />
            <MessageList />
            <SendMessageForm />
        </>
    );
};

export default CustomChat;