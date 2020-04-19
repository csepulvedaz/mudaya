import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { PROFILEUSER, PROFILEDRIVER } from "../graphql/queries";
import { UPDATE_USER, UPDATE_DRIVER } from "../graphql/mutations";
import AuthContext from "../context/auth-context";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            height: "0px",
            background: "#fafafa",
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        boxShadow: "1px 1px 10px #ccc",
        borderRadius: "5px",
    },
    avatar: {
        margin: theme.spacing(1),
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    back: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 6,
        boxShadow: "1px 1px 10px #ccc",
        height: 100,
        width: 400,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 0),
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 9,
        border: 0,
        color: "white",
        height: 40,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    notchedOutline: {},
    focused: {
        "&$focused $notchedOutline": {
            border: "1px #000 solid !important",
            color: "#ccc",
        },
    },
    helperText: {
        margin: "0px 0px -17px 10px",
        color: "red",
        fontSize: "12px",
    },
    spin: {
        position: "absolute",
        top: "50%",
        left: "50%",
    },
}));

function errorModal(msg) {
    Modal.error({
        title: "Error",
        content: msg,
    });
}
const EditProfile = () => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    let history = useHistory();

    const [updateUser] = useMutation(
        context.client === "user" ? UPDATE_USER : UPDATE_DRIVER,
        {
            onCompleted: () => {
                history.push("/perfil");
            },
            onError: (error) => {
                errorModal(error.graphQLErrors[0].message);
            },
        }
    );

    //Query
    const { loading, data } = useQuery(
        context.client === "user" ? PROFILEUSER : PROFILEDRIVER,
        {
            variables: { _id: context.userId },
            onError: (error) => {
                errorModal(error.graphQLErrors[0].message);
            },
        }
    );

    if (loading)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSFize: 40 }} spin />}
                className={classes.spin}
            />
        );
    const toProfile = async (values) => {
        let input = {
            _id: values._id,
            name: values.name,
            surname: values.surname,
            phone: values.phone,
        };

        return await updateUser({
            variables: { input },
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Box
                    className={classes.back}
                    zIndex="modal"
                    position="absolute"
                    top={50}
                />
                <Box zIndex="tooltip">
                    <Avatar className={classes.avatar} />
                </Box>
                <Formik
                    initialValues={{
                        _id: context.userId,
                        name:
                            context.client === "user"
                                ? data.profileUser.name
                                : data.profileDriver.name,
                        surname:
                            context.client === "user"
                                ? data.profileUser.surname
                                : data.profileDriver.surname,
                        phone:
                            context.client === "user"
                                ? data.profileUser.phone
                                : data.profileDriver.phone,
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required("Campo requerido!"),
                        surname: Yup.string().required("Campo requerido!"),
                        phone: Yup.string().required("Campo requerido!"),
                    })}
                    onSubmit={(values) => {
                        toProfile(values);
                    }}
                >
                    {(formik) => (
                        <Form
                            className={classes.form}
                            onSubmit={formik.handleSubmit}
                            noValidate
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        label="Nombre"
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
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        label="Apellido"
                                        name="surname"
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
                                        label="Correo"
                                        defaultValue={
                                            context.client === "user"
                                                ? data.profileUser.email
                                                : data.profileDriver.email
                                        }
                                        disabled={true}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        label="Identificación"
                                        autoComplete="current-identification"
                                        defaultValue={
                                            context.client === "user"
                                                ? data.profileUser._id
                                                : data.profileDriver._id
                                        }
                                        disabled={true}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        label="Telefono"
                                        name="phone"
                                        autoComplete="current-cellphone"
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
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                            >
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Finalizar
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container justify="flex-end" />
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default EditProfile;
