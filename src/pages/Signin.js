import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Modal from "../components/signin/Modal";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

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
        margin: theme.spacing(2, 0, 0),
    },
    truck: {
        fontSize: "50px",
        color: "#ccc",
    },
}));

const CREATE_USER = gql`
    mutation CreateUser(
        $_id: Int!
        $name: String!
        $surname: String!
        $phone: Int!
        $email: String!
        $password: String!
    ) {
        createUser(
            _id: $_id
            name: $name
            surname: $surname
            phone: $phone
            email: $email
            password: $password
        ) {
            _id
            name
            surname
            phone
            email
            password
        }
    }
`;

const q = gql`
    {
        Users {
            _id
            name
            surname
            phone
            email
            password
        }
    }
`;

const SignUp = (props) => {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDriver, setIsDriver] = useState(false);
    const [visible, setVisible] = useState(false);
    const [createUser, { dat }] = useMutation(CREATE_USER);
    const classes = useStyles();
    let history = useHistory();

    const { loading, error, data } = useQuery(q);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data);

    const toMain = () => {
        createUser({
            variables: {
                _id: id,
                name: name,
                surname: surname,
                phone: phone,
                email: email,
                password: password,
            },
        });
        history.push("/principal");
    };

    const openModal = () => {
        setVisible(true);
    };

    const handleCheckbox = () => {
        setIsDriver(!isDriver);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <LocalShippingIcon className={classes.truck} />
                <Typography component="h1" variant="h5">
                    Registro
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Nombre"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Apellido"
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Cédula"
                                onChange={(e) => setId(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Número celular"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Correo electrónico"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Contraseña"
                                // type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        checked={!isDriver}
                                        onChange={handleCheckbox}
                                    />
                                }
                                label="Soy Cliente"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        checked={isDriver}
                                        onChange={handleCheckbox}
                                    />
                                }
                                label="Soy Conductor"
                            />
                        </Grid>
                    </Grid>
                </form>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={isDriver ? openModal : toMain}
                >
                    Registrarse
                </Button>
                <Modal visible={visible} />
            </div>
        </Container>
    );
};

export default SignUp;
