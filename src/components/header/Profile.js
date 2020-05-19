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
import { useQuery } from "@apollo/client";

import { PROFILEUSER, PROFILEDRIVER } from "../../graphql/queries";
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
        background: theme.palette.secondary.light,
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    button_solid: {
        color: "#fff",
        background: theme.palette.secondary.main,
        borderRadius: 9,
        border: 0,
        height: 40,
        margin: theme.spacing(4, 0, 0),
        boxShadow:"none",
        "&:hover": {            
            background: theme.palette.secondary.main,
            boxShadow: theme.shadows[2],
          },
    },
    button_inverse: {
        color: theme.palette.secondary.main,
        background: "#fff",
        border: `1px ${theme.palette.secondary.main} solid !important`,
        borderRadius: 9,
        height: 40,
        margin: theme.spacing(4, 0, 0),
        boxShadow:"none",
        "&:hover": {      
            color: theme.palette.secondary.main,      
            border: `1px ${theme.palette.secondary.main} solid !important`,
            background: "#fff",
            boxShadow: theme.shadows[2],
          },
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

const Profile = (props) => {
    const classes = useStyles();
    const context = useContext(AuthContext);
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

    const toMain = () => {
        props.setVisibleProfile(false);
    };
    const toEditProfile = () => {
        props.setVisibleEdit(true);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Box zIndex="tooltip">
                    <Avatar className={classes.avatar} />
                </Box>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                label="Nombre"
                                defaultValue={
                                    context.client === "user"
                                        ? data.profileUser.name
                                        : data.profileDriver.name
                                }
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                label="Apellido"
                                defaultValue={
                                    context.client === "user"
                                        ? data.profileUser.surname
                                        : data.profileDriver.surname
                                }
                                disabled={true}
                            />
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
                                autoComplete="current-cellphone"
                                defaultValue={
                                    context.client === "user"
                                        ? data.profileUser.phone
                                        : data.profileDriver.phone
                                }
                                disabled={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={4}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.button_inverse}
                                onClick={toMain}
                            >
                                Regresar
                            </Button>
                        </Grid>
                        <Grid item xs={4} style={{ marginLeft: "20px" }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.button_solid}
                                onClick={toEditProfile}
                            >
                                Editar
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end" />
                </form>
            </div>
        </Container>
    );
};

export default Profile;
