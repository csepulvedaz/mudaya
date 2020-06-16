import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Col, Rate, Row} from "antd";
import Avatar from "antd/lib/avatar";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import TruckLicense from "../../header/service/TruckLicense";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "720px",
        padding: "24px 20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: theme.shadows[4],
    },
    col: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    centerRow: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    leftRow: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    rate: {
        fontSize: "20px",
        alignSelf: "stretch",        
        margin: "0 20px 20px 30px",
    },
    title: {
        alignSelf: "stretch",
        fontSize: "26px",
        color: "#3d3d3d",        
        margin: "0 0 0 20px",
    },
    paddingText: {
        paddingInline : "5px",        
        margin: "0 0 0 16px",
    },
    row: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingBlock: "5px"
    },
    avatar:{
        borderRadius:"16px",
    }
}));

const DriverRatingCard = (props) => {
    const classes = useStyles();

    return (
        <Row className={classes.root}>
            <Col span={3} className={classes.col}>
                <Row className={classes.row}>
                    <Avatar className={classes.avatar} shape="square" size={64} icon={<UserOutlined />} />
                </Row>
                <Row className={classes.row}>
                    <TruckLicense vehicleId={props.value.idVehicle} />
                </Row>
            </Col>
            <Col span={21} className={classes.col}>
                <Row className={classes.leftRow}>
                    <Typography variant="h4" className={classes.title}>
                        Calificación del servicio
                    </Typography>
                </Row>
                <Row className={classes.leftRow}>
                    <Rate
                        disabled
                        allowHalf
                        defaultValue={props.value.value}
                        allowClear={false}
                        className={classes.rate}
                    />
                </Row>
                <Row className={classes.centerRow}>
                    <TextField
                        label="Comentarios sobre el servicio"
                        size="small"
                        variant="outlined"
                        multiline
                        rows={4}
                        defaultValue={props.value.commentary}
                        disabled={true}
                        fullWidth
                        className={classes.paddingText}
                    />
                </Row>
            </Col>
        </Row>
    );
};

export default DriverRatingCard;
