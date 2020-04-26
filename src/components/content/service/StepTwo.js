import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Col, Layout, Row } from "antd";
import { Grid, TextField, Paper, Avatar } from "@material-ui/core";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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
    commentary: {
        width: "100%",
        padding: theme.spacing(1),
        backgroundColor: "#fafafa",
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
    notchedOutline: {},
    focused: {
        "&$focused $notchedOutline": {
            border: "1px #000 solid !important",
        },
    },
}));

const StepTwo = (props) => {
    const classes = useStyles();

    const handleCancel = () => {
        props.setVisible(false);
        document.getElementById("form1").reset();
    };

    return (
        <Layout className={classes.paper}>
            <Row>
                <Typography component="h1" variant="h5">
                    Precio del servicio
                </Typography>
            </Row>
            <Formik
                initialValues={{
                    price: "",
                    commentaryDriver: "",
                }}
                validationSchema={Yup.object({
                    price: Yup.string().required("Requerido"),
                    commentaryDriver: Yup.string().max(
                        300,
                        "Máximo 300 caracteres"
                    ),
                })}
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 2));
                    document.getElementById("form2").reset();
                    props.next();
                    // login({
                    //     variables: {
                    //         email: values.email,
                    //         password: values.password,
                    //     },
                    // });
                }}
            >
                {(formik) => (
                    <Form
                        id="form2"
                        className={classes.form}
                        onSubmit={formik.handleSubmit}
                        noValidate
                    >
                        <Row className={classes.rows}>
                            <TextField
                                variant="outlined"
                                size="small"
                                margin="none"
                                label="Origen"
                                defaultValue="calle 1 # 00-00"
                                disabled={true}
                                fullWidth
                            />
                        </Row>
                        <Row className={classes.rows}>
                            <TextField
                                variant="outlined"
                                size="small"
                                margin="none"
                                label="Destino"
                                defaultValue="carrea 1 # 00-00"
                                disabled={true}
                                fullWidth
                            />
                        </Row>
                        <Row className={classes.rows}>
                            <Paper className={classes.commentary} elevation={2}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar>C</Avatar>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography
                                            color="textSecondary"
                                            variant="body2"
                                        >
                                            Comentario del cliente describiendo
                                            la situacion del servicio
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Row>
                        <Row className={classes.rows}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                label="Precio"
                                placeholder="Ingresa el precio del servicio"
                                name="price"
                                type="text"
                                {...formik.getFieldProps("price")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                }}
                            />
                            <ErrorMessage name="price">
                                {(msg) => (
                                    <p className={classes.helperText}>{msg}</p>
                                )}
                            </ErrorMessage>
                        </Row>
                        <Row className={classes.rows}>
                            <TextField
                                label="Comentario al Cliente"
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                multiline
                                rows={4}
                                placeholder="Menciona elementos que consideres importantes para el cliente"
                                name="commentaryDriver"
                                type="text"
                                {...formik.getFieldProps("commentaryDriver")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                }}
                            />
                            <ErrorMessage name="commentaryDriver">
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
export default StepTwo;
