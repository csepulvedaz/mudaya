import React, { useContext, useState } from "react";
import { Button, Layout, Drawer } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Redirect } from "react-router-dom";

import AuthContext from "../../context/auth-context";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ServicesDropdown from "./service/ServicesDropdown";

const { Header } = Layout;

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        width: "100%",
        background: "#fff",
        height: "auto",
        zIndex: "1",
        padding: "0px 20px",
    },
    logo: {
        width: "150px",
        height: "45px",
        borderRadius: "25px",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.15)",
        backgroundColor: "#ffffff",
        margin: "10px 20px 10px 0px",
    },
    textoLogo: {
        fontSize: "22px",
        fontWeight: "light",
        lineHeight: "2",
        textAlign: "center",
        color: "#8a8a8a",
    },
    textoLogoBold: {
        fontWeight: "bold",
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
        backgroundColor: " #ffffff",
    },
    icon: {
        fontSize: "40px",
        color: "#42c3cf",
    },
    icon_list: {
        fontSize: "40px",
        color: "#6663ff",
    },
    button: {
        height: "45px",
        margin: "10px 20px",
        borderRadius: "9px",
        background: "#FCB625",
        fontWeight: "600",
        color: "#fff",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
        fontSize: "16px",
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

const CustomHeader = () => {
    const [navigate, setNavigate] = useState(false);
    const [visibleProfile, setVisibleProfile] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const context = useContext(AuthContext);
    const classes = useStyles();

    const logout = () => {
        localStorage.clear("token");
        context.logout();
        setNavigate(true);
    };

    if (navigate) return <Redirect to="/" push={true} />;
    return (
        <>
            <Header theme="light" className={classes.header}>
                <div className={classes.container}>
                    <div className={classes.logo}>
                        <p className={classes.textoLogo}>
                            MUDA{" "}
                            <span className={classes.textoLogoBold}>YA</span>
                        </p>
                    </div>
                    <Button
                        icon={<PersonIcon className={classes.icon} />}
                        className={classes.box}
                        onClick={() => {
                            setVisibleProfile(true);
                        }}
                    />
                    <ServicesDropdown />
                </div>
                <div className={classes.container}>
                    <Button
                        className={classes.button}
                        // onClick={() => alert("Vehiculo presionado")}
                    >
                        PUBLICA TU VEHICULO
                    </Button>
                    <Button
                        icon={<ExitToAppIcon className={classes.icon} />}
                        className={classes.box}
                        onClick={logout}
                    />
                </div>
            </Header>
            <Drawer
                // title="Perfil"
                placement="left"
                width={500}
                closable={false}
                onClose={() => setVisibleProfile(false)}
                visible={visibleProfile}
            >
                {!visibleEdit && (
                    <Profile
                        setVisibleProfile={setVisibleProfile}
                        setVisibleEdit={setVisibleEdit}
                    />
                )}
                {visibleEdit && <EditProfile setVisibleEdit={setVisibleEdit} />}
            </Drawer>
        </>
    );
};

export default CustomHeader;
