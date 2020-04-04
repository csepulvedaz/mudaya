import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import img from "../../assets/ourservices1.jpg";

const useStyles = makeStyles({
    root: {
        width: "190px",
        margin: "10px 25px",
        height:"230px",
        borderRadius:"9px"
    },
    cardTitle: {
        fontSize: "15px",
        fontWeight: "bold",
        lineHeight: "1.33",
        textAlign: "center",
        color: "#505050",
    },
    media: {
        height: "100px",
        // width: "135px",
        margin: "20px 5px",
        borderRadius: "9px",
    },
});

export default function CardService() {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={4}>
            <CardContent className={classes.content}>
                <Typography className={classes.cardTitle}>
                    {/*this.props.serviceCards.title*/}
                    PUBLICACIÓN DE VEHÍCULO
                </Typography>

                <CardMedia
                    className={classes.media}
                    /*this.props.serviceCards.imageSource*/
                    /*this.props.serviceCards.imageTitle*/
                    image={img}
                    title="img"
                />

                <Typography variant="body2" color="textSecondary" component="p">
                    {/*this.props.serviceCards.text*/}
                    Haz conocer tu negocio
                </Typography>
            </CardContent>
        </Card>
    );
}
