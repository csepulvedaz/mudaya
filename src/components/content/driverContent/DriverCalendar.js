import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    WeekView,
    Appointments,
    Toolbar,
    DateNavigator,
    TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    content: {},
}));

const DriverCalendar = (props) => {
    const classes = useStyles();
    const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

    const today = new Date();
    const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const manualTraduction = {today:"Hoy"};

    const [currentDate, setCurrentDate] = useState(todayDate);

    return (
        <MuiThemeProvider theme={theme}>
            <Paper style={{ borderRadius: "4px" }}>
                <Scheduler
                    locale={'es-ES'}
                >
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={(currentDate) =>
                            setCurrentDate(currentDate)
                        }
                    />
                    <WeekView
                        startDayHour={6}
                        endDayHour={18}
                        cellDuration={60}
                    ></WeekView>
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton 
                        messages={manualTraduction}
                    />
                    <Appointments />
                </Scheduler>
            </Paper>
        </MuiThemeProvider>
    );
};

export default DriverCalendar;
