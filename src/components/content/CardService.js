import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import illustration1 from "../../assets/ourservices1.jpg";  

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
    width: "187px",
    height: "250px",
    boxShadow: "0 6px 4px 0 rgba(0, 0, 0, 0.16)",
    backgroundColor: "#ffffff",
    margin: "10px 25px",
  },
  cardTitle: {
    width: "135px",
    height: "43px",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.33",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#505050",
  },
  cardText:{
    width: "135px",
    height: "46px",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.33",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#8a8a8a",
    margin: "0px 0px 10px 0px",
  },
  media: {
    height:"120px",
    width: "135px",
    margin: "0px 0px 16px 0px",
  },
});

export default function CardService() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <div>
          <Typography className={classes.cardTitle} >
            {/*this.props.serviceCards.title*/}
            PUBLICACIÓN DE VEHÍCULO
          </Typography>

          <CardMedia
              className={classes.media}
              /*this.props.serviceCards.imageSource*/
              /*this.props.serviceCards.imageTitle*/
              image={illustration1}
              title="Ilustration 1"
          />

          <Typography className={classes.cardText} >
            {/*this.props.serviceCards.text*/}
            Haz conocer tu negocio
          </Typography>
        </div>
      </CardContent>
      
      
    </Card>
  );
}