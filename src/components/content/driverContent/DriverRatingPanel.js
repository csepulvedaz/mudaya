import React, {useContext} from "react";
import {useQuery} from "@apollo/client";
import {Spin} from "antd";
import {makeStyles} from "@material-ui/core/styles";
import {LoadingOutlined} from "@ant-design/icons";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import DriverRatingCard from "./DriverRatingCard";
import {RATINGS_BY_DRIVER} from "../../../graphql/queries";
import AuthContext from "../../../context/auth-context";
import NoElements from "./NoElements";

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingBottom: "20px",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0px",
    },
    panel: {
        borderRadius: "13px",
        display: "flex",
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: "24px",
        fontWeight: "bold",
    },
    spin: {
        position: "absolute",
        top: "50%",
        left: "55%",
    },
    list: {},
    listItem: {
        padding: "10px",
    },
    boxTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50px",
        width: "250px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0px 60px 60px 0px",
        alignSelf: "stretch",
        marginBottom: "20px",
    },
}));

const DriverRatingPanel = (props) => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const {
        loading: loadingRatings,
        error: errorRatings,
        data: dataRatings,
    } = useQuery(RATINGS_BY_DRIVER, {
        variables: { idDriver: context.userId },
        fetchPolicy: "no-cache",
    });

    if (loadingRatings)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );

    if (errorRatings) return `Error! ${errorRatings}`;

    const ratings = dataRatings.ratingsByDriver;

    return (
        <div className={classes.content}>
            <div className={classes.boxTitle}>
                <Typography className={classes.title}>Valoraciones</Typography>
            </div>
            <div className={classes.panel}>
                <List className={classes.list}>
                    {ratings.length === 0 && (
                        <NoElements element ={"valoraciones"}></NoElements>
                    )}
                    {ratings &&
                    ratings.map((value, index) => {
                        return (
                            <div key={index} className={classes.listItem}>
                                <DriverRatingCard
                                    value={value}
                                />
                            </div>
                        );
                    })}
                </List>
            </div>
        </div>
    );
};

export default DriverRatingPanel;
