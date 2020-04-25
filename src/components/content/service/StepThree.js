import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Col, Layout, Row, Collapse } from "antd";
import { Grid, TextField, Paper, Avatar } from "@material-ui/core";

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
        background: "#FCB625",
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
        color: "#FCB625",
        fontWeight: "600",
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.16)",
    },
    collapse: { borderRadius: "5px" },
}));

const StepThree = () => {
    const classes = useStyles();
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
                        defaultValue="calle 1 # 00-00"
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
                        defaultValue="carrea 1 # 00-00"
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
                                    Comentario del cliente describiendo la
                                    situacion del servicio
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
                                    Comentario del conductor describiendo la
                                    situacion del servicio
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
                                    00.000 COP
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Row>
                <Row gutter={16} className={classes.buttons}>
                    <Col>
                        <Button
                            variant="contained"
                            // onClick={handleCancel}
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
                            // onClick={formik.handleSubmit}
                        >
                            Enviar
                        </Button>
                    </Col>
                </Row>
            </form>
        </Layout>
    );
};
export default StepThree;
