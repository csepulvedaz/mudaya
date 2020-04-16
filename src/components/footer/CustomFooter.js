import React from "react";
import { Layout } from "antd";
import { makeStyles } from "@material-ui/core/styles";

const { Footer } = Layout;

const useStyles = makeStyles((theme) => ({
    footer: {
        textAlign: "center",
        background: "#fafafa",
        color: "#3d3d3d",
    },
}));

const CustomFooter = () => {
    const classes = useStyles();
    return (
        <Footer className={classes.footer}>
            UNIVERSIDAD NACIONAL DE COLOMBIA
            <br />
            INGENIERIA DE SOFTWARE II
            <br />
            MudaYa ©2020 Todos los derechos reservados.
            <br />
        </Footer>
    );
};

export default CustomFooter;
