import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Button, Col, Layout, Row, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import InputAdornment from "@material-ui/core/InputAdornment";
import EventAvailableTwoToneIcon from "@material-ui/icons/EventAvailableTwoTone";
import MomentUtils from "@date-io/moment";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";

import spanishConfig from "../../utils/spanishConfig";
import { CREATE_SERVICE } from "../../../graphql/mutations";
import AuthContext from "../../../context/auth-context";

moment.updateLocale("es", spanishConfig);

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    buttons: {
        marginTop: theme.spacing(2),
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    rows: {
        marginTop: theme.spacing(2),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    button: {
        width: "124px",
        height: "35px",
        marginTop: theme.spacing(3),
        margin: "5px 0px",
        borderRadius: "7px",
        background: "#FCB625",
        color: "#fff",
        focus: "false",
        fontWeight: "600",
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.16)",
    },
    backButton: {
        width: "124px",
        height: "35px",
        marginTop: theme.spacing(3),
        margin: "5px 0px",
        borderRadius: "7px",
        background: "#fff",
        color: "#FCB625",
        fontWeight: "600",
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.16)",
    },
    helperText: {
        margin: "0px 0px -20px 10px",
        color: "red",
        fontSize: "12px",
    },
    selectContainer: {
        marginBottom: "2.5px",
    },
    spin: {
        position: "absolute",
        zIndex: "1",
        top: "50%",
        left: "40%",
    },
    select: {
        marginBottom: "2.5px",
    },
    notchedOutline: {},
    focused: {
        "&$focused $notchedOutline": {
            border: "1px #000 solid !important",
        },
    },
}));

function success() {
    Modal.success({
        content:
            "Servicio creado con éxito. Podrás revisar su estado en la barra de servicios.",
    });
}

function errorModal(msg) {
    Modal.error({
        title: "Error",
        content: msg,
    });
}

const StepOne = (props) => {
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(new Date());
    const { userId } = useContext(AuthContext);
    const [createService, { loading: loadingService }] = useMutation(
        CREATE_SERVICE,
        {
            onCompleted: () => {
                document.getElementById("form1").reset();
                props.setVisible(false);
                success();
            },
            onError: (error) => {
                errorModal(error.graphQLErrors[0].message);
            },
            refetchQueries: ["ServicesByUser"],
        }
    );

    const create = async (values) => {
        const input = {
            date: selectedDate,
            origin: values.origin,
            destination: values.destination,
            commentaryUser: values.commentaryUser,
            state: "started",
            idUser: userId,
            idDriver: props.idDriver,
            idVehicle: props.idVehicle,
        };
        return await createService({
            variables: { input },
        });
    };

    const handleCancel = () => {
        props.setVisible(false);
        document.getElementById("form1").reset();
    };

    return (
        <Layout className={classes.paper}>
            {loadingService && (
                <Spin
                    tip="Cargando..."
                    indicator={
                        <LoadingOutlined style={{ fontSize: 40 }} spin />
                    }
                    className={classes.spin}
                />
            )}
            <Row>
                <Typography component="h1" variant="h5">
                    Solicitud del servicio
                </Typography>
            </Row>
            <Formik
                initialValues={{
                    origin: "",
                    destination: "",
                    commentaryUser: "",
                }}
                validationSchema={Yup.object({
                    origin: Yup.string()
                        .required("Campo requerido!")
                        .max(100, "Máximo 100 caracteres"),
                    destination: Yup.string()
                        .required("Campo requerido!")
                        .max(100, "Máximo 100 caracteres"),
                    commentaryUser: Yup.string().max(
                        300,
                        "Máximo 300 caracteres"
                    ),
                })}
                onSubmit={(values) => {
                    values.date = new Date(selectedDate);
                    create(values);
                }}
            >
                {(formik) => (
                    <Form id="form1" className={classes.form} noValidate>
                        <Row className={classes.rows}>
                            <MuiPickersUtilsProvider
                                libInstance={moment}
                                utils={MomentUtils}
                            >
                                <DateTimePicker
                                    fullWidth
                                    inputVariant="outlined"
                                    label="Fecha de reserva"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    disablePast={true}
                                    autoOk={true}
                                    minDate={new Date("2020-02-01")}
                                    maxDate={new Date("2030-01-01")}
                                    minutesStep={5}
                                    ampm={false}
                                    disableToolbar={true}
                                    InputProps={{
                                        classes: {
                                            notchedOutline:
                                                classes.notchedOutline,
                                            focused: classes.focused,
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <EventAvailableTwoToneIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Row>
                        <Row className={classes.rows}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Dirección de origen*"
                                margin="dense"
                                name="origin"
                                type="text"
                                {...formik.getFieldProps("origin")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                }}
                            />
                            <ErrorMessage name="origin">
                                {(msg) => (
                                    <p className={classes.helperText}>{msg}</p>
                                )}
                            </ErrorMessage>
                        </Row>
                        <Row className={classes.rows}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Dirección de destino*"
                                margin="dense"
                                name="destination"
                                type="text"
                                {...formik.getFieldProps("destination")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                }}
                            />
                            <ErrorMessage name="destination">
                                {(msg) => (
                                    <p className={classes.helperText}>{msg}</p>
                                )}
                            </ErrorMessage>
                        </Row>
                        <Row className={classes.rows}>
                            <TextField
                                label="Comentario al conductor"
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                multiline
                                rows={4}
                                placeholder="Menciona elementos que consideres importantes para la mudanza"
                                name="commentaryUser"
                                type="text"
                                {...formik.getFieldProps("commentaryUser")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                }}
                            />
                            <ErrorMessage name="commentaryUser">
                                {(msg) => (
                                    <p className={classes.helperText}>{msg}</p>
                                )}
                            </ErrorMessage>
                        </Row>
                        <Row gutter={16} className={classes.buttons}>
                            <Col>
                                <Button
                                    variant="contained"
                                    onClick={handleCancel}
                                    className={classes.backButton}
                                >
                                    Cancelar
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={formik.handleSubmit}
                                    className={classes.button}
                                >
                                    Enviar
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default StepOne;
