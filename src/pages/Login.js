import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import "../index.css";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(12),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "80%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: "100%"
    },
    truck: {
        fontSize: "100px",
        color: "#ccc"
    }
}));

const handleClick = e => {
    e.preventDefault();
};

const Login = props => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
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
                        value={props.email}
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
                        value={props.password}
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
                        onClick={handleClick}
                    >
                        <Link to="/principal" style={{textDecoration:"none", color:"#fff"}}>Ingresar</Link>
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"No tienes cuenta? Entra"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Login;
