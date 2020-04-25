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
        // background: "#fff",
        backdropFilter: "contrast(80%)",
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
        color: "#ffffff",
        fontWeight: "600",
        fontSize: "22px",
    },
    button: {
        borderRadius: "9px",
        background: "#FCB625",
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
    };

    return (
        <div className={classes.content}>
            <div className={classes.box}>
                <h3 className={classes.title}>VEHICULOS DISPONIBLES</h3>
                <div className={classes.panel}>
                    {size > 4 && (
                        <NavigateBeforeIcon className={classes.button} />
                    )}
                    <Carousel
                        id="carousel"
                        {...carouselprops}
                        arrows="true"
                        style={{
                            width: "60vw",
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
                                        stars={2}
                                        value={value}
                                    />
                                </div>
                            );
                        })}
                    </Carousel>
                    {size > 4 && (
                        <NavigateNextIcon className={classes.button} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default VehiclesCardPanel;
