import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Row, Col } from "antd";
import { Button } from 'antd';

import TruckLicense from "./TruckLicense";

const useStyles = makeStyles({
  root: {
    width: "500px",
    height: "130px",
    margin: "-1px 25px",
    borderTop: "1px solid  #D0D0D0",
    borderBottom: "1px solid  #D0D0D0",
    background: "#FFFFFF"
  },
  image_box: {
    width: "90px",
    height: "90px",
    margin: "20px 15px 20px 15px",
    borderRadius: "4px",
    background: "#EEEEEE" // para el skeleton
  },
  content: {
    margin: "20px 0px 20px 15px",
    height: "90px"
  },
  vehicleName: {
    padding: "2px 5px",
    height: "25px",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "left",
    color: "#3d3d3d",
    borderRadius: "4px",
    //background: "#DDDDDD" // para el skeleton o ejemplo
  },
  bullet: {
    fontSize: "16px",
    display: "inline-block",
    margin: "0 3px 0px 2px",
    transform: "scale(0.8)",
    lineHeight: "1.33",
    color: "#828282"
  },
  info: {
    height: "60px",
    fontSize: "13px",
    lineHeight: "1.35",
    letterSpacing: "normal",
    textAlign: "left",
    top: "50%",
    left: "50%",
    color: "#8b8b8b",
    borderRadius: "4px",
    margin: "5px 0px 0px 0px",
    //background: "#EEEEEE" //// para el skeleton
  },
  button_background: {
    width: "84px",
    height: "90px",
    margin: "20px 10px"
  },
  button:{
    height:"30px",
    margin:"25px 0 0 8px",
    color:"#FFFFFF",
    background: "#B9B9B9",
    borderRadius:"14px",
    border:"0",
  }
});

export default function DropListElement(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.root}>
      <Row>
        <Col xs={{ span: 5 }}>
          <div className={classes.image_box}></div>
        </Col>

        <Col xs={{ span: 14 }}>
          <div className={classes.content}>
            <Typography className={classes.vehicleName}>
              {props.brand}{bull}{props.model}
            </Typography>

            <Typography className={classes.info}>
              <ul>
                <li>Origen: {props.addressOrigin}</li>
                <li>Destino: {props.addressTarget}</li>
                <li>Fecha: {props.date}</li>
              </ul>
            </Typography>
          </div>
        </Col>

        <Col xs={{ span: 1 }}>
          <div className={classes.button_background}>
            
              <Row xs={{ span: 8  }}>
                <TruckLicense vehicleId = {props.vehicleId}/>
              </Row>
              <Row xs={{ span: 8 }}>
                <Button type="primary" size="small" className={classes.button} >Ver más</Button>
              </Row>
            
          </div>
        </Col>
      </Row>
    </div>
  );
}
