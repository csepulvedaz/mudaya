import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import DetailsIcon from "@material-ui/icons/Details";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import {
  Grid,
  Box,
  TextField,
  Paper,
  Avatar,
  Divider,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    form: {
      width: "100%" // Fix IE 11 issue.
    },
    data: {
      backgroundColor: "#C0CFD1",
      padding: theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      backgroundColor: "#C0CFD1"
    }
  }));

  const StepThree =()=>{
    const classes = useStyles();
    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xs">
            <Typography variant="h4" color="textSecondary">
              Precio del servicio
            </Typography>
            <Paper className={classes.data}>
              <form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <PopupState variant="popover" popupId="detalle-vehiculo">
                      {popupState => (
                        <div>
                          <Button
                            fullWidth
                            color="primary"
                            endIcon={<DetailsIcon />}
                            size="large"
                            variant="contained"
                            {...bindTrigger(popupState)}
                          >
                            MARCA-MODELO
                          </Button>
                          <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center"
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center"
                            }}
                          >
                            <Box p={5} >
                              <ul>
                                <li>Capacidad:0000</li>
                                <li>Altura:0000</li>
                                <li>Alcance:0000</li>
                                <li>ejes:0000</li>
                              </ul>
                            </Box>
                          </Popover>
                        </div>
                      )}
                    </PopupState>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      size="small"
                      margin="none"
                      label="Origen"
                      defaultValue="calle 1 # 00-00"
                      disabled={true}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      size="small"
                      margin="none"
                      label="Destino"
                      defaultValue="carrea 1 # 00-00"
                      disabled={true}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Paper className={classes.paper} elevation={5}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar>C</Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography color="textSecondary">
                        Comentario del cliente describiendo la situacion del
                        servicio
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <Paper className={classes.paper} elevation={5}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar>D</Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography color="textSecondary">
                        Comentario del conductor describiendo la situacion del
                        servicio
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <Divider variant="middle" />
                <Paper className={classes.paper} elevation={0}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Typography variant="h6" color="textSecondary">
                        Precio:
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h4" color="textSecondary">
                        00.000 COP
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            </Paper>
          </Container>
        </React.Fragment>
      );
  };
  export default StepThree;