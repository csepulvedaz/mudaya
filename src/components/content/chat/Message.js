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
    your_bubble: {
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
    my_bubble: {
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
        marginBottom:"8px",
        opacity: "0.8",
    },
    your_timeStamp:{
        alignSelf: "start",
		right: "0",
		bottom: "-15px",
        color: theme.palette.grey[600],
        fontSize: "10px",
        marginLeft:"16px",
        marginBottom:"8px",
        opacity: "0.8",
    }
}));

const Message = (props) => {
    const classes = useStyles();
    const { client } = useContext(AuthContext);
    const DUMMY_DATE = "18/5/20 12:02";
    const [visibleDate, setVisibleDate] = useState(false);

    const showDate = ()=>{
        setVisibleDate (!visibleDate);
    }

    return (
        <>
            {client === "user" && props.messageId === "user" && (
                <div className={classes.container_me}>
                    <div className={classes.my_bubble} onClick={(showDate)}>
                        {props.messageText}
                    </div>                                     
                    {visibleDate && (
                        <div className={classes.my_timeStamp}>
                            {DUMMY_DATE}
                        </div>
                    )}
                </div>
            )}
            {client === "driver" && props.messageId === "driver" && (
                <div className={classes.container_me}>
                    <div className={classes.my_bubble} onClick={(showDate)}>
                        {props.messageText}
                    </div>                                      
                    {visibleDate && (
                        <div className={classes.my_timeStamp}>
                            {DUMMY_DATE}
                        </div>
                    )}
                </div>
            )}
            {client === "user" && props.messageId === "driver" && (
                <div className={classes.container_you}>
                    <div className={classes.your_bubble} onClick={(showDate)}>
                        {props.messageText}
                    </div>                                        
                    {visibleDate && (
                        <div className={classes.your_timeStamp}>
                            {DUMMY_DATE}
                        </div>
                    )}
                </div>
            )}
            {client === "driver" && props.messageId === "user" && (
                <div  className={classes.container_you} onClick={(showDate)}>
                    <div className={classes.your_bubble}>
                        {props.messageText}
                    </div>                    
                    {visibleDate && (
                        <div className={classes.your_timeStamp}>
                            {DUMMY_DATE}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Message;
