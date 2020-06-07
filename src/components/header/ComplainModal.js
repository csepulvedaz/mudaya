import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Layout, Row, Button, Col } from "antd";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextField } from "@material-ui/core";

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
    buttons: {
        marginTop: theme.spacing(2),
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    button: {
        width: "124px",
        height: "35px",
        margin: "5px 0px",
        borderRadius: "7px",
        background: theme.palette.primary.main,
        color: "#fff",
        focus: "false",
        fontWeight: "600",
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.16)",
    },
}));

const ComplainModal = (props) => {
    const classes = useStyles();

    const handleCancel = () => {
        document.getElementById("formComplain").reset();
        props.setVisible(false);
    };

    return (
        <Modal
            visible={props.visible}
            centered
            title="Queja"
            onCancel={handleCancel}
            footer={null}
        >
            <Layout className={classes.paper}>
                <Formik
                    initialValues={{
                        complain: "",
                    }}
                    validationSchema={Yup.object({
                        complain: Yup.string().required("Campo requerido!"),
                    })}
                    onSubmit={(values) => {
                        console.log("nice queja");
                    }}
                >
                    {(formik) => (
                        <Form
                            id="formComplain"
                            className={classes.form}
                            onSubmit={formik.handleSubmit}
                            noValidate
                        >
                            <Row>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    placeholder="Por favor ingrese su queja dentro de este cuadro, no tardaremos en reponder :)"
                                    multiline
                                    error={formik.errors.complain}
                                    rows="5"
                                    name="complain"
                                    type="text"
                                    {...formik.getFieldProps("complain")}
                                />
                            </Row>
                            <Row className={classes.buttons}>
                                <Col>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        onClick={formik.handleSubmit}
                                        className={classes.button}
                                    >
                                        Enviar
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Layout>
        </Modal>
    );
};

export default ComplainModal;
