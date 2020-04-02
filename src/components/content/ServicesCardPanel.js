import React from "react";
import { Layout } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import CardService from "./CardService";

const { Content } = Layout;

const useStyles = makeStyles(theme => ({
    content: {
        width: "fixed",
        height: "300px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        //-webkit-backdrop-filter: blur(9px),
        backdropFilter: "blur(9px)",
        padding: "20px 20px",
    }
}));

const ServicesCardPanel = () => {
    const classes = useStyles();
    return (<Content className={classes.content}>
                <CardService/>
                <CardService/>
                <CardService/>
                <CardService/>
            </Content>);
};

export default ServicesCardPanel;
