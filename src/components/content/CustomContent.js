import React from "react";
import { Layout } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import bg from "../../assets/bg.jpg";
import ServicesCardPanel from "./ServicesCardPanel";

const { Content } = Layout;

const useStyles = makeStyles(theme => ({
    content: {
        width: "100%",
        height: "1000px",
        paddingBlockStart: "5%",
        paddingInline: "2%",
        paddingInlineEnd: "2%",
        display: "flex",
        justifyContent: "center",
        background: `url(${bg}) no-repeat 50% 100% `,
        backgroundSize: "cover",
        backgroundColor: "#fafafa",
    }
}));

const CustomContent = () => {
    const classes = useStyles();
    return (<Content className={classes.content}>
        <ServicesCardPanel/>
    </Content>);
};

export default CustomContent;
