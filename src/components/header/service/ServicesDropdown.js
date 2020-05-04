import React, { useState, useContext } from "react";
import { useSubscription, useQuery } from "@apollo/client";
import { Menu, Dropdown, Button, Badge, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { makeStyles } from "@material-ui/core/styles";
import ListIcon from "@material-ui/icons/FormatListBulletedRounded";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import DropListElement from "./DropListElement";
import { SERVICE_ADDED } from "../../../graphql/subscriptions";
import { SERVICES_BY_USER } from "../../../graphql/queries";
import AuthContext from "../../../context/auth-context";

const useStyles = makeStyles({
    icon: {
        fontSize: "40px",
        color: "#6663ff",
    },
    box: {
        margin: "10px 20px",
        width: "45px",
        height: "45px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "9px",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
        backgroundColor: " #ffffff",
    },
    menu: {
        position: "fixed",
        background: "#fafafa",
        borderRadius: "7px",
        overflow: "auto",
        maxHeight: 500,
    },
});

export default function ServicesList(props) {
    const classes = useStyles();
    const [dataArray, setDataArray] = useState([]);
    const { userId } = useContext(AuthContext);
    const {
        loading: loadingServices,
        error: errorServices,
        data: dataServices,
    } = useQuery(SERVICES_BY_USER, {
        variables: { idUser: userId },
        fetchPolicy: "no-cache",
    });
    const { data } = useSubscription(SERVICE_ADDED, {
        variables: { _id: userId },
        onSubscriptionData: ({ subscriptionData }) => {
            setDataArray([...dataArray, subscriptionData]);
        },
    });

    if (loadingServices)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );
    if (errorServices) return `Error! ${errorServices}`;

    const menu = (
        <List className={classes.menu}>
            {dataServices.servicesByUser.map((value, index) => {
                return (
                    <ListItem key={index}>
                        <DropListElement value={value} />
                    </ListItem>
                );
            })}
        </List>
    );

    return (
        <Dropdown className={classes.box} overlay={menu} trigger={["click"]}>
            <Button
                icon={
                    <Badge count={dataArray.length}>
                        <ListIcon className={classes.icon} />
                    </Badge>
                }
            />
        </Dropdown>
    );
}
