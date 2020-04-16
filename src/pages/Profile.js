import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { PROFILEUSER,PROFILEDRIVER } from "../graphql/queries";
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
    spin: {
        position: "absolute",
        top: "50%",
        left: "50%",
    },
}));

const Profile = () => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    let history = useHistory();
    //Query
    
    const  { loading, error, data } = useQuery(context.client==="user" ? PROFILEUSER:PROFILEDRIVER, {
        variables: { _id: context.userId },
    });

    if (loading)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );
    if (error) return `Error! ${error}`;



    const toMain = () => {
        history.push("/principal");
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
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Nombre"
                                defaultValue={context.client==="user"?data.profileUser.name:data.profileDriver.name}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Apellido"
                                defaultValue={context.client==="user"?data.profileUser.surname:data.profileDriver.surname}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Correo"
                                defaultValue={context.client==="user"?data.profileUser.email:data.profileDriver.email}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Identificación"
                                autoComplete="current-identification"
                                defaultValue={context.client==="user"?data.profileUser._id:data.profileDriver._id}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Telefono"
                                autoComplete="current-cellphone"
                                defaultValue={context.client==="user"?data.profileUser.phone:data.profileDriver.phone}
                                disabled={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between">
                        <Grid item xs={5}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={toMain}
                            >
                                Regresar
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
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
