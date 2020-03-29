import React from "react";
import { Layout, Menu } from "antd";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { makeStyles } from "@material-ui/core/styles";

const { Header } = Layout;
const useStyles = makeStyles(theme => ({
    truck: {
        fontSize: "50px",
        color: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

const CustomHeader = () => {
    const classes = useStyles();
    return (
        <Header
            theme="light"
            style={{
                position: "fixed",
                zIndex: 1,
                width: "100%",
                padding: "0",
                background: "#fff"
            }}
        >
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={["0"]}>
                <Menu.Item key="0">
                    <LocalShippingIcon className={classes.truck} />
                </Menu.Item>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </Header>
    );
};

export default CustomHeader;
