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
import { Formik, Form } from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
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
    errorMessage: { marginTop: "20px", color: "red" },
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
                                label="Correo"
                                name="email"
                                type="email"
                                {...formik.getFieldProps("email")}
                                error={
                                    formik.touched.email && formik.errors.email
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {formik.touched.email &&
                                                formik.errors.email && (
                                                    <p
                                                        className={
                                                            classes.errorMessage
                                                        }
                                                    >
                                                        Requerido
                                                    </p>
                                                )}
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
                                label="Contraseña"
                                name="password"
                                type="password"
                                error={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                                {...formik.getFieldProps("password")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {formik.touched.password &&
                                                formik.errors.password && (
                                                    <p
                                                        className={
                                                            classes.errorMessage
                                                        }
                                                    >
                                                        Requerido
                                                    </p>
                                                )}
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
