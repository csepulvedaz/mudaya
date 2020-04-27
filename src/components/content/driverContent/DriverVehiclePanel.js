import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import DriverVehicleCard from "./DriverVehicleCard";
import img1 from "../../../assets/van.png";


const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        // background: "#fff",
        backdropFilter: "contrast(80%)",
        display: "flex",
        justifyContent: "center",
        paddingBottom: "20px",
    },
    box: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "13px",
        padding: "20px 20px",
    },
    panel: {
        borderRadius: "13px",
        display: "flex",
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "600",
        fontSize: "22px",
    },
    button: {
        borderRadius: "9px",
        background: "#FCB625",
        fontWeight: "600",
        color: "#fff",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
        fontSize: "60px",
        alignSelf: "center",
        width: "40px",
        height: "70px",
    },
    spin: {
        position: "absolute",
        top: "50%",
        left: "40%",
    },
    list: {

    },
    listItem: {
        padding: "10px",
    },
}));

const DriverVehiclePanel = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <div className={classes.box}>
                <h3 className={classes.title}>MIS VEHICULOS</h3>
                <div className={classes.panel}>
                    <List className={classes.list}>
                        {props.vehicles.map((value, index) => {
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
        </div>
    );
};

export default DriverVehiclePanel;
