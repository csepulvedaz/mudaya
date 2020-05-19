import React, { useContext, useState } from "react";
import { Button, Layout, Drawer } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_LOGOUT_TIME_DRIVER, UPDATE_LOGOUT_TIME_USER} from "../../graphql/mutations";
import { SERVICES_BY_DATE_UPDATED, SERVICES_BY_DATE_CREATED } from "../../graphql/queries";
import { LoadingOutlined } from "@ant-design/icons";
import AuthContext from "../../context/auth-context";
import { Spin,Modal } from "antd";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ServicesDropdown from "./service/ServicesDropdown";
import Notification from "./Notification";

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
    border: "solid 0.5px #c2c2c2",
  },
  logo: {
    width: "150px",
    height: "45px",
    borderRadius: "25px",
    backgroundColor: "#ffffff",
    margin: "10px 50px 10px 0px",
    paddingLeft: "35px",
    paddingTop: "10px",
  },
  prava: {
    fontSize: "26px",
    fontWeight: "bold",
    lineHeight: "0.5",
    textAlign: "left",
    color: theme.palette.primary.main,
  },
  conductores: {
    fontSize: "11px",
    fontWeight: "100",
    lineHeight: "1",
    textAlign: "left",
    color: "#b9b9b9",
    letterSpacing: "2px",
  },
  box: {
    width: "45px",
    height: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0px",
    borderRadius: "8px",
    backgroundColor: " #fff",
    border: "2px #cecece solid !important",
    "&:hover": {
      border: `2px ${theme.palette.primary.light} solid !important`,
      boxShadow: theme.shadows[2],
    },
  },
  icon: {
    fontSize: "35px",
    color: theme.palette.primary.main,
  },
  icon_list: {
    fontSize: "35px",
    color: theme.palette.primary.main,
  },
  button: {
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
function errorModal(msg) {
  Modal.error({
      title: "Error",
      content: msg,
  });
}

const CustomHeader = () => {
  const context = useContext(AuthContext);
  const [navigate, setNavigate] = useState(false);
  const [visibleProfile, setVisibleProfile] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const { logout, client } = useContext(AuthContext);
  const classes = useStyles();

  const [updateLastLogout] = useMutation(
    context.client==="user" ? UPDATE_LOGOUT_TIME_USER : UPDATE_LOGOUT_TIME_DRIVER,

  );
  let dataServicesCreated=0;
  const {loading:loadCreate, data} = useQuery(
    SERVICES_BY_DATE_CREATED,
    {
      variables:{_id:context.userId},
      skip: context.client==="user",
      onError: (error) =>{
        errorModal(error.graphQLErrors[0].message);
      },
    },
  );
  if(context.client==="driver"){
    dataServicesCreated=data;
  }
  

  
  const {loading:loadUpdate,data:dataServicesUpdated} = useQuery(
    SERVICES_BY_DATE_UPDATED,
    {
      variables:{_id:context.userId,client:context.client},
      onError: (error) =>{
        errorModal(error.graphQLErrors[0].message);
      },
    },
  );
  if (loadUpdate)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSFize: 40 }} spin />}
                className={classes.spin}
            />
        );
        
  if (loadCreate)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSFize: 40 }} spin />}
                className={classes.spin}
            />
        );
  const servicesUpdated = dataServicesUpdated.servicesByDateUpdated;
  const servicesCreated = dataServicesCreated.servicesByDateCreated;
  //console.log(servicesUpdated.length)
  //console.log(servicesCreated)
  
  
  
          
  const handleLogout = () => {
    const _id = context.userId
    updateLastLogout({
      variables:{_id:_id},
    })
    localStorage.clear("token");
    logout();
    setNavigate(true);
  };

  if (navigate) return <Redirect to="/" push={true} />;
  return (
    <>
      <Header theme="light" className={classes.header}>
        <div className={classes.container}>
          <div className={classes.logo}>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              component="p"
              className={classes.prava}
              gutterBottom={true}
            >
              PRAVA
            </Typography>
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
            icon={<PersonIcon className={classes.icon} />}
            className={classes.box}
            onClick={() => {
              setVisibleProfile(true);
            }}
          />
          {client === "user" && <ServicesDropdown />}
        </div>
        <div className={classes.container}>
          {client === "driver" && <Notification
            serviceCreate={servicesCreated}
            serviceUpdate={servicesUpdated}  
          />}
          <Button
            className={classes.button}
            // onClick={() => alert("Vehiculo presionado")}
          >
            PUBLICA TU VEHICULO
          </Button>
          <Button
            icon={
              <ExitToAppIcon
                className={classes.icon}
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
