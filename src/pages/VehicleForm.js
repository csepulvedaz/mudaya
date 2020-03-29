import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

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
        margin: theme.spacing(3, 0, 0),
    },
    truck: {
        fontSize: "50px",
        color: "#ccc"
    },
    unity: {
        marginTop:"20px"
    }
}));

const VehicleForm = props => {
    const classes = useStyles();
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [type, setType] = useState("");
    const [height, setHeight] = useState("");
    const [capacity, setCapacity] = useState("");
    const [extras, setExtras] = useState("");

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <LocalShippingIcon className={classes.truck} />
                <Typography component="h1" variant="h5">
                    Registro Vehiculo
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Marca"
                                autoFocus
                                onChange={e => setBrand(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Modelo"
                                onChange={e => setModel(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Año"
                                onChange={e => setYear(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required variant="outlined" fullWidth>
                                <InputLabel>Tipo</InputLabel>
                                <Select
                                    native
                                    onChange={e => setType(e.target.value)}
                                    label="Tipo"
                                >
                                    <option aria-label="None" value="" />
                                    <option value="Van">Van</option>
                                    <option value="Camioneta">Camioneta</option>
                                    <option value="Camión">Camión</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Altura"
                                onChange={e => setHeight(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <p className={classes.unity}>m</p>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Capacidad"
                                onChange={e => setCapacity(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <p className={classes.unity}>
                                                m<sup>3</sup>
                                            </p>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="outlined-multiline-static"
                                label="Extras"
                                multiline
                                rows="4"
                                onChange={e => setExtras(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Link
                        to="/principal"
                        style={{ textDecoration: "none", color: "#fff" }}
                    >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Registrar
                        </Button>
                    </Link>
                </form>
            </div>
        </Container>
    );
};

export default VehicleForm;
