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
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { PROFILEUSER, PROFILEDRIVER } from "../../graphql/queries";
import { UPDATE_USER, UPDATE_DRIVER } from "../../graphql/mutations";
import AuthContext from "../../context/auth-context";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        background: theme.palette.secondary.main,
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(4, 0, 0),
        background: theme.palette.secondary.main,
        borderRadius: 9,
        border: 0,
        color: "white",
        height: 40,
        boxShadow: theme.shadows[0],
        "&:hover": {            
            background: theme.palette.secondary.main,
            boxShadow: theme.shadows[2],
        },
    },
    notchedOutline: {},
    focused: {
        "&$focused $notchedOutline": {
            border: `1px ${theme.palette.secondary.light} solid !important`,
            color: "#ccc",
        },
    },
    helperText: {
        margin: "0px 0px -17px 10px",
        color: theme.palette.error.main,
        fontSize: "12px",
    },
    spin: {
        position: "absolute",
        zIndex: "1000",
        top: "50%",
        left: "40%",
    },
}));

function errorModal(msg) {
    Modal.error({
        title: "Error",
        content: msg,
    });
}
const EditProfile = (props) => {
    const classes = useStyles();
    const context = useContext(AuthContext);

    const [updateUser] = useMutation(
        context.client === "user" ? UPDATE_USER : UPDATE_DRIVER,
        {
            onCompleted: () => {
                props.setVisibleEdit(false);
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
                            <Grid container direction="row" justify="center">
                                <Grid item xs={4}>
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
