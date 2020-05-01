import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import DriverServiceCard from "./DriverServiceCard";
import img1 from "../../../assets/van.png";

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
        left: "40%",
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

const DriverServicesPanel = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <div className={classes.boxTitle}>
                <Typography className={classes.title}>Servicios</Typography>
            </div>
            <div className={classes.panel}>
                <List className={classes.list}>
                    {!(props.services === undefined) &&
                        props.services.map((value, index) => {
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
