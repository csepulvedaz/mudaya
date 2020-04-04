import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardService from "./CardService";
import img1 from "../../assets/ourservices1.jpg";
import img2 from "../../assets/ourservices2.jpg";
import img3 from "../../assets/ourservices3.jpg";
import img4 from "../../assets/ourservices4.jpg";

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backdropFilter: "blur(9px)",
        padding: "20px 0px",
        margin: "20px 0px",
    },
}));

const ServicesCardPanel = () => {
    const classes = useStyles();
    const services = [
        {
            img: img1,
            text: "PUBLICACIÓN",
            description: "Haz conocer tu negocio",
        },
        {
            img: img2,
            text: "EMPRESAS",
            description: "Apropiado para grandes volumenes",
        },
        {
            img: img3,
            text: "HOGARES",
            description: "Ideal para mudanzas familiares",
        },
        {
            img: img4,
            text: "LARGA DISTANCIA",
            description: "Especial para grandes recorridos",
        },
    ];
    return (
        <div className={classes.content}>
            {services.map((value) => (
                <CardService
                    image={value.img}
                    text={value.text}
                    description={value.description}
                />
            ))}
        </div>
    );
};

export default ServicesCardPanel;
