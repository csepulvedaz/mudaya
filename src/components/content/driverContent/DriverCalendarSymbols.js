import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import BulletIcon from '@material-ui/icons/FiberManualRecordRounded';
import PlaceIcon from '@material-ui/icons/NearMeRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import CommentaryL from '@material-ui/icons/ChatBubbleRounded';
import CommentaryR from '@material-ui/icons/ModeCommentRounded';



const useStyles = makeStyles((theme) => ({
  content: {
    width: "200px",
    display: "flex",
    justifyContent: "center",
    paddingBottom: "10px",
    flexDirection: "column",
    alignItems: "center",
    //padding: "20px 0px",
    background: "#fff",
    borderRadius: "8px",
  },
  title: {
    textAlign: "center",
    color: theme.palette.grey[800],
    fontSize: "12px",
  },
  iconOrigin: {
    color: theme.palette.primary.main,
  },
  iconDestination:{
    color: theme.palette.secondary.main,
  },
  textCenter: {
    textAlign: 'center',
  },
  iconCommentary:{
    fontSize:"20px",
    color: theme.palette.grey[500],
  },
}));

const DriverCalendarSymbols = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.boxTitle}>
        <Typography className={classes.title}>Simbolos</Typography>

        <Grid container alignItems="center">
          <Grid item xs={2} className={classes.textCenter}>
            <PlaceIcon className={classes.iconOrigin} />
          </Grid>
          <Grid item xs={10}>
            <span>Dirección de origen</span>
          </Grid>
        </Grid>

      </div>
    </div>
  );
};

export default DriverCalendarSymbols;
