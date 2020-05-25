import React, { useState, useContext } from "react";
import { useSubscription } from "@apollo/client";
import { Menu, Dropdown, Button, Badge } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsNoneTwoToneIcon from "@material-ui/icons/NotificationsNoneTwoTone";

import { SERVICE_ADDED, SERVICE_UPDATED } from "../../graphql/subscriptions";
import AuthContext from "../../context/auth-context";

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: "32px",
        color: theme.palette.warning.main,
    },
    box: {
        width: "45px",
        height: "45px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px 0px",
        borderRadius: "8px",
        backgroundColor: " #fff",
        border: `1px ${theme.palette.colorGrey.border} solid !important`,
        "&:hover": {
            border: `1px ${theme.palette.primary.light} solid !important`,
            boxShadow: theme.shadows[2],
        },
    },
}));

export default function Notification(props) {
    const classes = useStyles();
    const [textItem, setTextItem] = useState([]);
    const [count, setCount] = useState(
        props.serviceCreate.length + props.serviceUpdate.length
    );
    const { userId } = useContext(AuthContext);
    const { loading: loadingCreated } = useSubscription(SERVICE_ADDED, {
        variables: { _id: userId },
        onSubscriptionData: ({ subscriptionData }) => {
            // console.log(subscriptionData.data.serviceAdded);
            setCount(count + 1);
            setTextItem([...textItem, "Nuevo servicio solicitado"]);
        },
    });
    const { loading: loadingUpdated } = useSubscription(SERVICE_UPDATED, {
        variables: { _id: userId },
        onSubscriptionData: ({ subscriptionData }) => {
            // console.log(subscriptionData.data.serviceUpdate);
            setCount(count + 1);
            setTextItem([...textItem, "Servicio Actualizado"]);
        },
    });

    const menu = (
        <Menu>
            {!loadingCreated &&
                !loadingUpdated &&
                textItem.map((value, index) => (
                    <Menu.Item key={index}>{value}</Menu.Item>
                ))}
        </Menu>
    );

    return (
        <Dropdown
            className={classes.box}
            overlay={menu}
            trigger={["click"]}
            onClick={() => setCount(0)}
        >
            <Button
                icon={
                    <Badge count={count}>
                        <NotificationsNoneTwoToneIcon
                            className={classes.icon}
                        />
                    </Badge>
                }
            />
        </Dropdown>
    );
}
