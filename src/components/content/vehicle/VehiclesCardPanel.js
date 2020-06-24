import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Carousel } from "antd";

import CardVehicle from "./CardVehicle";
import img1 from "../../../assets/van.png";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    background: "#fff",
    //backdropFilter: "contrast(80%)",
    borderTop: `1px ${theme.palette.colorGrey.border} solid !important`,
    display: "flex",
    justifyContent: "center",
    paddingBottom: "20px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "13px",
    padding: "20px 20px",
  },
  panel: {
    borderRadius: "13px",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    color: theme.palette.colorGrey.text,
    fontWeight: "600",
    fontSize: "22px",
    marginTop: "16px",
    marginBottom: "32px",
  },
  button_r: {
    borderRadius: "0px 8px 8px 0px",
    background: theme.palette.primary.main,
    fontWeight: "600",
    color: "#fff",
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
    fontSize: "60px",
    alignSelf: "center",
    width: "40px",
    height: "70px",
  },
  button_l: {
    borderRadius: "8px 0px 0px 8px",
    background: theme.palette.primary.main,
    fontWeight: "600",
    color: "#fff",
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
    fontSize: "60px",
    alignSelf: "center",
    width: "40px",
    height: "70px",
  },
  spin: {
    position: "absolute",
    top: "50%",
    left: "40%",
  },
  carousel_box: {
    boxShadow: "inset 15px -15px 30px #f2f2f2,inset -15px 15px 30px #f2f2f2",
    borderRadius: "16px",
  },
}));

const VehiclesCardPanel = (props) => {
  const classes = useStyles();

  const size = props.vehicles.length;

  const carouselprops = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: size > 4 ? 4 : size,
    slidesToScroll: size > 4 ? 4 : size,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={classes.content}>
      <div className={classes.box}>
        <h3 className={classes.title}>VEHICULOS DISPONIBLES</h3>
        <div className={classes.panel}>
          {size > 4 && <NavigateBeforeIcon className={classes.button_l} />}
          <Carousel
            className={classes.carousel_box}
            id="carousel"
            {...carouselprops}
            arrows="true"
            style={{
              width: "80vw",
              alignSelf: "center",
            }}
          >
            {props.vehicles.map((value, index) => {
              return (
                <div key={index}>
                  <CardVehicle
                    image={img1}
                    type={value.type}
                    capacity={value.capacity}
                    dimensions={value.dimensions}
                    value={value}
                  />
                </div>
              );
            })}
          </Carousel>
          {size > 4 && <NavigateNextIcon className={classes.button_r} />}
        </div>
      </div>
    </div>
  );
};

export default VehiclesCardPanel;
