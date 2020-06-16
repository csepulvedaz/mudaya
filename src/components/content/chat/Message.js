import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../../context/auth-context";

const useStyles = makeStyles((theme) => ({
    container_you:{
        display:"flex",
        flexDirection:"column",
    },
    container_me:{
        display:"flex",
        flexDirection:"column",
    },
    message_text_you: {
        background: theme.palette.chat.yourBubble,
        color: theme.palette.chat.yourText,
        float: "left",
        maxWidth: "60%",
        display: "inline-lbock",
        margin: "4px 0",
        padding: "10px 16px",
        borderRadius: "2px 20px 20px 20px",
        alignSelf:"start",
    },
    message_text_me: {
        background: theme.palette.chat.myBubble,
        color: theme.palette.chat.myText,
        float: "right",
        maxWidth: "60%",
        display: "inline-lbock",
        padding: "10px 16px",
        margin: "4px 0",
        borderRadius: "20px 2px 20px 20px",
        alignSelf:"end",
    },
    my_timeStamp:{
        alignSelf: "end",
		right: "0",
		bottom: "-15px",
        color: theme.palette.grey[600],
		fontSize: "10px",
        marginRight:"8px",
        opacity: "0.8",
    },
    your_timeStamp:{
        alignSelf: "start",
		right: "0",
		bottom: "-15px",
        color: theme.palette.grey[600],
        fontSize: "10px",
        marginLeft:"16px",
        opacity: "0.8",
    }
}));

const Message = (props) => {
    const classes = useStyles();
    const { client } = useContext(AuthContext);
    const DUMMY_DATE = "18/5/20 12:02";
    const [visibleDate, setVisibleDate] = useState("false");

    const showDate = ()=>{
        if(visibleDate === "false"){
            setVisibleDate("true");
        }else{
            setVisibleDate("false");
        }
    }

    return (
        <>
            {client === "user" && props.messageId === "user" && (
                <div className={classes.container_me}>
                    <div className={classes.message_text_me}>
                        {props.messageText}
                    </div>                                     
                    <div className={classes.my_timeStamp}>
                        {DUMMY_DATE}
                    </div>
                </div>
            )}
            {client === "driver" && props.messageId === "driver" && (
                <div  className={classes.container_me}>
                    <div className={classes.message_text_me} onClick={(showDate)}>
                        {props.messageText}
                    </div>                                      
                    <div className={classes.my_timeStamp} visible={visibleDate}>
                        {DUMMY_DATE}
                    </div>
                </div>
            )}
            {client === "user" && props.messageId === "driver" && (
                <div className={classes.container_you}>
                    <div className={classes.message_text_you}>
                        {props.messageText}
                    </div>                                        
                    <div className={classes.your_timeStamp}>
                        {DUMMY_DATE}
                    </div>
                </div>
            )}
            {client === "driver" && props.messageId === "user" && (
                <div  className={classes.container_you}>
                    <div className={classes.message_text_you}>
                        {props.messageText}
                    </div>                    
                    <div className={classes.your_timeStamp}>
                        {DUMMY_DATE}
                    </div>
                </div>
            )}
        </>
    );
};

export default Message;
