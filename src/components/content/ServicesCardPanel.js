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
        margin:"20px 0px"
    },
}));

const ServicesCardPanel = () => {
    const classes = useStyles();
    const text1 = "PUBLICACIÓN";
    const text2 = "EMPRESAS";
    const text3 = "HOGARES";
    const text4 = "LARGA DISTANCIA";
    const describe1 = "Haz conocer tu negocio";
    const describe2 = "Apropiado para grandes volumenes";
    const describe3 = "Ideal para mudanzas familiares";
    const describe4 = "Especial para grandes recorridos";
    return (
        <div className={classes.content}>
            <CardService image={img1} text={text1} describe={describe1}/>
            <CardService image={img2} text={text2} describe={describe2}/>
            <CardService image={img3} text={text3} describe={describe3}/>
            <CardService image={img4} text={text4} describe={describe4}/>
        </div>
    );
};

export default ServicesCardPanel;
