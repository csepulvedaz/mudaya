import React, {useState} from "react";
import {useMutation} from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Col, Collapse, Layout, Modal, Rate, Row, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {Avatar, Grid, Paper, TextField} from "@material-ui/core";

import {CREATE_RATING, RATE_SERVICE} from "../../../graphql/mutations";

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
    rate: {
        margin: "5px 0px",
        fontSize: "25px",
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
        content: `Servicio ${msg} con éxito. Podrás revisar su estado en la barra de servicios. No olvides calificar el servicio ;) `,
    });
}

function errorModal(msg) {
    Modal.error({
        title: "Error",
        content: msg,
    });
}

const StepFour = (props) => {
    const classes = useStyles();
    const [rating,setRating] = useState(5.0);
    const [commentary,setCommentary] = useState("");
    const [rateService, { loading: loadingService }] = useMutation(
        RATE_SERVICE,
        {
            onCompleted: () => {
                props.setVisible(false);
                success("calificado");
            },
            onError: (error) => {
                errorModal(error.graphQLErrors[0].message);
            },
            refetchQueries: ["ServicesByUser"],
        }
    );
    const [createRating, { loading: loadingRating }] = useMutation(CREATE_RATING, {
        onCompleted: (data) => {

        },
        onError: (error) => {
            errorModal(error.graphQLErrors[0].message);
        },
    });
    const {
        _id,
        origin,
        destination,
        commentaryUser,
        commentaryDriver,
        price,
    } = props.value;

    const handleOnChange = event => {
        setCommentary(event.target.value);
    };

    const handleSubmit = async () => {
        console.log({value: rating,
            commentary: commentary,
            idDriver: props.value.idDriver,
            idVehicle: props.value.idVehicle,
            idService: _id});
        let input = {
            value: rating,
            commentary: commentary,
            idDriver: props.value.idDriver,
            idVehicle: props.value.idVehicle,
            idService: _id,
        };

        await createRating({ variables: { input }
        });
        return await rateService({
            variables: { _id: _id },
        });
    };

    return (
        <Layout className={classes.paper}>
            {(loadingService || loadingRating) && (
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
                <Row  className={classes.buttons}>
                    <Typography component="h1" variant="h5">
                        Califica el servicio
                    </Typography>
                </Row>
                <Row className={classes.buttons}>
                    <Rate
                        allowHalf
                        defaultValue={rating}
                        allowClear={false}
                        className={classes.rate}
                        onChange={setRating}
                    />
                </Row>
                <Row className={classes.buttons}>
                    <TextField
                        label="Comentarios sobre el servicio"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        multiline
                        rows={4}
                        placeholder="Menciona elementos que consideres importantes sobre el servicio recibido"
                        name="commentaryService"
                        type="text"
                        InputProps={{
                            classes: {
                                notchedOutline: classes.notchedOutline,
                                focused: classes.focused,
                            },
                        }}
                        onChange={handleOnChange}
                    />
                </Row>
                <Row gutter={16} className={classes.buttons}>
                    <Col>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleSubmit}
                        >
                            Calificar
                        </Button>
                    </Col>
                </Row>
            </form>
        </Layout>
    );
};
export default StepFour;
