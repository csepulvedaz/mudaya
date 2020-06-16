import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
    root: {
        width: "84px",
        height: "34px",
        border: "solid 2px #ffee00",
        borderRadius: "6px",
        background: "#ffffc8",
    },
    license: {
        height: "30px",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "1.33",
        letterSpacing: "normal",
        textAlign: "center",
        color: "#3d3d3d",
        margin: "4px 0px",
    },
    divisor: {
        fontSize: "16px",
        display: "inline-block",
        padding: "0 2px",
        transform: "scale(0.9)",
        lineHeight: "1.33",
        color: "#828282",
    },
});

export default function TruckLicense(props) {
    const classes = useStyles();
    let upper = props.vehicleId.toUpperCase();
    return <Chip label={upper} className={classes.root} />;
}
