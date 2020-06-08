import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Collapse, Layout, Rate, Row, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {Avatar, Grid, Paper, TextField} from "@material-ui/core";
import {useQuery} from "@apollo/client";
import {RATING_BY_SERVICE} from "../../../graphql/queries";

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
        fontSize: "25px",
    },
}));

const StepFive = (props) => {
    const classes = useStyles();
    const {
        _id,
        origin,
        destination,
        commentaryUser,
        commentaryDriver,
        price,
    } = props.value;

    const {
        loading: loadingRating,
        error: errorRating,
        data: dataRating,
    } = useQuery(RATING_BY_SERVICE, {
        variables: { idService: _id },
        fetchPolicy: "no-cache",
    });

    if (loadingRating)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );

    if (errorRating) return `Error! ${errorRating}`;

    return (
        <Layout className={classes.paper}>
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
                                <Avatar>C</Avatar>
                            </Grid>
                            <Grid item xs>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    {commentaryUser}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Row>
                <Row className={classes.rows}>
                    <Paper className={classes.commentary} elevation={2}>
                        <Grid container wrap="nowrap" spacing={1}>
                            <Grid item>
                                <Avatar>D</Avatar>
                            </Grid>
                            <Grid item>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    {commentaryDriver}
                                </Typography>
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
                        Calificación del servicio
                    </Typography>
                </Row>
                <Row className={classes.buttons}>
                    <Rate
                        disabled
                        allowHalf
                        defaultValue={dataRating.ratingByService.value}
                        allowClear={false}
                        className={classes.rate}
                    />
                </Row>
                <Row className={classes.buttons}>
                    <TextField
                        label="Comentarios sobre el servicio"
                        size="small"
                        variant="outlined"
                        margin="none"
                        multiline
                        rows={4}
                        defaultValue={dataRating.ratingByService.commentary}
                        disabled={true}
                        fullWidth
                    />
                </Row>
            </form>
        </Layout>
    );
};
export default StepFive;
