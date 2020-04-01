import React from "react";
import { Layout } from "antd";
import { makeStyles } from "@material-ui/core/styles";

const { Content } = Layout;

const useStyles = makeStyles(theme => ({
    content: {
        paddingBlockStart: "4%",
        paddingInline: "2%",
        paddingInlineEnd: "2%",
        display:"flex",
        justifyContent:"center",
        background:"#ccc"
    },
}));

const CustomContent = () => {
    const classes = useStyles();
    return (
        <Content className={classes.content}>
            Contenido
        </Content>
    );
};

export default CustomContent;
