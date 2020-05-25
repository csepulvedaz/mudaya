import React from "react";
import { useMutation } from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Col, Layout, Row, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Grid, TextField, Paper, Avatar } from "@material-ui/core";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

import TextMaskCustom from "../../../components/utils/TextMaskCustom";
import { UPDATE_SERVICE, CANCEL_SERVICE } from "../../../graphql/mutations";

const numberMask = createNumberMask({
    prefix: "$",
    suffix: "",
});

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    buttons: {
        marginTop: theme.spacing(2),
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    rows: {
        marginTop: theme.spacing(2),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    commentary: {
        width: "100%",
        padding: theme.spacing(1),
        backgroundColor: "#fafafa",
    },
    button: {
        width: "124px",
        height: "35px",
        marginTop: theme.spacing(3),
        margin: "5px 0px",
        borderRadius: "7px",
        background: theme.palette.primary.main,
        color: "#fff",
        focus: "false",
        fontWeight: "600",
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.16)",
    },
    backButton: {
        width: "124px",
        height: "35px",
        marginTop: theme.spacing(3),
        margin: "5px 0px",
        borderRadius: "7px",
        background: "#fff",
        color: theme.palette.primary.main,
        fontWeight: "600",
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.16)",
    },
    spin: {
        position: "absolute",
        zIndex: "1",
        top: "50%",
        left: "40%",
    },
    helperText: {
        margin: "0px 0px -20px 10px",
        color: "red",
        fontSize: "12px",
    },
    notchedOutline: {},
    focused: {
        "&$focused $notchedOutline": {
            border: `1px ${theme.palette.primary.light} solid !important`,
        },
    },
}));

function success(msg) {
    Modal.success({
        content: `Servicio ${msg} con éxito. Podrás revisar su estado en la barra de servicios.`,
    });
}

function errorModal(msg) {
    Modal.error({
        title: "Error",
        content: msg,
    });
}

const StepTwo = (props) => {
    const classes = useStyles();
    const [updateService, { loading }] = useMutation(UPDATE_SERVICE, {
        onCompleted: () => {
            document.getElementById("form2").reset();
            props.setVisible(false);
            success("actualizado");
        },
        onError: (error) => {
            errorModal(error.graphQLErrors[0].message);
        },
        refetchQueries: ["ServicesByDriver"],
    });

    const [cancelService, { loading: loadingCancelService }] = useMutation(
        CANCEL_SERVICE,
        {
            onCompleted: () => {
                props.setVisible(false);
                document.getElementById("form2").reset();
                success("cancelado");
            },
            onError: (error) => {
                errorModal(error.graphQLErrors[0].message);
            },
            refetchQueries: ["ServicesByUser"],
        }
    );

    const { _id, destination, origin, commentaryUser } = props.value;

    const handleCancel = async () => {
        return await cancelService({
            variables: { _id: _id },
        });
    };

    const update = async (values) => {
        const input = {
            commentaryDriver: values.commentaryDriver,
            state: "onHold",
            price: values.price,
        };

        return await updateService({
            variables: { _id: _id, input },
        });
    };

    return (
        <Layout className={classes.paper}>
            {(loading || loadingCancelService) && (
                <Spin
                    tip="Cargando..."
                    indicator={
                        <LoadingOutlined style={{ fontSize: 40 }} spin />
                    }
                    className={classes.spin}
                />
            )}
            <Row>
                <Typography component="h1" variant="h5">
                    Precio del servicio
                </Typography>
            </Row>
            <Formik
                initialValues={{
                    price: "",
                    commentaryDriver: "",
                }}
                validationSchema={Yup.object({
                    price: Yup.string().required("Requerido"),
                    commentaryDriver: Yup.string().max(
                        300,
                        "Máximo 300 caracteres"
                    ),
                })}
                onSubmit={(values) => {
                    update(values);
                }}
            >
                {(formik) => (
                    <Form
                        id="form2"
                        className={classes.form}
                        onSubmit={formik.handleSubmit}
                        noValidate
                    >
                        <Row className={classes.rows}>
                            <TextField
                                variant="outlined"
                                size="small"
                                margin="none"
                                label="Origen"
                                defaultValue={origin}
                                disabled={true}
                                fullWidth
                            />
                        </Row>
                        <Row className={classes.rows}>
                            <TextField
                                variant="outlined"
                                size="small"
                                margin="none"
                                label="Destino"
                                defaultValue={destination}
                                disabled={true}
                                fullWidth
                            />
                        </Row>
                        <Row className={classes.rows}>
                            <Paper className={classes.commentary} elevation={2}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar>C</Avatar>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography
                                            color="textSecondary"
                                            variant="body2"
                                        >
                                            Comentario del cliente:
                                            {" " + commentaryUser}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Row>
                        <Row className={classes.rows}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                label="Precio"
                                placeholder="Ingresa el precio del servicio"
                                name="price"
                                type="text"
                                {...formik.getFieldProps("price")}
                                InputProps={{
                                    inputComponent: TextMaskCustom,
                                    inputProps: {
                                        mask: numberMask,
                                    },
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                }}
                            />
                            <ErrorMessage name="price">
                                {(msg) => (
                                    <p className={classes.helperText}>{msg}</p>
                                )}
                            </ErrorMessage>
                        </Row>
                        <Row className={classes.rows}>
                            <TextField
                                label="Comentario al Cliente"
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                multiline
                                rows={4}
                                placeholder="Menciona elementos que consideres importantes para el cliente"
                                name="commentaryDriver"
                                type="text"
                                {...formik.getFieldProps("commentaryDriver")}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                }}
                            />
                            <ErrorMessage name="commentaryDriver">
                                {(msg) => (
                                    <p className={classes.helperText}>{msg}</p>
                                )}
                            </ErrorMessage>
                        </Row>
                        <Row gutter={16} className={classes.buttons}>
                            <Col>
                                <Button
                                    variant="contained"
                                    onClick={handleCancel}
                                    className={classes.backButton}
                                >
                                    Cancelar
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={formik.handleSubmit}
                                    className={classes.button}
                                >
                                    Aceptar
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};
export default StepTwo;
