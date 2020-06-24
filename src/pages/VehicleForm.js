import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Typography from "@material-ui/core/Typography";
import HeightIcon from "@material-ui/icons/Height";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { CREATE_VEHICLE } from "../graphql/mutations";
import AuthContext from "../context/auth-context";
import TextMaskCustom from "../components/utils/TextMaskCustom";
import {
    cities,
    departments,
    types,
    years,
} from "../components/utils/selectArrays";
import CustomSelect from "../components/utils/CustomSelect";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            height: "0px",
            backgroundColor: "#fafafa",
        },
    },
    paper: {
        marginTop: "10px",
        width: "400px",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "30px",
        boxShadow: theme.shadows[14],
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
        background: theme.palette.primary.main,
        borderRadius: 9,
        border: 0,
        color: "white",
        height: 48,
        boxShadow: theme.shadows[2],
        "&:hover": {
            background: theme.palette.primary.light,
            boxShadow: theme.shadows[4],
        },
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
        color: theme.palette.error.main,
        fontSize: "12px",
    },
    selectContainer: {
        marginBottom: "2.5px",
    },
    selectYear: {
        marginTop: "2.5px",
    },
    notchedOutline: {},
    focused: {
        "&$focused $notchedOutline": {
            border: `1px ${theme.palette.primary.light} solid !important`,
        },
    },
}));

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
            onCompleted: () => {
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
            department: values.department,
            city: values.city,
            commentary: values.commentary,
            idDriver: context.userId,
        };
        return await createVehicle({
            variables: { input },
        });
    };

    const [selectCity, setSelectCity] = useState(cities);

    const onChangeDepartment = (e) => {
        if (e.target.name === "department") {
            const value = departments[e.target.options.selectedIndex].value;
            setSelectCity(
                cities.filter(function(city) {
                    return city.department === value;
                })
            );
            if (value === undefined) setSelectCity(cities);
        }
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
                        department: "",
                        city: "",
                        commentary: "",
                    }}
                    validationSchema={Yup.object({
                        _id: Yup.string()
                            .required("Campo requerido!")
                            .matches(/^(([a-z]|[A-Z]){3}( - [0-9]{3}){1})$/, {
                                message: "Placa incorrecta!",
                            }),
                        brand: Yup.string().required("Campo requerido!"),
                        model: Yup.string().required("Campo requerido!"),
                        year: Yup.string().required("Campo requerido!"),
                        type: Yup.string().required("Campo requerido!"),
                        department: Yup.string().required("Campo requerido!"),
                        city: Yup.string().required("Campo requerido!"),
                        dimensions: Yup.string()
                            .required("Campo requerido!")
                            .matches(
                                /^((([0-9]){1}\.([0-9]){1}m x (([0-9]){1}|\s)([0-9]){1}\.([0-9]){1}m x ([0-9]){1,2}\.([0-9]){1}m){1})$/,
                                {
                                    message: "Dimensiones incorrectas!",
                                }
                            )
                            .typeError("Error!"),
                        capacity: Yup.string()
                            .required("Campo requerido!")
                            .matches(
                                /^((([0-9]){1}\.([0-9]){1}m x (([0-9]){1}|\s)([0-9]){1}\.([0-9]){1}m x ([0-9]){1,2}\.([0-9]){1}m){1})$/,
                                {
                                    message: "Capacidad incorrecta!",
                                }
                            ),
                        commentary: Yup.string().max(
                            100,
                            "Máximo 100 caracteres"
                        ),
                    })}
                    onSubmit={(values) => {
                        values._id = values._id
                            .toLowerCase()
                            .replace(/\s/g, "");
                        values.year = parseInt(values.year);
                        toPrincipal(values);
                    }}
                >
                    {(formik) => (
                        <Form
                            className={classes.form}
                            onChange={onChangeDepartment}
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
                                    <NativeSelect
                                        fullWidth
                                        variant="outlined"
                                        name="type"
                                        input={<CustomSelect />}
                                        {...formik.getFieldProps("type")}
                                    >
                                        {types
                                            .sort((a, b) =>
                                                a.label > b.label ? 1 : -1
                                            )
                                            .map((element, index) => (
                                                <option
                                                    key={index}
                                                    value={element.value}
                                                >
                                                    {element.label}
                                                </option>
                                            ))}
                                    </NativeSelect>
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
                                        label="Placa"
                                        placeholder="abc - 123"
                                        name="_id"
                                        type="text"
                                        {...formik.getFieldProps("_id")}
                                        InputProps={{
                                            inputComponent: TextMaskCustom,
                                            inputProps: {
                                                mask: [
                                                    /([a-z,A-Z])/,
                                                    /([a-z,A-Z])/,
                                                    /([a-z,A-Z])/,
                                                    " ",
                                                    "-",
                                                    " ",
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                ],
                                            },
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
                                        label="Marca"
                                        // placeholder="Marca"
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
                                        label="Modelo"
                                        // placeholder="Modelo"
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
                                <Grid
                                    item
                                    container
                                    xs={12}
                                    sm={6}
                                    className={classes.selectYear}
                                >
                                    <NativeSelect
                                        fullWidth
                                        variant="outlined"
                                        name="year"
                                        input={<CustomSelect />}
                                        {...formik.getFieldProps("year")}
                                    >
                                        {years
                                            .sort((a, b) =>
                                                a.label > b.label ? 1 : -1
                                            )
                                            .map((element, index) => (
                                                <option
                                                    key={index}
                                                    value={element.value}
                                                >
                                                    {element.label}
                                                </option>
                                            ))}
                                    </NativeSelect>
                                    <ErrorMessage name="year">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    xs={12}
                                    sm={6}
                                    className={classes.selectYear}
                                >
                                    <NativeSelect
                                        fullWidth
                                        variant="outlined"
                                        name="department"
                                        input={<CustomSelect />}
                                        onChange={formik.handleChange}
                                        {...formik.getFieldProps("department")}
                                    >
                                        {departments
                                            .sort((a, b) =>
                                                a.label > b.label ? 1 : -1
                                            )
                                            .map((element, index) => (
                                                <option
                                                    key={index}
                                                    value={element.value}
                                                >
                                                    {element.label}
                                                </option>
                                            ))}
                                    </NativeSelect>
                                    <ErrorMessage name="department">
                                        {(msg) => (
                                            <p className={classes.helperText}>
                                                {msg}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    xs={12}
                                    sm={6}
                                    className={classes.selectYear}
                                >
                                    <NativeSelect
                                        fullWidth
                                        variant="outlined"
                                        name="city"
                                        input={<CustomSelect />}
                                        {...formik.getFieldProps("city")}
                                    >
                                        {selectCity
                                            .sort((a, b) =>
                                                a.city > b.city ? 1 : -1
                                            )
                                            .map((element, index) => (
                                                <option
                                                    key={index}
                                                    value={
                                                        element.city +
                                                        ", " +
                                                        element.department.substr(
                                                            0,
                                                            2
                                                        )
                                                    }
                                                >
                                                    {element.city +
                                                        ", " +
                                                        element.department.substr(
                                                            0,
                                                            2
                                                        )}
                                                </option>
                                            ))}
                                    </NativeSelect>
                                    <ErrorMessage name="city">
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
                                        label="Dimensiones"
                                        placeholder="Alto x Largo x Ancho"
                                        name="dimensions"
                                        type="text"
                                        {...formik.getFieldProps("dimensions")}
                                        InputProps={{
                                            inputComponent: TextMaskCustom,
                                            inputProps: {
                                                mask: [
                                                    /[1-3]/,
                                                    ".",
                                                    /\d/,
                                                    "m",
                                                    " ",
                                                    "x",
                                                    " ",
                                                    /[0-1]/,
                                                    /\d/,
                                                    ".",
                                                    /\d/,
                                                    "m",
                                                    " ",
                                                    "x",
                                                    " ",
                                                    /[1-3]/,
                                                    ".",
                                                    /\d/,
                                                    "m",
                                                ],
                                            },
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
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
                                        label="Capacidad"
                                        placeholder="(Alto x Largo x Ancho)"
                                        name="capacity"
                                        type="text"
                                        {...formik.getFieldProps("capacity")}
                                        InputProps={{
                                            inputComponent: TextMaskCustom,
                                            inputProps: {
                                                mask: [
                                                    /[1-3]/,
                                                    ".",
                                                    /\d/,
                                                    "m",
                                                    " ",
                                                    "x",
                                                    " ",
                                                    /[0-1]/,
                                                    /\d/,
                                                    ".",
                                                    /\d/,
                                                    "m",
                                                    " ",
                                                    "x",
                                                    " ",
                                                    /[1-3]/,
                                                    ".",
                                                    /\d/,
                                                    "m",
                                                ],
                                            },
                                            classes: {
                                                notchedOutline:
                                                    classes.notchedOutline,
                                                focused: classes.focused,
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
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
                                        label="Extras"
                                        placeholder="Ingresa información extra acerca de tu vehiculo o tus servicios"
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
