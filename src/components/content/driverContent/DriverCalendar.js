import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

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
}));

const DriverCalendar = (props) => {
    const classes = useStyles();
    const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

    return (
        <div className={classes.content}>
            <div className={classes.box}>
                <h3 className={classes.title}>MI PROGRAMACIÓN</h3>
                <div className={classes.panel}>
                <   MuiThemeProvider theme={theme}>
                        <Paper>
                            <Scheduler >
                                <ViewState currentDate="2020-04-30" />
                                <WeekView startDayHour={9} endDayHour={19} />
                                <Appointments />
                            </Scheduler>
                        </Paper>
                    </MuiThemeProvider>
                </div>
            </div>
        </div>
    );
};

export default DriverCalendar;