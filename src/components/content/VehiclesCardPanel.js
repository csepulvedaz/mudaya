import React from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Carousel, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import CardVehicle from "./CardVehicle";
import img1 from "../../assets/van.png";
import { ALL_VEHICLES } from "../../graphql/queries";

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

const VehiclesCardPanel = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(ALL_VEHICLES);
    const props = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
    };
    if (loading)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );
    if (error) return `Error! ${error}`;

    return (
        <div className={classes.content}>
            <div className={classes.box}>
                <h3 className={classes.title}>VEHICULOS DISPONIBLES</h3>
                <div className={classes.panel}>
                    <NavigateBeforeIcon className={classes.button} />
                    <Carousel
                        id="carousel"
                        {...props}
                        arrows="true"
                        style={{
                            width: "60vw",
                            alignSelf: "center",
                        }}
                    >
                        {data.Vehicles.map((value, index) => {
                            console.log(value);

                            return (
                                <div>
                                    <CardVehicle
                                        key={index}
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
                    <NavigateNextIcon className={classes.button} />
                </div>
            </div>
        </div>
    );
};

export default VehiclesCardPanel;
