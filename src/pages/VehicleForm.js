import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field, FormikProps } from "formik";

import HeightIcon from '@material-ui/icons/Height';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import MessageIcon from '@material-ui/icons/Message';

import AuthContext from "../context/auth-context";

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
        boxShadow: "1px 1px 10px #ccc",
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
    },
    errorMessage: { marginTop: "15px", color: "red", fontSize: "12px" },
    notchedOutline: {},
    focused: {
        "&$focused $notchedOutline": {
            border: "1px #ccc solid !important",
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

const VehicleForm = props => {
    const classes = useStyles();
    const context = useContext(AuthContext);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                
                <LocalShippingIcon className={classes.truck} />

                <Typography component="h1" variant="h5">
                    Registro Vehiculo
                </Typography>

                <Formik 
                    initialValues={{
                        brand: "",
                        model: "",
                        year: "",
                        type: "",
                        height: "",
                        capacity: "",
                        extras: "",
                        licensePlate: "",
                    }}
                    validationSchema={Yup.object({
                        brand: Yup.string().required("Requerido"),
                        model: Yup.string().required("Requerido"),
                        year: Yup.number().required("Requerido"),
                        type: Yup.string().required("Requerido"),
                        height: Yup.number().required("Requerido"),
                        capacity: Yup.number().required("Requerido"),
                        extras: Yup.string().required("Requerido"),
                        licensePlate: Yup.string().required("Requerido"),
                    })}
                    onSubmit={(values) => {
                        alert(JSON.stringify(values, null, 2));
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
                                placeholder="Placa del Vehículo"
                                name="licensePlate"
                                type="text"
                                {...formik.getFieldProps("licensePlate")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ErrorMessage name="licensePlate">
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
                                            
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                item xs={12} sm={6}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                placeholder="Marca"
                                name="brand"
                                type="text"
                                {...formik.getFieldProps("brand")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ErrorMessage name="brand">
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
                                            
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                placeholder="Modelo"
                                name="model"
                                type="text"
                                {...formik.getFieldProps("model")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ErrorMessage name="model">
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
                                            
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                placeholder="Año"
                                name="year"
                                type="number"
                                {...formik.getFieldProps("year")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ErrorMessage name="year">
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
                                            
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Field
                                as ="select"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                placeholder="Tipo de Vehículo"
                                name="type"
                                type="text"

                                {...formik.getFieldProps("type")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ErrorMessage name="type">
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
                                            
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                <option value="Vehículo Trubo">Vehículo Trubo</option>
                                <option value="Camión Sencillo">Camión Sencillo</option>
                                <option value="Doble Troque">Doble Troque</option>
                                <option value="Cuatro Manos">Cuatro Manos</option>
                                <option value="Minimula">Minimula</option>
                                <option value="Tractomula 2 Troques">Tractomula 2 Troques</option>
                                <option value="Tractomula 3 Troques">Tractomula 3 Troques</option>
                            </Field>

                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                placeholder="Altura"
                                name="height"
                                type="float"
                                {...formik.getFieldProps("height")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ErrorMessage name="height">
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
                                            <HeightIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                placeholder="Capacidad (m2)"
                                name="capacity"
                                type="float"
                                {...formik.getFieldProps("capacity")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ErrorMessage name="capacity">
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
                                            <AspectRatioIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                placeholder="Extras"
                                name="extras"
                                type="text"
                                {...formik.getFieldProps("extras")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ErrorMessage name="extras">
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
                                            <MessageIcon/>
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
                                Registrar
                            </Button>                            
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default VehicleForm;
