import React from 'react';
import { makestyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=>({
    root:{
        padding:"",
        margin:"10px 20px",
    },
    title:{
        fontSize:"24px",
        fontWeight: "bold",
        textAlign: "left",
    },
    phone:{
        fontSize:"14px",
        textAlign: "left",
        color:"#8b8b8b",
        marginLeft:"10px",
    }
}))

const ChatHeader = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                Jhon Fredy Acosta Murillo
            </div>
            <div className={classes.phone}>
                Celular: 300-000-0000
            </div>
        </div>
    );
};

export default ChatHeader;