import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardServicesOffered from "./CardServicesOffered";
import img1 from "../../../assets/ourservices1.jpg";
import img2 from "../../../assets/ourservices2.jpg";
import img3 from "../../../assets/ourservices3.jpg";
import img4 from "../../../assets/ourservices4.jpg";
import waves from "../../../assets/waves-bg.png";

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "50px 0px",
        background: `url(${waves}) no-repeat 50% 100%`,
        backgroundSize: "1600px 250px",
        backgroundPositionY: "90%",
    },
    box: {
        width: "90%",
        display: "flex",
        flexDirection: "column",
        //backdropFilter: "blur(9px) contrast(80%)",
        // background:theme.palette.secondary.light,
        //borderRadius: "13px",
        padding: "20px 20px",
    },
    title: {
        textAlign: "center",
        color: theme.palette.colorGrey.text,
        fontWeight: "600",
        fontSize: "22px",
        marginBottom: "42px",
    },
}));

const ServicesOfferedCardPanel = () => {
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
                <h3 className={classes.title}>NUESTROS SERVICIOS</h3>
                <Grid container direction="row" justify="center" spacing={3}>
                    {services.map((value, index) => (
                        <Grid
                            key={index}
                            item
                            xs
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <CardServicesOffered
                                key={index}
                                image={value.img}
                                text={value.text}
                                description={value.description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default ServicesOfferedCardPanel;
