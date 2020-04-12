import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CardVehicle from "./CardVehicle";
import img1 from "../../assets/van.png";
import {ALL_VEHICLES} from "../../graphql/querys";
import {Carousel} from "antd";
import {useQuery} from "@apollo/client";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        // background: "#fff",
        backdropFilter: "opacity(60%) contrast(80%)",
        display: "flex",
        justifyContent: "center",
        paddingBottom: "20px",
    },
    box: {
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(9px) opacity(70%) contrast(30%)",
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
        height: "70px"
    },
}));

const VehiclesCardPanel = () => {
    const classes = useStyles();
    const {loading, data} = useQuery(ALL_VEHICLES);
    const props = {
        dots: false,
        infinite: true,
        // autoplaySpeed: 10000,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1
    };
    if (loading) return null;
    return (
        <div className={classes.content}>
            <div className={classes.box}>
                <h3 className={classes.title}>VEHICULOS DISPONIBLES</h3>
                <div className={classes.panel}>
                    <NavigateBeforeIcon className={classes.button} />
                    <Carousel
                        id="carousel"
                        // autoplay
                        {...props}
                        arrows="true"
                        style={{
                            width: "60vw",
                            alignSelf: "center",
                        }}
                    >
                        {data.Vehicles.map((value, index) => (
                            <CardVehicle
                                key={index}
                                image={img1}
                                type={value.type}
                                capacity={value.capacity}
                                dimensions={value.dimensions}
                                stars={2}
                                value={value}
                            />
                        ))}
                    </Carousel>
                    <NavigateNextIcon className={classes.button} />
                </div>
            </div>
        </div>
    );
};

export default VehiclesCardPanel;
