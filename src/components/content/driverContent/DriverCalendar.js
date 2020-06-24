import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { ViewState } from "@devexpress/dx-react-scheduler";
import Grid from "@material-ui/core/Grid";
import PlaceIcon from "@material-ui/icons/RoomRounded";
import OriginIcon from "@material-ui/icons/NearMeRounded";
import CommentaryL from "@material-ui/icons/ChatBubbleRounded";
import CommentaryR from "@material-ui/icons/ModeCommentRounded";
import moment from "moment";
import {
    Scheduler,
    WeekView,
    Appointments,
    Toolbar,
    DateNavigator,
    TodayButton,
    Resources,
    AppointmentForm,
    AppointmentTooltip,
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
    appointment: {
        background: theme.palette.secondary.light,
        color: theme.palette.secondary.contrastText,
        "&:hover": {
            background: theme.palette.secondary.main,
        },
    },
    iconOrigin: {
        color: theme.palette.primary.main,
    },
    iconDestination: {
        color: theme.palette.secondary.main,
    },
    iconCommentary: {
        fontSize: "20px",
        color: theme.palette.grey[500],
    },
    textCenter: {
        textAlign: "center",
    },
    commentaryUser: {
        fontStyle: "italic",
        color: theme.palette.grey[500],
    },
    commentaryDriver: {
        fontStyle: "italic",
        color: theme.palette.grey[700],
    },
}));

const started = "Solicitado";
const onHold = "En espera";
const accepted = "Aceptado";

function stateToSpanish(shit) {
    if (shit === "started") {
        return started;
    } else if (shit === "onHold") {
        return onHold;
    } else if (shit === "accepted") {
        return accepted;
    } else {
        return shit;
    }
}

const DriverCalendar = (props) => {
    const classes = useStyles();

    const context = useContext(AuthContext);
    const {
        loading: loadingServices,
        error: errorServices,
        data: dataServices,
    } = useQuery(SERVICES_BY_DRIVER, {
        variables: { idDriver: context.userId },
        fetchPolicy: "no-cache",
    });

    const putAZero = function(dayOrMonth) {
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
    services.map((serv) => {
        dataServ = {};
        finaldate = new moment(serv.date);
        finaldate.add(2, "h");
        dataServ.startDate = serv.date;
        dataServ.endDate = finaldate.format().slice(0, -9);
        dataServ.title = serv.destination;
        dataServ.origin = serv.origin;
        dataServ.destination = serv.destination;
        dataServ.state = stateToSpanish(serv.state);
        dataServ.commentaryUser = serv.commentaryUser;
        dataServ.commentaryDriver = serv.commentaryDriver;
        return schedulerData.push(dataServ);
    });

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
    const Content = ({ appointmentData, ...props }) => {
        return (
            <AppointmentTooltip.Content
                {...props}
                appointmentData={appointmentData}
            >
                <Grid container alignItems="center">
                    <Grid item xs={2} className={classes.textCenter}>
                        <OriginIcon className={classes.iconOrigin} />
                    </Grid>
                    <Grid item xs={10}>
                        <span>{appointmentData.destination}</span>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={2} className={classes.textCenter}>
                        <PlaceIcon className={classes.iconDestination} />
                    </Grid>
                    <Grid item xs={10}>
                        <span>{appointmentData.origin}</span>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={2} className={classes.textCenter}>
                        <CommentaryL className={classes.iconCommentary} />
                    </Grid>
                    <Grid item xs={10}>
                        <span className={classes.commentaryUser}>
                            {" "}
                            {appointmentData.commentaryUser}{" "}
                        </span>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={2} className={classes.textCenter}>
                        <CommentaryR className={classes.iconCommentary} />
                    </Grid>
                    <Grid item xs={10}>
                        <span className={classes.commentaryDriver}>
                            {" "}
                            {appointmentData.commentaryDriver}{" "}
                        </span>
                    </Grid>
                </Grid>
            </AppointmentTooltip.Content>
        );
    };
    const mainResourceName = "state";
    const resources = [
        {
            fieldName: mainResourceName,
            title: "Estado",
            instances: [
                { id: started, text: started, color: "#FF5E5B" },
                { id: onHold, text: onHold, color: "#F9C22E" },
                { id: accepted, text: accepted, color: "#80ED99" },
            ],
        },
    ];
    //FE4A49 canceled color
    return (
        <Paper style={{ borderRadius: "4px" }}>
            <Scheduler locale={"es-ES"} data={schedulerData}>
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
                <AppointmentTooltip
                    showCloseButton
                    showOpenButton
                    contentComponent={Content}
                />
                <AppointmentForm readOnly />
                <Resources
                    mainResourceName={mainResourceName}
                    data={resources}
                />
            </Scheduler>
        </Paper>
    );
};

export default DriverCalendar;
