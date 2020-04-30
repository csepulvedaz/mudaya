import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { ViewState,TimeScaleLayout } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton
  
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        backdropFilter: "contrast(80%)",
        display: "flex",
        justifyContent: "center",
        paddingBottom: "20px",
    },    
}));

const DriverCalendar = (props) => {
    const classes = useStyles();
    const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

    return (        
        <MuiThemeProvider theme={theme}>
            <Paper>
                <Scheduler  >
                    <ViewState currentDate="2020-04-30" />
                    <WeekView startDayHour={6} endDayHour={18}  cellDuration={60} ></WeekView>
                    <Toolbar/>
                    <DateNavigator/>
                    <TodayButton/>
                    <Appointments />
                </Scheduler>
            </Paper>
        </MuiThemeProvider>
    );
};

export default DriverCalendar;