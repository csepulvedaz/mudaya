import React from "react";
import { Layout } from "antd";
import { makeStyles } from "@material-ui/core/styles";

const { Footer } = Layout;

const useStyles = makeStyles(theme => ({
    footer: {
        textAlign: "center"
    }
}));

const CustomFooter = () => {
    const classes = useStyles();
    return (
        <Footer theme="light" className={classes.footer}>
            MudaYa ©2020 Created for Software Engineering II
            <br />
            Universidad Nacional de Colombia
            <br />
            All Rights reserved. For further information
            <br />
        </Footer>
    );
};

export default CustomFooter;
