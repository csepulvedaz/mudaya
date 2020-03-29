import React from "react";
import {Layout, Menu} from "antd";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import {makeStyles} from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const { Header } = Layout;
const useStyles = makeStyles(theme => ({
    truck: {
        fontSize: "50px",
        color: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    profile: {
        fontSize: "45px",
        color: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBlockEnd : "9px"
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
                <Menu.Item key="0" title = "Inicio" onClick={event =>  window.location.href='/principal'}>
                    <LocalShippingIcon className={classes.truck} />
                </Menu.Item>
                <Menu.Item key="1" title = "Mi Perfil">
                    <AccountCircleIcon className={classes.profile} />
                </Menu.Item>
                {/*<Menu.Item key="2" title = "Mis Coversaciones">*/}
                {/*    <ChatIcon className={classes.profile} />*/}
                {/*</Menu.Item>*/}
                <Menu.Item key="3" title = "Mis Pedidos">
                    <AssignmentIcon className={classes.profile} />
                </Menu.Item>
                <Menu.Item key="4" title = "Cerrar Sesion" onClick={event =>  window.location.href='/'}>
                    <ExitToAppIcon className={classes.profile} />
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default CustomHeader;
