import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ErrorMessage, Form, Formik } from "formik";
import { useLazyQuery } from "@apollo/client";
import * as Yup from "yup";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import FacebookIcon from "@material-ui/icons/Facebook";

import AuthContext from "../context/auth-context";
import { LOGIN } from "../graphql/queries";
import logo from "../assets/logo.png";
import theme from "../components/utils/AppTheme";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            height: "0px",
            background: "#e8e8e8",
        },
    },
    paper: {
        marginTop: "50px",
        width: "400px",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "30px",
        boxShadow: theme.shadows[14],
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
        background: theme.palette.primary.main,
        borderRadius: 9,
        border: 0,
        color: "white",
        height: 48,
        boxShadow: theme.shadows[2],
        "&:hover": {
            background: theme.palette.primary.light,
            boxShadow: theme.shadows[4],
        },
    },
    thirdPartyFacebook: {
        //margin: theme.spacing(3, 0, 3),
        display: "flex",
        width: "204px",
        height: "50px",
        borderRadius: "3px",
        border: 0,
        justifyContent: "center",
        alignItems: "center",
        background: "#1877F2",
        color: "#fff",
        textAlign: "center",
        textTransform: "none",
        boxShadow:
            "rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px",
    },
    thirdPartyGoogle: {
        margin: theme.spacing(3, 0, 3),
        width: "200px",
        height: "50px",
        borderRadius: "8px",
        border: 0,
        justifyContent: "center",
        alignItems: "center",
        background: "#f00ebb",
    },
    truck: {
        fontSize: "100px",
        color: "#ccc",
    },
    spin: {
        position: "absolute",
        zIndex: "1",
        top: "50%",
        left: "40%",
    },
    errorMessage: {
        marginTop: "15px",
        color: theme.palette.error.main,
        fontSize: "12px",
    },
    notchedOutline: {},
    focused: {
        "&$focused $notchedOutline": {
            border: `1px ${theme.palette.primary.light} solid !important`,
        },
    },
    logo: {
        marginBottom: "20px",
    },
    fbButton: {
        margin: "10px 10px 10px 5px",
    },
}));

function errorModal(msg) {
    Modal.error({
        title: "Error",
        content: msg,
    });
}

const Login = (props) => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const [login, { loading }] = useLazyQuery(LOGIN, {
        onCompleted: (data) => {
            context.login(
                data.login.client,
                data.login.token,
                data.login.userId,
                data.login.tokenExpiration
            );
        },
        onError: (error) => {
            errorModal(error.graphQLErrors[0].message);
        },
    });

    const [loginThirdParty, { loadingThirdParty }] = useLazyQuery(LOGIN, {
        onCompleted: (data) => {
            context.login(
                data.login.client,
                data.login.token,
                data.login.userId,
                data.login.tokenExpiration
            );
        },
        onError: () => {
            props.setThirdPartyRegister(true);
        },
    });

    const responseFacebook = (response) => {
        props.setThirdPartyInfo({
            email: response.email,
            password: response.id,
            first_name: response.first_name,
            last_name: response.last_name,
        });

        if (response.status !== "unknown") {
            loginThirdParty({
                variables: {
                    email: response.email,
                    password: response.id,
                    first_name: response.first_name,
                    last_name: response.last_name,
                },
            });
        }
    };

    const responseGoogle = (response) => {
        props.setThirdPartyInfo({
            email: response.profileObj.email,
            password: response.profileObj.googleId,
            first_name: response.profileObj.givenName,
            last_name: response.profileObj.familyName,
        });
        loginThirdParty({
            variables: {
                email: response.profileObj.email,
                password: response.profileObj.googleId,
                first_name: response.profileObj.givenName,
                last_name: response.profileObj.familyName,
            },
        });
    };

    const responseGoogleFail = (response) => {
        console.log(response);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {(loading || loadingThirdParty) && (
                    <Spin
                        tip="Cargando..."
                        indicator={
                            <LoadingOutlined style={{ fontSize: 40 }} spin />
                        }
                        className={classes.spin}
                    />
                )}

                <img
                    src={logo}
                    width="220px"
                    height="150px"
                    className={classes.logo}
                    alt="Prava Logo"
                />

                {/* <Typography component="h1" variant="h5">
                    Bienvenido
                </Typography> */}
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
                    onSubmit={(values) => {
                        // alert(JSON.stringify(values, null, 2));
                        login({
                            variables: {
                                email: values.email,
                                password: values.password,
                            },
                        });
                        values.email = "";
                        values.password = "";
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
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                autoComplete="current-password"
                                placeholder="Contraseña"
                                name="password"
                                type="password"
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
                                    <FacebookLogin
                                        cssClass={classes.thirdPartyFacebook}
                                        appId="262085324993789"
                                        textButton={"Ingresa con Facebook"}
                                        fields="email,first_name,last_name"
                                        callback={responseFacebook}
                                        language="es_ES"
                                        icon={
                                            <FacebookIcon
                                                className={classes.fbButton}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <GoogleLogin
                                        className={classes.thirdPartyGoogle}
                                        clientId="515176564508-1fvr1sv7kghek5p23fffgv0f177sucon.apps.googleusercontent.com"
                                        buttonText="Ingresa con Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogleFail}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row" justify="center">
                                <Grid item>
                                    <Typography variant="body1">
                                        No tienes cuenta?{" "}
                                        <Link
                                            to="/registro"
                                            style={{
                                                textDecoration: "none",
                                                color:
                                                    theme.palette.primary.main,
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
