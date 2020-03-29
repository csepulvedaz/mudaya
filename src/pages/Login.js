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

const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            height: "0px",
            background: "#fafafa"
        }
    },
    paper: {
        marginTop: theme.spacing(12),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "30px",
        boxShadow: "1px 1px 1px #ccc",
        borderRadius: "5px"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    submit: {
        margin: theme.spacing(4, 0, 2),
        width: "100%"
    },
    truck: {
        fontSize: "100px",
        color: "#ccc"
    }
}));

const Login = props => {
    const classes = useStyles();
    let history = useHistory();

    const handleOnClick = () => {
        history.push("/principal");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <LocalShippingIcon className={classes.truck} />

                <Typography component="h1" variant="h5">
                    Bienvenido
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Correo"
                        autoComplete="email"
                        autoFocus
                        onChange={e => props.setEmail(e.target.value)}
                        // onKeyDown={e => {
                        //     if (e.key === "Enter") props.onPressLogin();
                        // }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Contraseña"
                        type="password"
                        // autoComplete="current-password"
                        onChange={e => props.setPassword(e.target.value)}
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
                        onClick={handleOnClick}
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
                                        textDecoration: "none"
                                    }}
                                >
                                    Entra, es gratis!
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Login;
