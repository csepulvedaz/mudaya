import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Modal from "../components/signin/Modal";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            height: "0px",
            backgroundColor: "#fafafa"
        }
    },
    paper: {
        marginTop: theme.spacing(7),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "30px",
        boxShadow: "1px 1px 1px #ccc",
        borderRadius: "5px",
        marginBottom: "10px"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(2, 0, 0)
    },
    truck: {
        fontSize: "50px",
        color: "#ccc"
    }
}));

const SignUp = props => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    let history = useHistory();

    const toMain = () => {
        history.push("/principal");
    }

    const openModal = () => {
        setOpen(true);
    };

    const handleChange = () => {
        props.setIsDriver(!props.isDriver);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <LocalShippingIcon className={classes.truck} />
                <Typography component="h1" variant="h5">
                    Registro
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Nombre"
                                autoFocus
                                onChange={e => props.setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Apellido"
                                onChange={e => props.setSurname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Cédula"
                                onChange={e => props.setId(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Número celular"
                                onChange={e => props.setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Correo electrónico"
                                onChange={e => props.setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Contraseña"
                                type="password"
                                onChange={e =>
                                    props.setPassword(e.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        checked={!props.isDriver}
                                        onChange={handleChange}
                                    />
                                }
                                label="Soy Cliente"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        checked={props.isDriver}
                                        onChange={handleChange}
                                    />
                                }
                                label="Soy Conductor"
                            />
                        </Grid>
                    </Grid>
                </form>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(props.isDriver)? openModal : toMain}
                >
                    Registrarse
                </Button>
                <Modal open={open} />
            </div>
        </Container>
    );
};

export default SignUp;
