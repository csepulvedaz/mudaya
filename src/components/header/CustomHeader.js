import React, { useContext, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { Button, Layout, Drawer } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useMutation, useQuery } from "@apollo/client";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import AuthContext from "../../context/auth-context";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ServicesDropdown from "./service/ServicesDropdown";
import Notification from "./Notification";
import logo from "../../assets/logo-header.png";
import CreateVehicleModal from "../content/driverContent/CreateVehicleModal";
import ComplainModal from "./ComplainModal";
import {
    UPDATE_LOGOUT_TIME_DRIVER,
    UPDATE_LOGOUT_TIME_USER,
} from "../../graphql/mutations";
import {
    SERVICES_BY_DATE_UPDATED,
    SERVICES_BY_DATE_CREATED,
} from "../../graphql/queries";

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
        border: `1px ${theme.palette.colorGrey.border} solid !important`,
    },
    logo_box: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: "36px",
        width: "150px",
        height: "45px",
        backgroundColor: "#fff",
        margin: "10px 50px 10px 0px",
        //paddingLeft: "35px",
        //paddingTop: "10px",
    },
    logo: {
        width: "77.5px",
        height: "18px",
        marginTop: "8px",
    },
    conductores: {
        fontSize: "11px",
        fontWeight: "100",
        lineHeight: "1",
        textAlign: "left",
        color: "#b9b9b9",
        letterSpacing: "2px",
        marginTop: "5px",
    },
    box: {
        width: "45px",
        height: "45px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px 0px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        border: `1px ${theme.palette.colorGrey.border} solid !important`,
        "&:hover": {
            border: `1px ${theme.palette.primary.light} solid !important`,
            boxShadow: theme.shadows[2],
        },
    },
    icon_profile: {
        fontSize: "35px",
        color: theme.palette.grey[500],
        "&:hover": {
            color: theme.palette.grey[700],
        },
    },
    icon_exit: {
        fontSize: "35px",
        color: theme.palette.grey[500],
        "&:hover": {
            color: theme.palette.error.main,
        },
    },
    button_publish: {
        height: "45px",
        margin: "10px 10px",
        borderRadius: "9px",
        background: theme.palette.primary.main,
        fontWeight: "600",
        color: "#fff",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
        fontSize: "16px",
    },
    button_complain: {
        height: "45px",
        margin: "10px 10px",
        borderRadius: "9px",
        background: theme.palette.primary.main,
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

const CustomHeader = (props) => {
    const [navigate, setNavigate] = useState(false);
    const [visibleAddCar, setVisibleAddCar] = useState(false);
    const [visibleProfile, setVisibleProfile] = useState(false);
    const [visibleComplain, setVisibleComplain] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const { logout, client, userId } = useContext(AuthContext);
    const classes = useStyles();

    const [updateLastLogout] = useMutation(
        client === "user" ? UPDATE_LOGOUT_TIME_USER : UPDATE_LOGOUT_TIME_DRIVER
    );
    useBeforeunload((event) => {
        event.preventDefault();
        const _id = userId;
        updateLastLogout({
            variables: { _id: _id },
        });
    });
    let dataServicesCreated = 0;
    const { loading: loadingCreate, data } = useQuery(
        SERVICES_BY_DATE_CREATED,
        {
            variables: { _id: userId },
            fetchPolicy: "no-cache",
            skip: client === "user",
        }
    );
    if (client === "driver") {
        dataServicesCreated = data;
    }

    const { loading: loadingUpdate, data: dataServicesUpdated } = useQuery(
        SERVICES_BY_DATE_UPDATED,
        {
            variables: { _id: userId, client: client },
            fetchPolicy: "no-cache",
        }
    );
    if (loadingUpdate || loadingCreate)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSFize: 40 }} spin />}
                className={classes.spin}
            />
        );

    const servicesUpdated = dataServicesUpdated.servicesByDateUpdated;
    const servicesCreated = dataServicesCreated.servicesByDateCreated;

    const openModal = (e) => {
        e.preventDefault();
        setVisibleAddCar(true);
    };

    const openModalComplain = (e) =>{
        e.preventDefault();
        setVisibleComplain(true);
    }

    const handleLogout = () => {
        const _id = userId;
        updateLastLogout({
            variables: { _id: _id },
        });
        localStorage.clear("token");
        logout();
        setNavigate(true);
    };

    if (navigate) return <Redirect to="/" push={true} />;
    return (
        <>
            <Header theme="light" className={classes.header}>
                <div className={classes.container}>
                    <div className={classes.logo_box}>
                        <img
                            src={logo}
                            className={classes.logo}
                            alt="Prava Logo"
                        />
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
                        icon={<PersonIcon className={classes.icon_profile} />}
                        className={classes.box}
                        onClick={() => {
                            setVisibleProfile(true);
                        }}
                    />
                    {client === "user" && (
                        <ServicesDropdown serviceUpdate={servicesUpdated} />
                    )}
                </div>
                <div className={classes.container}>
                    {client === "driver" && (
                        <Notification
                            serviceCreate={servicesCreated}
                            serviceUpdate={servicesUpdated}
                        />
                    )}
                    {client === "driver" && (
                        <Button
                            className={classes.button_publish}
                            onClick={(e) => openModal(e)}
                        >
                            PUBLICA TU VEHICULO
                        </Button>
                    )}
                    <CreateVehicleModal
                        visible={visibleAddCar}
                        setVisible={setVisibleAddCar}
                        value={props.value}
                    />
                    <Button
                        className={classes.button_complain}
                        onClick={(e)=>openModalComplain(e)}
                    >
                        QUEJAS
                    </Button>
                    <ComplainModal
                        visible={visibleComplain}
                        setVisible={setVisibleComplain}
                        value={props.value}
                    />
                    
                    <Button
                        icon={
                            <ExitToAppIcon
                                className={classes.icon_exit}
                                style={{ fontSize: "30px" }}
                            />
                        }
                        className={classes.box}
                        onClick={handleLogout}
                    />
                </div>
            </Header>
            <Drawer
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
