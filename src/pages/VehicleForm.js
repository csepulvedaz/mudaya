import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field, FormikProps } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_VEHICLE } from "../graphql/mutations";

import HeightIcon from "@material-ui/icons/Height";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import MessageIcon from "@material-ui/icons/Message";
import { findByLabelText } from "@testing-library/react";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      height: "0px",
      backgroundColor: "#fafafa",
    },
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
    marginBottom: "10px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
  },
  truck: {
    fontSize: "50px",
    color: "#ccc",
  },
  unity: {
    marginTop: "20px",
  },
  errorMessage: {
    marginTop: "15px",
    color: "red",
    fontSize: "12px",
  },
  notchedOutline: {},
  focused: {
    "&$focused $notchedOutline": {
      border: "1px #ccc solid !important",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  smallPlaceholder: {
    fontSize: "16px",
  },
}));
const types = [
  "",
  "Vehículo Turbo",
  "Camión Sencillo",
  "Doble Troque",
  "Cuatro Manos",
  "Minimula",
  "Tractomula 2 Troques",
  "Tractomula 3 Troques",
];
const VehicleForm = (props) => {
  const classes = useStyles();
  const [createVehicle] = useMutation(CREATE_VEHICLE);
  let history = useHistory();

  const toPrincipal = async (values) => {
    alert(JSON.stringify(values, null, 2));
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
    history.push("/principal");
    return await createVehicle({
      variables: { input },
    });
  };

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
              .required("!")
              .max(7, "Invalida")
              .matches(/^(([a-z]|[A-Z]){3}(\-[0-9]{3}){1})$/, {
                message: "Mal",
              }),
            brand: Yup.string().required("!"),
            model: Yup.string().required("!"),
            year: Yup.number().required("!").max(2020, "!").typeError("!"),
            type: Yup.string().required("!"),
            dimensions: Yup.string()
              .required("!")
              .matches(/^(([0-9]){2}(\x[0-9]{2})(\x[0-9]{2}){1})$/, {
                message: "Mal",
              })
              .typeError("!"),
            capacity: Yup.string()
              .required("!")
              .matches(/^(([0-9]){2}(\x[0-9]{2})(\x[0-9]{2}){1})$/, {
                message: "Mal",
              })
              .typeError("!"),
            commentary: Yup.string()
              .required("!")
              .max(10, "Debe ser de 10 caracteres o menos"),
          })}
          onSubmit={(values) => {
            values._id = values._id.toLowerCase();
            values.year = parseInt(values.year);
            values.idDriver = 123; //Esto llegaria por los props
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    placeholder="Placa"
                    name="_id"
                    type="_id"
                    {...formik.getFieldProps("_id")}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                        focused: classes.focused,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <ErrorMessage name="_id">
                            {(msg) => (
                              <p className={classes.errorMessage}>{msg}</p>
                            )}
                          </ErrorMessage>
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    item
                    xs={12}
                    sm={6}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    placeholder="Marca"
                    name="brand"
                    type="brand"
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
                              <p className={classes.errorMessage}>{msg}</p>
                            )}
                          </ErrorMessage>
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  placeholder="Modelo"
                  name="model"
                  type="model"
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
                            <p className={classes.errorMessage}>{msg}</p>
                          )}
                        </ErrorMessage>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  placeholder="Año"
                  name="year"
                  type="year"
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
                            <p className={classes.errorMessage}>{msg}</p>
                          )}
                        </ErrorMessage>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
                <Grid item xs={12} sm={12}>
                  <Field
                    as="select"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    placeholder="Tipo de Vehículo"
                    name="type"
                    type="type"
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
                              <p className={classes.errorMessage}>{msg}</p>
                            )}
                          </ErrorMessage>
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  >
                    {types.map((something, index) => (
                      <option value={types[index]}>{types[index]}</option>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    placeholder="Dimensiones"
                    name="dimensions"
                    type="dimensions"
                    {...formik.getFieldProps("dimensions")}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                        focused: classes.focused,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <ErrorMessage name="dimensions">
                            {(msg) => (
                              <p className={classes.errorMessage}>{msg}</p>
                            )}
                          </ErrorMessage>
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start">
                          <HeightIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    placeholder="Capacidad (m3)"
                    name="capacity"
                    // validate={validateCapacidad}
                    type="capacity"
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
                              <p className={classes.errorMessage}>{msg}</p>
                            )}
                          </ErrorMessage>
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start">
                          <AspectRatioIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  placeholder="commentary"
                  name="commentary"
                  type="commentary"
                  {...formik.getFieldProps("commentary")}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                      focused: classes.focused,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <ErrorMessage name="commentary">
                          {(msg) => (
                            <p className={classes.errorMessage}>{msg}</p>
                          )}
                        </ErrorMessage>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <MessageIcon />
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
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default VehicleForm;
