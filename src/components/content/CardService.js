import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
    root: {
        width: "190px",
        height: "230px",
        margin: "10px 25px",
        borderRadius: "9px",
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

export default function CardService(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={4}>
            <CardContent>
                <Typography className={classes.cardTitle}>
                    {props.text}
                </Typography>

                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="img"
                />

                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    align="center"
                >
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
}
