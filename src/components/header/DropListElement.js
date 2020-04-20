import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from 'antd';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import img from "../../assets/van.png";
import { Row, Col } from 'antd';

const useStyles = makeStyles({
    root: {
        width: "190px",
        height: "230px",
        margin: "10px 25px",
        borderRadius: "9px",
    },
    cardTitle: {
        height: "40px",
        fontFamily: "SegoeUI",
        fontSize: "30px",
        fontWeight: "normal",
        lineHeight: "1.33",
        letterSpacing: "normal",
        textAlign: "center",
        color: "#3d3d3d",
    },
    media: {
        height: "111px",
        width: "111px",
        margin: "30px 30px",
        borderRadius: "4px",    
    },
    bullet: {
        fontSize: "30px",
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
        fontFamily: "SegoeUI",
        lineHeight: "1.33",
        color: "#828282",
    },
    info: {
        height: "27px",
        fontFamily: "SegoeUI",
        fontSize: "20px",
        fontWeight: "normal",
        lineHeight: "1.35",
        letterSpacing: "normal",
        textAlign: "left",
        color: "#8b8b8b",
    },
});

export default function DropListElement(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Row>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <CardMedia
                            className={classes.media}
                            image={{img}}
                            title="img"
                        />
                    </Col>
                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
      
                        <Typography className={classes.cardTitle}>
                            {/*props.brand*/}MARCA{bull}MODELO {/*props.model*/}
                        </Typography>

                        <Typography className={classes.info}>
                            <ul>
                                <li>
                                    Origen: Calle 86 #95 F - 16-apto-578
                                </li>
                                <li>
                                    Destino: Cra 68 #69 - 71
                                </li>
                                <li>
                                    Fecha: jue 24 - Mar - 21
                                </li>
                            </ul>
                        </Typography>
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <p>Card buttons</p>
                    </Col>
                </Row>
            </CardContent>
        </Card>
    );
}
