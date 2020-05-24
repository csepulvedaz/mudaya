import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { amber } from "@material-ui/core/colors";
import moment from "moment";

import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";

import { SERVICES_BY_DRIVER } from "../../../graphql/queries";
import AuthContext from "../../../context/auth-context";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useQuery } from "@apollo/client";

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
  appointment:{
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      background: theme.palette.secondary.main,
    },
  }
}));
const white = "#FFFFFF";
const black = "#000000";
const appointmentColors = [ ["#ED6A5A",white],
                            ["#F4F1BB",black],
                            ["#80ED99",black],
                            ["#EF7B45",white],
                            ["#8D3B72",white],
                            ["#FED766",black],
                            ["#BDE4A8",black]];
const DriverCalendar = (props) => {
  const classes = useStyles();
  /*  const theme = createMuiTheme({
        palette: { type: "light", primary: theme.palette.primary.main },
    });*/
  const context = useContext(AuthContext);
  const {
    loading: loadingServices,
    error: errorServices,
    data: dataServices,
  } = useQuery(SERVICES_BY_DRIVER, {
    variables: { idDriver: context.userId },
    fetchPolicy: "no-cache",
  });

  const putAZero = function (dayOrMonth) {
    if (dayOrMonth < 10) {
      return "0" + dayOrMonth.toString();
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
  if (loadingServices)
    return (
      <Spin
        tip="Cargando..."
        indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
        className={classes.spin}
      />
    );
  if (errorServices) return `Error! ${errorServices}`;
  const services = dataServices.servicesByDriver;
  let schedulerData = [];
  var finaldate;
  var dataServ;
  services.map((serv, index) => {
    dataServ = new Object();
    finaldate = new moment(serv.date);
    finaldate.add(2, "h");
    dataServ.startDate = serv.date;
    dataServ.endDate = finaldate.format().slice(0, -9);
    dataServ.title = "Trasteo loco";
    schedulerData.push(dataServ);
    console.log(dataServ);
  });

  const TimeTableCell = (props) => {
    const { startDate } = props;
    const date = new Date(startDate);
    if (date.getDate() === new Date().getDate()) {
      return (
        <WeekView.TimeTableCell {...props} className={classes.todayCell} />
      );
    }
    return <WeekView.TimeTableCell {...props} />;
  };

  const DayScaleCell = (props) => {
    const { today } = props;
    if (today) {
      return <WeekView.DayScaleCell {...props} className={classes.today} />;
    }
    return <WeekView.DayScaleCell {...props} />;
  };
  const Appointment = (props) => {
    let number = Math.floor((Math.random() * 7));
    return <Appointments.Appointment {...props} className={classes.appointment} />;
  };

  return (
    <Paper style={{ borderRadius: "4px" }}>
      <Scheduler locale={"es-ES"} data={schedulerData}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={(currentDate) => setCurrentDate(currentDate)}
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
        <Appointments appointmentComponent={Appointment} />
      </Scheduler>
    </Paper>
  );
};

export default DriverCalendar;
