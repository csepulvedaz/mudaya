import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

import waitImage from "../../../assets/waiting-steps.png";


const useStyles = makeStyles({
    root: {
        width: "330px",
        height: "320px",
        border: "solid 0.5px #fcb625",
        borderRadius: "4px",
        boxShadow: "inset 4px 4px 6px rgba(0,0,0,0.05),4px 4px 6px rgba(0,0,0,0.05)",
        //opacity:"0",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
    },
    media: {
        height: "140px",
        width:"190px",
        marginTop: "25px",
        backgroundColor:"#fafafa",
    },
    title: { textAlign: "left", color: "#fcb625", fontWeight:"600", fontSize:"30px",margin: "40px 0px 0px 30px", alignSelf:"stretch" },
    body: {
        fontSize: "15px",
        textAlign: "left",
        color:"#c2c2c2",
        fontWeight:"200",
        margin: "5px 0px 0px 30px",
        alignSelf:"stretch" 
    },
});

const StepWait = (props) => {
    const classes = useStyles();
    const happyFace = <span>:)</span>

    return (      
        <div className={classes.root}>

            <Typography
                variant="subtitle2"
                color="textPrimary"
                component="p"
                className={classes.title}
                gutterBottom={true}
            >
                Ten paciencia
            </Typography>
            <Typography
                variant="subtitle2"
                color="textPrimary"
                component="p"
                className={classes.body}
                gutterBottom={true}
            >
                El {props.subject} respondera pronto {happyFace}
            </Typography>
            <CardMedia
                className={classes.media}
                image={waitImage}
                title="Pronto respondera ;)"
            />
        </div> 
    );
};

export default StepWait;
