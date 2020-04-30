import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import DriverServiceCard from "./DriverServiceCard";
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
        width:"100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "13px",
        padding: "20px 0px",
    },
    panel: {
        borderRadius: "13px",
        display: "flex",
        justifyContent: "center",
    },
    title: {
        textAlign: "center", color: "#ffffff", textAlign: "center", fontSize: "24px", fontWeight: "bold",
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
    boxTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height:"50px",
        width:"180px",
        backgroundColor: "#fcb625",
        borderRadius: "0px 60px 60px 0px",
        alignSelf: "stretch",
    },
}));

const DriverServicesPanel = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <div className={classes.box}>
                <div className={classes.boxTitle}>
                    <Typography className={classes.title}>
                        Servicios
                    </Typography>
                </div>
                <div className={classes.panel}>
                    <List className={classes.list}>
                        {!(props.services===undefined) && props.services.map((value, index) => {
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
        </div>
    );
};

export default DriverServicesPanel;