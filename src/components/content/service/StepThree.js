import React from "react";
import {useMutation} from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Col, Collapse, Layout, Modal, Row, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {Avatar, Grid, Paper, TextField} from "@material-ui/core";

import {ACCEPT_SERVICE, CANCEL_SERVICE, FINISH_SERVICE} from "../../../graphql/mutations";

const { Panel } = Collapse;

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
    collapse: { borderRadius: "5px" },
    spin: {
        position: "absolute",
        zIndex: "1",
        top: "50%",
        left: "40%",
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

const StepThree = (props) => {
    const classes = useStyles();
    const [acceptService, { loading: loadingService }] = useMutation(
        ACCEPT_SERVICE,
        {
            onCompleted: () => {
                props.setVisible(false);
                success("aceptado");
            },
            onError: (error) => {
                errorModal(error.graphQLErrors[0].message);
            },
            refetchQueries: ["ServicesByUser"],
        }
    );

    const [cancelService, { loading: loadingCancelService }] = useMutation(
        CANCEL_SERVICE,
        {
            onCompleted: () => {
                props.setVisible(false);
                success("cancelado");
            },
            onError: (error) => {
                errorModal(error.graphQLErrors[0].message);
            },
            refetchQueries: ["ServicesByUser"],
        }
    );

    const [finishService, { loading: loadingFinishService }] = useMutation(
        FINISH_SERVICE,
        {
            onCompleted: () => {
                props.setVisible(false);
                success("terminado");
            },
            onError: (error) => {
                errorModal(error.graphQLErrors[0].message);
            },
            refetchQueries: ["ServicesByUser"],
        }
    );

    const {
        _id,
        origin,
        destination,
        commentaryUser,
        commentaryDriver,
        price,
    } = props.value;

    const handleSubmit = async () => {
        return await acceptService({
            variables: { _id: _id },
        });
    };

    const handleSubmitFinish = async () => {
        return await finishService({
            variables: { _id: _id },
        });
    };

    const handleCancel = async () => {
        return await cancelService({
            variables: { _id: _id },
        });
    };

    return (
        <Layout className={classes.paper}>
            {(loadingService || loadingCancelService || loadingFinishService) && (
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
            <form className={classes.form}>
                <Collapse className={classes.collapse}>
                    <Panel header="Información del vehiculo" key="1">
                        <div>
                            <ul>
                                <li>Capacidad:0000</li>
                                <li>Altura:0000</li>
                                <li>Alcance:0000</li>
                                <li>ejes:0000</li>
                            </ul>
                        </div>
                    </Panel>
                </Collapse>
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
                                <Avatar>U</Avatar>
                            </Grid>
                            <Grid item xs>
                                <>
                                    {(commentaryUser === "" || commentaryUser === null) && (
                                        <Typography
                                            color="textSecondary"
                                            variant="body2"
                                            style={{fontStyle:"italic"}}
                                        >
                                            El usuario no ha comentado nada durante la creación del servicio.
                                        </Typography>
                                    )}
                                    {commentaryUser !== "" && (
                                        <Typography
                                            color="textSecondary"
                                            variant="body2"
                                        >
                                            {commentaryUser}
                                        </Typography>
                                    )}
                                </>
                            </Grid>
                        </Grid>
                    </Paper>
                </Row>
                <Row className={classes.rows}>
                    <Paper className={classes.commentary} elevation={2}>
                        <Grid container wrap="nowrap" spacing={1}>
                            <Grid item>
                                <Avatar>C</Avatar>
                            </Grid>
                            <Grid item>
                                <>
                                    {(commentaryDriver === "" || commentaryDriver === null) && (
                                        <Typography
                                            color="textSecondary"
                                            variant="body2"
                                            style={{fontStyle:"italic"}}
                                        >
                                            El conductor no ha comentado nada durante la creación del servicio.
                                        </Typography>
                                    )}
                                    {commentaryDriver !== "" && (
                                        <Typography
                                            color="textSecondary"
                                            variant="body2"
                                        >
                                            {commentaryDriver}
                                        </Typography>
                                    )}
                                </>
                            </Grid>
                        </Grid>
                    </Paper>
                </Row>
                <Row className={classes.rows}>
                    <Paper className={classes.commentary} elevation={1}>
                        <Grid container wrap="nowrap" spacing={1}>
                            <Grid item>
                                <Typography variant="h6" color="textSecondary">
                                    Precio:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="textSecondary">
                                    {price}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Row>
                {props.value.state === "onHold" && (
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
                                className={classes.button}
                                onClick={handleSubmit}
                            >
                                Confirmar
                            </Button>
                        </Col>
                    </Row>
                )}
                {props.value.state === "accepted" && (
                    <Row gutter={16} className={classes.buttons}>
                        <Col>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={handleSubmitFinish}
                            >
                                Finalizar
                            </Button>
                        </Col>
                    </Row>
                )}
            </form>
        </Layout>
    );
};
export default StepThree;
