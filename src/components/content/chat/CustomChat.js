import React from "react";

import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import ChatHeader from "./ChatHeader";

// chats:{
// 	idService1:{
// 		idMessage1:{
//             from:""
//             text:""
//         },
//         idMessage2:{
//             from:""
//             text:""
//         },
//         idMessage2:{
//             from:""
//             text:""
//         }
// 	},
// 	znqikqiu3k:{
// 		0:{
//             from:"1000375549"
//             text:"hola"
//         },
//         1:{
//             from:"100075449"
//             text:"cómo es"
//         },
//         2:{
//             from:"999014510"
//             text:"wtf bro?"
//         }
// 	},
// 	idServicen:{
// 	}
// }

const CustomChat = (props) => {
    return (
        <>
            <ChatHeader valueService={props.valueService} />
            <MessageList valueService={props.valueService} />
            <SendMessageForm valueService={props.valueService} />
        </>
    );
};

export default CustomChat;
