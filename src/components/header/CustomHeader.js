import React from "react";
import { Layout, Button } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

const useStyles = makeStyles(theme => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        width: "100%",
        padding: "0",
        background: "#fff",
        height: "auto",
        zIndex: "1",
        padding: "0px 20px"
    },
    logo: {
        width: "150px",
        height: "45px",
        borderRadius: "25px",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.15)",
        backgroundColor: "#ffffff",
        margin: "10px 20px 10px 0px"
    },
    textoLogo: {
        fontFamily: "Open Sans",
        fontSize: "22px",
        fontWeight: "light",
        lineHeight: "2",
        textAlign: "center",
        color: "#8a8a8a"
    },
    textoLogoBold: {
        fontWeight: "bold"
    },
    box: {
        width: "45px",
        height: "45px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px 0px",
        borderRadius: "9px",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
        backgroundColor: " #ffffff"
    },
    icon: { fontSize: "40px", color: "#42c3cf" },
    button: {
        height: "45px",
        margin: "10px 20px",
        borderRadius: "5px",
        background: "#FCB625",
        color: "#fff",
        fontSize: "16px"
    },
    container: {
        display: "flex",
        justifyContent: "space-between"
    }
}));

const CustomHeader = () => {
    const classes = useStyles();
    let history = useHistory();
    return (
        <Header theme="light" className={classes.header}>
            <div className={classes.container}>
                <div className={classes.logo}>
                    <p className={classes.textoLogo}>
                        MUDA <span className={classes.textoLogoBold}>YA</span>
                    </p>
                </div>
                <Button
                    icon={<AccountCircleIcon className={classes.icon} />}
                    className={classes.box}
                    onClick={() => alert("Perfil presionado")}
                />
            </div>
            <div className={classes.container}>
                <Button
                    className={classes.button}
                    onClick={() => alert("Perfil presionado")}
                >
                    PUBLICA TU VEHICULO
                </Button>
                <Button
                    icon={<ExitToAppIcon className={classes.icon} />}
                    className={classes.box}
                    onClick={() => history.push("/")}
                />
            </div>
        </Header>
    );
};

export default CustomHeader;
