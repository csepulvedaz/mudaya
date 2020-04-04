import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardService from "./CardService";

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        height: "300px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backdropFilter: "blur(9px)",
        padding: "20px 0px",
    },
}));

const ServicesCardPanel = () => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <CardService />
            <CardService />
            <CardService />
            <CardService />
        </div>
    );
};

export default ServicesCardPanel;
