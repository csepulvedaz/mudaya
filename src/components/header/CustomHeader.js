import React, { useContext, useState } from "react";
import { Button, Layout, Drawer } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import AuthContext from "../../context/auth-context";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ServicesDropdown from "./service/ServicesDropdown";
import Notification from "./Notification";

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
        border: "solid 0.5px #c2c2c2",
    },
    logo: {
        width: "150px",
        height: "45px",
        borderRadius: "25px",
        //boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.15)",
        backgroundColor: "#ffffff",
        margin: "10px 50px 10px 0px",
        paddingLeft: "35px",
        paddingTop: "10px",
    },
    prava: {
        fontSize: "26px",
        fontWeight: "bold",
        lineHeight: "0.5",
        textAlign: "left",
        color: "#fcb625",
    },
    conductores: {
        fontSize: "11px",
        fontWeight: "100",
        lineHeight: "1",
        textAlign: "left",
        color: "#b9b9b9",
        letterSpacing: "2px",
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
    const { logout, client } = useContext(AuthContext);
    const classes = useStyles();

    const handleLogout = () => {
        localStorage.clear("token");
        logout();
        setNavigate(true);
    };

    if (navigate) return <Redirect to="/" push={true} />;
    return (
        <>
            <Header theme="light" className={classes.header}>
                <div className={classes.container}>
                    <div className={classes.logo}>
                        <Typography
                            variant="subtitle2"
                            color="textPrimary"
                            component="p"
                            className={classes.prava}
                            gutterBottom={true}
                        >
                            PRAVA
                        </Typography>
                        {client === "driver" && (
                            <Typography
                                variant="body2"
                                color="textPrimary"
                                component="p"
                                className={classes.conductores}
                                gutterBottom={true}
                            >
                                CONDUCTORES
                            </Typography>
                        )}
                        {client === "user" && (
                            <Typography
                                variant="body2"
                                color="textPrimary"
                                component="p"
                                className={classes.conductores}
                                gutterBottom={true}
                            >
                                ACARREOS
                            </Typography>
                        )}
                    </div>
                    <Button
                        icon={<PersonIcon className={classes.icon} />}
                        className={classes.box}
                        onClick={() => {
                            setVisibleProfile(true);
                        }}
                    />
                    {client === "user" && <ServicesDropdown />}
                </div>
                <div className={classes.container}>
                    {client === "driver" && <Notification />}
                    <Button
                        className={classes.button}
                        // onClick={() => alert("Vehiculo presionado")}
                    >
                        PUBLICA TU VEHICULO
                    </Button>
                    <Button
                        icon={<ExitToAppIcon className={classes.icon} />}
                        className={classes.box}
                        onClick={handleLogout}
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
