import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { Link } from "react-router-dom";
import { Modal } from "antd";

const useStyles = makeStyles(theme => ({
    check: {
        fontSize: "30px",
        color: "#52c41a",
        marginRight: "10px"
    },
    modalText: {
        display: "flex",
        alignItems: "center"
    },
    link: { textDecoration: "none", color: "#fff", marginRight: "10px" }
}));

const Login = props => {
    const classes = useStyles();

    return (
        <Modal
            visible={props.visible}
            closable={false}
            title={
                <div className={classes.modalText}>
                    <CheckCircleOutlineRoundedIcon className={classes.check} />
                    <Typography component="h1" variant="h5">
                        Proceso exitoso
                    </Typography>
                </div>
            }
            footer={[
                <Link to="/principal" key="back" className={classes.link}>
                    <Button variant="contained" className={classes.submit}>
                        Ahora no
                    </Button>
                </Link>,
                <Link to="/vehiculo" key="submit" className={classes.link}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Si
                    </Button>
                </Link>
            ]}
        >
            <Typography component="h2">
                ¿Desea registrar su vehiculo?
            </Typography>
        </Modal>
    );
};

export default Login;
