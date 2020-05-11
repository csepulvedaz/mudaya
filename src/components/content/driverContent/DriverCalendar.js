import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { amber } from "@material-ui/core/colors";

import {
    Scheduler,
    WeekView,
    Appointments,
    Toolbar,
    DateNavigator,
    TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";

const useStyles = makeStyles((theme) => ({
    content: {},
    todayCell: {
        backgroundColor: fade(theme.palette.primary.main, 0.1),
        "&:hover": {
            backgroundColor: fade(theme.palette.primary.main, 0.14),
        },
        "&:focus": {
            backgroundColor: fade(theme.palette.primary.main, 0.16),
        },
    },
    today: {
        backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
}));

const DriverCalendar = (props) => {
    const classes = useStyles();
   /*  const theme = createMuiTheme({
        palette: { type: "light", primary: theme.palette.primary.main },
    });*/
    
    const putAZero = function(dayOrMonth){
        if(dayOrMonth < 10){
            return "0"+(dayOrMonth.toString());
        }
        return dayOrMonth;
    };
    const today = new Date();
    const todayDate = 
        today.getFullYear() +
        "-" +
        putAZero(today.getMonth() + 1) +
        "-" +
        putAZero(today.getDate());
    
    const manualTraduction = { today: "Hoy" };

    const [currentDate, setCurrentDate] = useState(todayDate);

    const TimeTableCell = (props) => {
        const { startDate } = props;
        const date = new Date(startDate);
        if (date.getDate() === new Date().getDate()) {
            return (
                <WeekView.TimeTableCell
                    {...props}
                    className={classes.todayCell}
                />
            );
        }
        return <WeekView.TimeTableCell {...props} />;
    };

    const DayScaleCell = (props) => {
        const { today } = props;
        if (today) {
            return (
                <WeekView.DayScaleCell {...props} className={classes.today} />
            );
        }
        return <WeekView.DayScaleCell {...props} />;
    };

    return (
        
            <Paper style={{ borderRadius: "4px" }}>
                <Scheduler locale={"es-ES"}>
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
                        dayScaleCellComponent={DayScaleCell}
                        timeTableCellComponent={TimeTableCell}
                    ></WeekView>
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton messages={manualTraduction} />
                    <Appointments />
                </Scheduler>
            </Paper>
        
    );
};

export default DriverCalendar;