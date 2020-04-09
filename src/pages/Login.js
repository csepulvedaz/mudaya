import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
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
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 9,
        border: 0,
        color: "white",
        height: 48,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    truck: {
        fontSize: "100px",
        color: "#ccc",
    },
    errorMessage: { marginTop: "15px", color: "red", fontSize: "12px" },
    notchedOutline: {},
    focused: {
        "&$focused $notchedOutline": {
            border: "1px #ccc solid !important",
        },
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
                                variant="outlined"
                                margin="normal"
                                autoComplete="email"
                                placeholder="Correo"
                                name="email"
                                type="email"
                                {...formik.getFieldProps("email")}
                                error={
                                    formik.touched.email && formik.errors.email
                                }
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ErrorMessage name="email">
                                                {(msg) => (
                                                    <p
                                                        className={
                                                            classes.errorMessage
                                                        }
                                                    >
                                                        {msg}
                                                    </p>
                                                )}
                                            </ErrorMessage>
                                        </InputAdornment>
                                    ),
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                // onKeyDown={e => {
                                //     if (e.key === "Enter") props.onPressLogin();
                                // }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                autoComplete="current-password"
                                placeholder="Contraseña"
                                name="password"
                                type="password"
                                error={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                                {...formik.getFieldProps("password")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ErrorMessage name="password">
                                                {(msg) => (
                                                    <p
                                                        className={
                                                            classes.errorMessage
                                                        }
                                                    >
                                                        {msg}
                                                    </p>
                                                )}
                                            </ErrorMessage>
                                        </InputAdornment>
                                    ),
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                // onKeyDown={e => {
                                //     if (e.key === "Enter") props.onPressLogin();
                                // }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
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
