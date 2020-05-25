import React from "react";
import { Layout } from "antd";
import { makeStyles } from "@material-ui/core/styles";

const { Footer } = Layout;

const useStyles = makeStyles((theme) => {
    return {
        footer: {
            border: `1px ${theme.palette.colorGrey.border} solid !important`,
            textAlign: "center",
            background: theme.palette.colorGrey.footer,
            color: theme.palette.text.secondary,
            zIndex: "1",
        },
    };
});

const CustomFooter = () => {
    const classes = useStyles();
    return (
        <Footer className={classes.footer}>
            UNIVERSIDAD NACIONAL DE COLOMBIA
            <br />
            INGENIERIA DE SOFTWARE II
            <br />
            PRAVA ©2020 Todos los derechos reservados.
            <br />
        </Footer>
    );
};

export default CustomFooter;
