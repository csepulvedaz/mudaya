import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../context/auth-context";
import { Modal, Layout, Row, Button,Col } from "antd";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
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
    rows: {
        marginTop: theme.spacing(1),
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
}));

const ComplainModal = (props) =>{
    const context = useContext(AuthContext);
    const classes = useStyles();

    const handleCancel = () => {
        document.getElementById("formComplain").reset();
        props.setVisible(false);
    };

    return(
        <Modal
            visible={props.visible}
            centered
            title="inserte su queja"
            onCancel={handleCancel}
            footer={[]}
        >
            <Layout className={classes.paper}>
                <Formik
                    initialValues={{
                        complain:"",
                    }}
                    validationSchema={Yup.object({
                        complain: Yup.string().required("Campo requerido!"),
                    })}
                    onSubmit={(values)=>{
                        console.log("nice queja")
                    }}
                >
                    {(formik) => (
                        <Form
                            id="formComplain"
                            className={classes.form}
                            onSubmit={formik.handleSubmit}
                            noValidate
                        >
                            <Row className={classes.rows}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    label="queja" 
                                    multiline
                                    rows="4"  
                                    name="complain"
                                    type="text"
                                    {...formik.getFieldProps("complain")}
                                />
                                <ErrorMessage name="complain">
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
                            </Row>
                            <Row gutter={16} className={classes.buttons}>
                                <Col>
                                    <Button
                                        variant="contained"
                                        onClick={handleCancel}
                                        className={classes.backButton}
                                    >
                                        volver
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        onClick={formik.handleSubmit}
                                        className={classes.button}
                                    >
                                        enviar
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