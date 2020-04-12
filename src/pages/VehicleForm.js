import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Typography from "@material-ui/core/Typography";
import HeightIcon from "@material-ui/icons/Height";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { CREATE_VEHICLE } from "../graphql/mutations";
import AuthContext from "../context/auth-context";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            height: "0px",
            backgroundColor: "#fafafa",
        },
    },
    paper: {
        marginTop: theme.spacing(5),
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
        marginBottom: "10px",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 0),
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
    selectContainer: {
        marginBottom: "2.5px",
    },
    select: {
        marginBottom: "2.5px",
    },
    notchedOutline: {},
    focused: {
        "&$focused $notchedOutline": {
            border: "1px #000 solid !important",
        },
    },
}));

const types = [
    { value: "", label: "Seleccione un tipo" },
    { value: "Vehículo Turbo", label: "Vehículo Turbo" },
    { value: "Camión Sencillo", label: "Camión Sencillo" },
    { value: "Doble Troque", label: "Doble Troque" },
    { value: "Cuatro Manos", label: "Cuatro Manos" },
    { value: "Minimula", label: "Minimula" },
    { value: "Tractomula 2 Troques", label: "Tractomula 2 Troques" },
    { value: "Tractomula 3 Troques", label: "Tractomula 3 Troques" },
];

function errorModal(msg) {
    Modal.error({
        title: "Error",
        content: msg,
    });
}

const VehicleForm = () => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    let history = useHistory();
    const [createVehicle, { loading: loadingVehicle }] = useMutation(
        CREATE_VEHICLE,
        {
            onCompleted: (data) => {
                history.push("/principal");
            },
            onError: (error) => {
                errorModal(error.graphQLErrors[0].message);
            },
        }
    );

    const toPrincipal = async (values) => {
        // alert(JSON.stringify(values, null, 2));
        let input = {
            _id: values._id,
            brand: values.brand,
            model: values.model,
            year: values.year,
            type: values.type,
            dimensions: values.dimensions,
            capacity: values.capacity,
            commentary: values.commentary,
            idDriver: values.idDriver,
        };
        return await createVehicle({
            variables: { input },
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {loadingVehicle && (
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
                    Registro Vehiculo
                </Typography>

                <Formik
                    initialValues={{
                        _id: "",
                        brand: "",
                        model: "",
                        year: "",
                        type: "",
                        dimensions: "",
                        capacity: "",
                        commentary: "",
                    }}
                    validationSchema={Yup.object({
                        _id: Yup.string()
                            .required("Campo requerido!")
                            .max(7, "Placa invalida!")
                            .matches(/^(([a-z]|[A-Z]){3}(-[0-9]{3}){1})$/, {
                                message: "Placa incorrecta!",
                            }),
                        brand: Yup.string().required("Campo requerido!"),
                        model: Yup.string().required("Campo requerido!"),
                        year: Yup.number()
                            .positive("Año inválido!")
                            .integer("Año inválido!")
                            .required("Campo requerido!")
                            .max(2020, "Año inválido!")
                            .typeError("Solo números!"),
                        type: Yup.string().required("Campo requerido!"),
                        dimensions: Yup.string()
                            .required("Campo requerido!")
                            .matches(
                                /^(([0-9]){1,2}(\x[0-9]{1,2})(\x[0-9]{1,2}){1})$/,
                                {
                                    message: "Dimensiones incorrectas!",
                                }
                            )
                            .typeError("Error!"),
                        capacity: Yup.string()
                            .required("Campo requerido!")
                            .matches(
                                /^(([0-9]){1,2}(\x[0-9]{1,2})(\x[0-9]{1,2}){1})$/,
                                {
                                    message: "Capacidad incorrecta!",
                                }
                            )
                            .typeError("Error!"),
                        commentary: Yup.string().max(
                            100,
                            "Máximo 100 caracteres"
                        ),
                    })}
                    onSubmit={(values) => {
                        values._id = values._id.toLowerCase();
                        values.year = parseInt(values.year);
                        values.idDriver = context.userId;
                        toPrincipal(values);
                    }}
                >
                    {(formik) => (
                        <Form
                            className={classes.form}
                            onSubmit={formik.handleSubmit}
                            noValidate
                        >
                            <Grid container spacing={2}>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    className={classes.selectContainer}
                                >
                                    <Select
                                        className={classes.select}
                                        native
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                        name="type"
                                        {...formik.getFieldProps("type")}
                                    >
                                        {types.map((element, index) => (
                                            <option
                                                key={index}
                                                value={element.value}
                                                label={element.label}
                                            />
                                        ))}
                                    </Select>
                                    <ErrorMessage name="type">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                        placeholder="Placa"
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
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                        placeholder="Marca"
                                        name="brand"
                                        type="text"
                                        {...formik.getFieldProps("brand")}
                                        InputProps={{
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="brand">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                        placeholder="Modelo"
                                        name="model"
                                        type="text"
                                        {...formik.getFieldProps("model")}
                                        InputProps={{
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="model">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                        placeholder="Año"
                                        name="year"
                                        type="text"
                                        {...formik.getFieldProps("year")}
                                        InputProps={{
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="year">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                        placeholder="Dimensiones"
                                        name="dimensions"
                                        type="text"
                                        {...formik.getFieldProps("dimensions")}
                                        InputProps={{
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <HeightIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <ErrorMessage name="dimensions">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                        placeholder="Capacidad"
                                        name="capacity"
                                        type="text"
                                        {...formik.getFieldProps("capacity")}
                                        InputProps={{
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AspectRatioIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <ErrorMessage name="capacity">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                        multiline
                                        rows={4}
                                        placeholder="Extras"
                                        name="commentary"
                                        type="text"
                                        {...formik.getFieldProps("commentary")}
                                        InputProps={{
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="commentary">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Registrar
                                </Button>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default VehicleForm;
