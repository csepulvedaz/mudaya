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
        padding: "20px 0px",
    },
    box: {
        display: "flex",
        justifyContent: "center",
        background: "#f5f5f5",
        borderRadius:"13px"
    },
}));

const VehiclesCardPanel = () => {
    const classes = useStyles();
    const title = "Título del vehículo";
    const capacity = "XX";
    const vehicleHeight = "YY";
    return (
        <div className={classes.content}>
            <div className={classes.box}>
                <CardVehicle
                    image={img1}
                    title={title}
                    capacity={capacity}
                    vehicleHeight={vehicleHeight}
                />
                <CardVehicle
                    image={img1}
                    title={title}
                    capacity={capacity}
                    vehicleHeight={vehicleHeight}
                />
                <CardVehicle
                    image={img1}
                    title={title}
                    capacity={capacity}
                    vehicleHeight={vehicleHeight}
                />
                <CardVehicle
                    image={img1}
                    title={title}
                    capacity={capacity}
                    vehicleHeight={vehicleHeight}
                />
                <CardVehicle
                    image={img1}
                    title={title}
                    capacity={capacity}
                    vehicleHeight={vehicleHeight}
                />
                <CardVehicle
                    image={img1}
                    title={title}
                    capacity={capacity}
                    vehicleHeight={vehicleHeight}
                />
            </div>
        </div>
    );
};

export default VehiclesCardPanel;
