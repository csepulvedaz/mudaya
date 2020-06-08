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
        padding: "30px 0px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: theme.shadows[4],
    },
    col: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
    rate: {
        fontSize: "25px",
    },
    title: {
        fontSize: "30px",
        textAlign: "center",
        color: "#3d3d3d",
    },
    paddingText: {
        paddingInline : "5px",
    },
    row: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingBlock: "5px"
    },
}));

const DriverRatingCard = (props) => {
    const classes = useStyles();

    return (
        <Row className={classes.root}>
            <Col span={3} className={classes.col}>
                <Row className={classes.row}>
                    <TruckLicense vehicleId={props.value.idVehicle} />
                </Row>
                <Row className={classes.row}>
                    <Avatar shape="square" size={64} icon={<UserOutlined />} />
                </Row>
            </Col>
            <Col span={21} className={classes.col}>
                <Row className={classes.centerRow}>
                    <Typography variant="h4" className={classes.title}>
                        Calificación del servicio
                    </Typography>
                </Row>
                <Row>
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
                        margin="none"
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
