import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { LoadingOutlined } from "@ant-design/icons";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import DriverVehicleCard from "./DriverVehicleCard";
import img1 from "../../../assets/van.png";
import { VEHICLES_BY_DRIVER } from "../../../graphql/queries";
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
        backgroundColor: "#fcb625",
        borderRadius: "0px 60px 60px 0px",
        alignSelf: "stretch",
        marginBottom: "20px",
    },
}));

const DriverVehiclePanel = (props) => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const {
        loading: loadingVehicles,
        error: errorVehicles,
        data: dataVehicles,
    } = useQuery(VEHICLES_BY_DRIVER, {
        variables: { idDriver: context.userId },
        fetchPolicy: "no-cache",
    });

    if (loadingVehicles)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );

    if (errorVehicles) return `Error! ${errorVehicles}`;

    const vehicles = dataVehicles.vehiclesByDriver;

    return (
        <div className={classes.content}>
            <div className={classes.boxTitle}>
                <Typography className={classes.title}>Vehículos</Typography>
            </div>
            <div className={classes.panel}>
                <List className={classes.list}>
                    {vehicles &&
                        vehicles.map((value, index) => {
                            return (
                                <div key={index} className={classes.listItem}>
                                    <DriverVehicleCard
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

export default DriverVehiclePanel;
