import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import CustomFooter from "../components/footer/CustomFooter";

const { Content } = Layout;

const useStyles = makeStyles((theme) => {
  return {
    content: {
        textAlign: "center",
        background: "#fcfcfc",
        height:"614px",
        backgroundSize: "cover",
        zIndex: 0,
    },
    title:{
        color: theme.palette.primary.main,
        fontSize: "200px",
        fontWeight:"bold",
    },
    body:{

    }
  };
});

// import PageNotFound from "../assets/images/PageNotFound";
const NotFound = () => {
  const classes = useStyles();
  return (
    <Layout theme="light" className={classes["@global"]}>
      {/* <img
            src={PageNotFound}
            style={{
                width: 400,
                height: 400,
                display: "block",
                margin: "auto",
                position: "relative",
            }}
            alt="Not found 404"
        /> */}
        <Content className={classes.content}>
            <Typography
                variant="subtitle2"
                component="p"
                className={classes.title}
                gutterBottom={true}
                >
                404
            </Typography>
            <center>
                <Link to="/">Regresar a la página principal</Link>
            </center>
        </Content>
        <CustomFooter />
    </Layout>
  );
};
export default NotFound;
