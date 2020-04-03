import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      //backgroundColor: theme.palette.secondary.main,
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      width: theme.spacing(9),
      height: theme.spacing(9)
    },
    back: {
      //backgroundColor: "blue",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 6,
      height: 100,
      width: 400
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
      
    }
  }));

  const Profile = () =>{
    const classes = useStyles();
    let history = useHistory();

    const toMain = () => {
        history.push("/principal");
    };

    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Box
              className={classes.back}
              zIndex="modal"
              position="absolute"
              top={50}
            />
            <Box zIndex="tooltip">
              <Avatar className={classes.avatar} />
            </Box>
            <Typography component="h1" variant="h5">
              Perfil
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    disabled = "true"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                    autoComplete="lname"
                    disabled = "true"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Correo"
                    name="email"
                    autoComplete="email"
                    disabled = "true"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="identification"
                    label="Identificación"
                    id="identification"
                    autoComplete="current-identification"
                    disabled = "true"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="cellphone"
                    label="Telefono"
                    id="cellphone"
                    autoComplete="current-cellphone"
                    disabled = "true"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Editar
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={toMain}
              >
                Pagina Principal
              </Button>
              <Grid container justify="flex-end" />
            </form>
          </div>
        </Container>
      );
  }

  export default Profile;