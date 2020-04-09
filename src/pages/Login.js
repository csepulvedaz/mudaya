import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            height: "0px",
            background: "#fafafa",
        },
    },
    paper: {
        marginTop: theme.spacing(12),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "30px",
        boxShadow: "1px 1px 10px #ccc",
        borderRadius: "5px",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    submit: {
        margin: theme.spacing(4, 0, 3),
        width: "100%",
    },
    truck: {
        fontSize: "100px",
        color: "#ccc",
    },
    errorInput: {
        border: "1px red solid",
    },
    errorMessage: {
        color: "red",
        textAlign: "left",
    },
}));

const Login = () => {
    const classes = useStyles();
    let history = useHistory();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <LocalShippingIcon className={classes.truck} />

                <Typography component="h1" variant="h5">
                    Bienvenido
                </Typography>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email("Email incorrecto")
                            .required("Requerido"),
                        password: Yup.string().required("Requerido"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            history.push("/principal");
                        }, 400);
                    }}
                >
                    {(formik) => (
                        <Form
                            className={classes.form}
                            onSubmit={formik.handleSubmit}
                            noValidate
                        >
                            <TextField
                                fullWidth
                                autoFocus
                                variant="outlined"
                                margin="normal"
                                label="Correo"
                                name="email"
                                type="email"
                                {...formik.getFieldProps("email")}
                                // onChange={(e) => setEmail(e.target.value)}
                                // onKeyDown={e => {
                                //     if (e.key === "Enter") props.onPressLogin();
                                // }}
                            />
                            <ErrorMessage name="email">
                                {(errorMessage) => (
                                    <div className={classes.errorMessage}>
                                        {errorMessage}
                                    </div>
                                )}
                            </ErrorMessage>
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                autoComplete="current-password"
                                label="Contraseña"
                                name="password"
                                type="password"
                                {...formik.getFieldProps("password")}
                                // onChange={(e) => setPassword(e.target.value)}
                                // onKeyDown={e => {
                                //     if (e.key === "Enter") props.onPressLogin();
                                // }}
                            />
                            <ErrorMessage name="password">
                                {(errorMessage) => (
                                    <div className={classes.errorMessage}>
                                        {errorMessage}
                                    </div>
                                )}
                            </ErrorMessage>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                // onClick={(e) => handleOnClick(e)}
                            >
                                Ingresar
                            </Button>

                            <Grid container direction="row" justify="center">
                                <Grid item>
                                    <Typography variant="body1">
                                        No tienes cuenta?{" "}
                                        <Link
                                            to="/registro"
                                            style={{
                                                textDecoration: "none",
                                            }}
                                        >
                                            Entra, es gratis!
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default Login;
