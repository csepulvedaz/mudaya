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
        justifyContent: "center",
        margin: "20px 0px",
    },
    box: {
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(9px) brightness(100%) contrast(40%)",
        borderRadius: "13px",
        padding: "20px 20px",
        letterSpacing: "2px",
    },
    panel: {
        display: "flex",
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "600",
        fontSize: "22px",
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
            <div className={classes.box}>
                <h3 className={classes.title}>
                    NUESTROS SERVICIOS
                </h3>
                <div className={classes.panel}>
                    {services.map((value, index) => (
                        <CardService
                            key={index}
                            image={value.img}
                            text={value.text}
                            description={value.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesCardPanel;
