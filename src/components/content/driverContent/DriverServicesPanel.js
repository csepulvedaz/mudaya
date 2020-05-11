import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { LoadingOutlined } from "@ant-design/icons";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import DriverServiceCard from "./DriverServiceCard";
import img1 from "../../../assets/van.png";
import { SERVICES_BY_DRIVER } from "../../../graphql/queries";
import AuthContext from "../../../context/auth-context";

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingBottom: "20px",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0px",
    },
    panel: {
        borderRadius: "13px",
        display: "flex",
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: "24px",
        fontWeight: "bold",
    },
    spin: {
        position: "absolute",
        top: "50%",
        left: "55%",
    },
    list: {},
    listItem: {
        padding: "10px",
    },
    boxTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50px",
        width: "250px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0px 60px 60px 0px",
        alignSelf: "stretch",
        marginBottom: "20px",
    },
}));

const DriverServicesPanel = (props) => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const {
        loading: loadingServices,
        error: errorServices,
        data: dataServices,
    } = useQuery(SERVICES_BY_DRIVER, {
        variables: { idDriver: context.userId },
        fetchPolicy: "no-cache",
    });

    if (loadingServices)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );
    if (errorServices) return `Error! ${errorServices}`;

    const services = dataServices.servicesByDriver;

    return (
        <div className={classes.content}>
            <div className={classes.boxTitle}>
                <Typography className={classes.title}>Servicios</Typography>
            </div>
            <div className={classes.panel}>
                <List className={classes.list}>
                    {services &&
                        services.map((value, index) => {
                            return (
                                <div key={index} className={classes.listItem}>
                                    <DriverServiceCard
                                        image={img1}
                                        value={value}
                                    />
                                </div>
                            );
                        })}
                </List>
            </div>
        </div>
    );
};

export default DriverServicesPanel;
