import React, { useContext, useState } from "react";
import { Button, Layout, Drawer } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import AuthContext from "../../context/auth-context";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ServicesDropdown from "./service/ServicesDropdown";
import Notification from "./Notification";
import logo from "../../assets/logo-header.png";

const { Header } = Layout;

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    position: "fixed",
    width: "100%",
    background: "#fff",
    height: "auto",
    zIndex: "1",
    padding: "0px 20px",
    border: `1px ${theme.palette.colorGrey.border} solid !important`,
  },
  logo_box: {
    display: "flex",
    flexDirection: "column",
    paddingLeft:"36px",
    width: "150px",
    height: "45px",
    backgroundColor: "#fff",
    margin: "10px 50px 10px 0px",
    //paddingLeft: "35px",
    //paddingTop: "10px",
  },
  logo: {
    width:"77.5px",
    height:"18px",
    marginTop:"8px",
  },
  conductores: {
    fontSize: "11px",
    fontWeight: "100",
    lineHeight: "1",
    textAlign: "left",
    color: "#b9b9b9",
    letterSpacing: "2px",
    marginTop:"5px",
  },
  box: {
    width: "45px",
    height: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    border: `1px ${theme.palette.colorGrey.border} solid !important`,
    "&:hover": {
      border: `1px ${theme.palette.primary.light} solid !important`,
      boxShadow: theme.shadows[2],
    },
  },
  icon_profile: {
    fontSize: "35px",
    color: theme.palette.grey[500],
    "&:hover": {
      color: theme.palette.grey[700],
    },
  },
  icon_exit: {
    fontSize: "35px",
    color: theme.palette.grey[500],
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
  button_publish: {
    height: "45px",
    margin: "10px 20px",
    borderRadius: "9px",
    background: theme.palette.primary.main,
    fontWeight: "600",
    color: "#fff",
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
    fontSize: "16px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const CustomHeader = () => {
  const [navigate, setNavigate] = useState(false);
  const [visibleProfile, setVisibleProfile] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const { logout, client } = useContext(AuthContext);
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.clear("token");
    logout();
    setNavigate(true);
  };

  if (navigate) return <Redirect to="/" push={true} />;
  return (
    <>
      <Header theme="light" className={classes.header}>
        <div className={classes.container}>
          
          <div className={classes.logo_box}>
            <img
              src={logo}
              className={classes.logo}
              alt="Prava Logo"
            />
            {client === "driver" && (
              <Typography
                variant="body2"
                color="textPrimary"
                component="p"
                className={classes.conductores}
                gutterBottom={true}
              >
                CONDUCTORES
              </Typography>
            )}
            {client === "user" && (
              <Typography
                variant="body2"
                color="textPrimary"
                component="p"
                className={classes.conductores}
                gutterBottom={true}
              >
                ACARREOS
              </Typography>
            )}
          </div>
          <Button
            icon={<PersonIcon className={classes.icon_profile} />}
            className={classes.box}
            onClick={() => {
              setVisibleProfile(true);
            }}
          />
          {client === "user" && <ServicesDropdown />}
        </div>
        <div className={classes.container}>
          {client === "driver" && <Notification />}
          <Button
            className={classes.button_publish}
            // onClick={() => alert("Vehiculo presionado")}
          >
            PUBLICA TU VEHICULO
          </Button>
          <Button
            icon={
              <ExitToAppIcon
                className={classes.icon_exit}
                style={{ fontSize: "30px" }}
              />
            }
            className={classes.box}
            onClick={handleLogout}
          />
        </div>
      </Header>
      <Drawer
        placement="left"
        width={500}
        closable={false}
        onClose={() => setVisibleProfile(false)}
        visible={visibleProfile}
      >
        {!visibleEdit && (
          <Profile
            setVisibleProfile={setVisibleProfile}
            setVisibleEdit={setVisibleEdit}
          />
        )}
        {visibleEdit && <EditProfile setVisibleEdit={setVisibleEdit} />}
      </Drawer>
    </>
  );
};

export default CustomHeader;
