import React, { useState, useContext } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";

import { CREATE_USER, CREATE_DRIVER } from "../graphql/mutations";
import { LOGIN } from "../graphql/queries";
import AuthContext from "../context/auth-context";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            height: "0px",
            backgroundColor: "#fafafa",
        },
    },
    paper: {
        marginTop: theme.spacing(7),
        width: "400px",
        position: "absolute",
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(2, 0, 0),
        width: "100%",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 9,
        border: 0,
        color: "white",
        height: 48,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    truck: {
        fontSize: "50px",
        color: "#ccc",
    },
    spin: {
        position: "absolute",
        top: "50%",
        left: "40%",
    },
    helperText: {
        margin: "0px 0px -20px 10px",
        color: "red",
        fontSize: "14px",
    },
    notchedOutline: {},
    focused: {
        "&$focused $notchedOutline": {
            border: "1px #000 solid !important",
        },
    },
}));

const CustomCheckbox = withStyles({
    root: {
        color: "#FF8E53",
        "&$checked": {
            color: "#FF8E53",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

function errorModal(msg) {
    Modal.error({
        title: "Error",
        content: msg,
    });
}

const SignUp = () => {
    const [isDriver, setIsDriver] = useState(false);
    const [loginPass, setLoginPass] = useState("");
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
    const [createUser, { loading: loadingUser }] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            login({
                variables: {
                    email: data.createUser.email,
                    password: loginPass,
                },
            });
        },
        onError: (error) => {
            errorModal(error.graphQLErrors[0].message);
        },
    });
    const [createDriver, { loading: loadingDriver }] = useMutation(
        CREATE_DRIVER,
        {
            onCompleted: (data) => {
                login({
                    variables: {
                        email: data.createDriver.email,
                        password: data.createDriver.password,
                    },
                });
            },
            onError: (error) => {
                errorModal(error.graphQLErrors[0].message);
            },
        }
    );
    const classes = useStyles();

    const create = async (values) => {
        setLoginPass(values.password);
        let input = {
            _id: values._id,
            name: values.name,
            surname: values.surname,
            phone: values.phone,
            email: values.email,
            password: values.password,
        };
        if (!isDriver) {
            return await createUser({
                variables: { input },
            });
        } else {
            await createDriver({
                variables: { input },
            });
        }
    };

    const handleCheckbox = () => {
        setIsDriver(!isDriver);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {(loadingUser || loadingDriver || loading) && (
                    <Spin
                        tip="Cargando..."
                        indicator={
                            <LoadingOutlined style={{ fontSize: 40 }} spin />
                        }
                        className={classes.spin}
                    />
                )}
                <LocalShippingIcon className={classes.truck} />
                <Typography component="h1" variant="h5">
                    Registro
                </Typography>
                <Formik
                    initialValues={{
                        _id: "",
                        name: "",
                        surname: "",
                        phone: "",
                        email: "",
                        password: "",
                    }}
                    validationSchema={Yup.object({
                        _id: Yup.number()
                            .positive("Identificación invalida!")
                            .integer("Identificación invalida!")
                            .required("Campo requerido!")
                            .typeError("Solo números!"),
                        name: Yup.string().required("Campo requerido!"),
                        surname: Yup.string().required("Campo requerido!"),
                        phone: Yup.string().required("Campo requerido!"),
                        email: Yup.string()
                            .email("Email incorrecto")
                            .required("Campo requerido"),
                        password: Yup.string().required("Campo requerido"),
                    })}
                    onSubmit={(values) => {
                        values._id = parseInt(values._id);
                        create(values);
                    }}
                >
                    {(formik) => (
                        <Form
                            className={classes.form}
                            onSubmit={formik.handleSubmit}
                            noValidate
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        placeholder="Nombre"
                                        name="name"
                                        type="text"
                                        {...formik.getFieldProps("name")}
                                        InputProps={{
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="name">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        placeholder="Apellido"
                                        name="surmane"
                                        type="text"
                                        {...formik.getFieldProps("surname")}
                                        InputProps={{
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="surname">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        placeholder="Número identificación"
                                        name="_id"
                                        type="text"
                                        {...formik.getFieldProps("_id")}
                                        InputProps={{
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="_id">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        placeholder="Número celular"
                                        name="phone"
                                        type="text"
                                        {...formik.getFieldProps("phone")}
                                        InputProps={{
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="phone">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        placeholder="Correo"
                                        name="email"
                                        type="email"
                                        {...formik.getFieldProps("email")}
                                        InputProps={{
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="email">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        placeholder="Contraseña"
                                        name="password"
                                        type="password"
                                        {...formik.getFieldProps("password")}
                                        InputProps={{
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="password">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <CustomCheckbox
                                                checked={!isDriver}
                                                onChange={handleCheckbox}
                                            />
                                        }
                                        label="Soy Cliente"
                                    />
                                    <FormControlLabel
                                        control={
                                            <CustomCheckbox
                                                checked={isDriver}
                                                onChange={handleCheckbox}
                                            />
                                        }
                                        label="Soy Conductor"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Registrarse
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default SignUp;
