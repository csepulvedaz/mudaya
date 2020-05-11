import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import DriverCalendar from "./DriverCalendar";

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
        width: "70%",
    },
    title: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: "24px",
        fontWeight: "bold",
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

const DriverCalendarPanel = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <div className={classes.boxTitle}>
                <Typography className={classes.title}>Programación</Typography>
            </div>
            <div className={classes.panel}>
                <DriverCalendar />
            </div>
        </div>
    );
};

export default DriverCalendarPanel;
