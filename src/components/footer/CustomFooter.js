import React from "react";
import { Layout } from "antd";
import { makeStyles } from "@material-ui/core/styles";

const { Footer } = Layout;

const useStyles = makeStyles((theme) => {
    console.log(theme.palette.primary);
  return {
    footer: {
      textAlign: "center",
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  };
});

const CustomFooter = () => {
  const classes = useStyles();
  return (
    <Footer className={classes.footer}>
      UNIVERSIDAD NACIONAL DE COLOMBIA
      <br />
      INGENIERIA DE SOFTWARE II
      <br />
      PRAVA ©2020 Todos los derechos reservados.
      <br />
    </Footer>
  );
};

export default CustomFooter;
