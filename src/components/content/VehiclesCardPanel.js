import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardVehicle from "./CardVehicle";
import img1 from "../../assets/van.png";

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
    },
    box: {
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: "20px 20px",
        letterSpacing: "2px",
    },
    panel: {
        background: "#f5f5f5",
        borderRadius: "13px",
        display: "flex",
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        color: "#3d3d3d",
        fontWeight: "bold",
        fontSize: "22px",
    },
}));

const VehiclesCardPanel = () => {
    const classes = useStyles();
    const vehicles = [
        {
            img: img1,
            title: "Van",
            capacity: "10",
            vehicleHeight: "3",
            stars: 1,
        },{
            img: img1,
            title: "Camión",
            capacity: "8",
            vehicleHeight: "2.5",
            stars: 4,
        },{
            img: img1,
            title: "Tractomula",
            capacity: "5",
            vehicleHeight: "3",
            stars: 3.5,
        },{
            img: img1,
            title: "Camioneta",
            capacity: "7",
            vehicleHeight: "3",
            stars: 5,
        },{
            img: img1,
            title: "Van",
            capacity: "4",
            vehicleHeight: "2",
            stars: 1.5,
        },
    ];
    return (
        <div className={classes.content}>
            <div className={classes.box}>
                <h3 className={classes.title} gutterBottom={true}>
                    VEHICULOS DISPONIBLES
                </h3>
                <div className={classes.panel}>
                    {vehicles.map((value, index) => (
                        <CardVehicle
                            image={value.img}
                            title={value.title}
                            capacity={value.capacity}
                            vehicleHeight={value.vehicleHeight}
                            stars={value.stars}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VehiclesCardPanel;
