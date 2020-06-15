import React, {useContext, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Layout, Modal, Row, Spin} from "antd";
import {ErrorMessage, Form, Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import CustomSelect from "../../utils/CustomSelect";
import TextMaskCustom from "../../utils/TextMaskCustom";
import InputAdornment from "@material-ui/core/InputAdornment";
import HeightIcon from "@material-ui/icons/Height";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import {Grid} from "@material-ui/core";
import {LoadingOutlined} from "@ant-design/icons";
import * as Yup from "yup";
import {useMutation} from "@apollo/client";

import AuthContext from "../../../context/auth-context";
import {CREATE_VEHICLE} from "../../../graphql/mutations";
import {cities, departments, types, years} from "../../utils/selectArrays";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
    },
    rows: {
        marginTop: theme.spacing(2),
    },
    spin: {
        position: "absolute",
        top: "50%",
        left: "40%",
    },
    selectYear: {
        marginTop: "5px",
    },
    button: {
        margin: "5px 0px",
        borderRadius: "7px",
        background: theme.palette.primary.main,
        color: "#fff",
        focus: "false",
        fontWeight: "600",
        "&:hover": {
            background: theme.palette.primary.main,
            color: "#fff !important",
            boxShadow: theme.shadows[26],
        },
    },
    helperText: {
        margin: "0px 0px -20px 10px",
        color: theme.palette.error.main,
        fontSize: "12px",
    },
    backButton: {
        margin: "5px 0px",
        borderRadius: "7px",
        background: "#fff",
        color: theme.palette.primary.main,
        fontWeight: "600",
        "&:hover": {
            boxShadow: "0 3px 3px rgba(0, 0, 0, 0.16)",
        },
    },
}));

function success() {
    Modal.success({
        content: "Vehiculo añadido con exito",
    });
}
function errorModal(msg) {
    Modal.error({
        title: "Error",
        content: msg,
    });
}

const CreateVehicleModal = (props) => {
    const context = useContext(AuthContext);
    const classes = useStyles();

    const [newVehicle, { loading: loadingVehicle }] = useMutation(
        CREATE_VEHICLE,
        {
            onCompleted: () => {
                document.getElementById("form1").reset();
                props.setVisible(false);
                success();
            },
            onError: (error) => {
                errorModal(error.graphQLErrors[0].message);
            },
        }
    );

    const addVehicle = async (values) => {
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
        return await newVehicle({
            variables: { input },
        });
    };

    const handleCancel = () => {
        document.getElementById("form1").reset();
        props.setVisible(false);
    };

    const [selectCity, setSelectCity] = useState(cities);

    function onChangeDepartment(value) {
        setSelectCity(cities.filter(function(city){return city.department === value;}));
        if (value === undefined) setSelectCity(cities);
    }


    return (
        <Modal
            visible={props.visible}
            centered
            title="Agregar vehiculo"
            onCancel={handleCancel}
            footer={[]}
        >
            <Layout className={classes.paper}>
                {loadingVehicle && (
                    <Spin
                        tip="Cargando..."
                        indicator={
                            <LoadingOutlined style={{ fontSize: 40 }} spin />
                        }
                        className={classes.spin}
                    />
                )}
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
                        type: Yup.string().required("Campo requerido!"),
                        brand: Yup.string().required("Campo requerido!"),
                        model: Yup.string().required("Campo requerido!"),
                        year: Yup.string().required("Campo requerido!"),
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
                        addVehicle(values);
                    }}
                    onChange={(value) => {
                        console.log("sadsa"+value);
                    }}
                >
                    {(formik) => (
                        <Form
                            id="form1"
                            className={classes.form}
                            onSubmit={formik.handleSubmit}
                            noValidate
                        >
                            <Row className={classes.rows}>
                                <NativeSelect
                                    fullWidth
                                    variant="outlined"
                                    name="type"
                                    input={<CustomSelect />}
                                    {...formik.getFieldProps("type")}
                                >
                                    {types.sort((a, b) => (a.label > b.label) ? 1 : -1).map((element, index) => (
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
                            </Row>
                            <Row className={classes.rows}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            margin="dense"
                                            label="Placa"
                                            placeholder="abc-123"
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
                                                <p
                                                    className={
                                                        classes.helperText
                                                    }
                                                >
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
                                            //placeholder="abc-123"
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
                                                <p
                                                    className={
                                                        classes.helperText
                                                    }
                                                >
                                                    {msg}
                                                </p>
                                            )}
                                        </ErrorMessage>
                                    </Grid>
                                </Grid>
                            </Row>
                            <Row className={classes.rows}>
                                <Grid container spacing={2}>
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
                                                <p
                                                    className={
                                                        classes.helperText
                                                    }
                                                >
                                                    {msg}
                                                </p>
                                            )}
                                        </ErrorMessage>
                                    </Grid>
                                    <Grid
                                        item
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
                                            {years.sort((a, b) => (a.label > b.label) ? 1 : -1).map((element, index) => (
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
                                                <p
                                                    className={
                                                        classes.helperText
                                                    }
                                                >
                                                    {msg}
                                                </p>
                                            )}
                                        </ErrorMessage>
                                    </Grid>
                                </Grid>
                            </Row>
                            <Row className={classes.rows}>
                                <Grid container spacing={2}>
                                    <Grid
                                        item
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
                                            {departments.sort((a, b) => (a.label > b.label) ? 1 : -1).map((element, index) => (
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
                                                <p
                                                    className={
                                                        classes.helperText
                                                    }
                                                >
                                                    {msg}
                                                </p>
                                            )}
                                        </ErrorMessage>
                                    </Grid>
                                    <Grid
                                        item
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
                                            {selectCity.sort((a, b) => (a.city > b.city) ? 1 : -1).map((element, index) => (
                                                <option
                                                    key={index}
                                                    value={element.city+", "+element.department.substr(0,2)}
                                                >
                                                    {element.city+", "+element.department.substr(0,2)}
                                                </option>
                                            ))}
                                        </NativeSelect>
                                        <ErrorMessage name="city">
                                            {(msg) => (
                                                <p
                                                    className={
                                                        classes.helperText
                                                    }
                                                >
                                                    {msg}
                                                </p>
                                            )}
                                        </ErrorMessage>
                                    </Grid>
                                </Grid>
                            </Row>
                            <Row className={classes.rows}>
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
                            </Row>
                            <Row className={classes.rows}>
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
                            </Row>
                            <Row className={classes.rows}>
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
                            </Row>
                            <Row className={classes.rows}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2}>
                                        <Button
                                            key="back"
                                            variant="contained"
                                            onClick={handleCancel}
                                            className={classes.backButton}
                                        >
                                            Volver
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            onClick={formik.handleSubmit}
                                            className={classes.button}
                                        >
                                            Agregar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Layout>
        </Modal>
    );
};

export default CreateVehicleModal;
