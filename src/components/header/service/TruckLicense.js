import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "84px",
    height: "34px",
    border: "solid 2px #ffee00",
    borderRadius: "6px",
    background: "#ffffc8"
  },
  license: {
    height: "30px",
    fontSize: "16px",
    fontWeight: "normal",
    lineHeight: "1.33",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#3d3d3d",
    margin: "4px 0px"
  },
  divisor: {
    fontSize: "16px",
    display: "inline-block",
    padding: "0 2px",
    transform: "scale(0.9)",
    lineHeight: "1.33",
    color: "#828282"
  }
});

export default function TruckLicense(props) {
  const classes = useStyles();
  const divisor = <span className={classes.divisor}>-</span>;

  return (
    <div className={classes.root}>
      <Typography className={classes.license}>
        {/*props.brand*/}ABC{divisor}123 {/*props.model*/}
      </Typography>
    </div>
  );
}
