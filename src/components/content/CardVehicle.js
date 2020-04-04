import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { CardActionArea } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "170px",
        height: "180px",
        margin: "10px 25px",
        borderRadius: "9px",
    },
    media: {
        height: 50,
        marginTop: "15px",
    },
});

export default function CardVehicle(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={4}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="img"
                />
            </CardActionArea>
            <CardContent>
                <Typography
                    variant="subtitle1"
                    color="textPrimary"
                    component="p"
                >
                    {props.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    - Capacidad: {props.capacity}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    - Altura: {props.vehicleHeight}
                </Typography>
            </CardContent>
        </Card>
    );
}
