import React, { useState, useContext } from "react";
import { useSubscription } from "@apollo/client";
import { Menu, Dropdown, Button, Badge } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsNoneTwoToneIcon from "@material-ui/icons/NotificationsNoneTwoTone";

import { SERVICE_ADDED } from "../../graphql/subscriptions";
import AuthContext from "../../context/auth-context";

const useStyles = makeStyles((theme)=>({
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
        border: "2px #cecece solid !important",
        "&:hover": {
            border: `2px ${theme.palette.primary.light} solid !important`,
            boxShadow: theme.shadows[2],
        },
    },
}));

export default function Notification(props) {
    const classes = useStyles();
    const [dataArray, setDataArray] = useState([]);
    const [textItem, setTextItem] = useState([]);
    const { userId } = useContext(AuthContext);
    const { loading } = useSubscription(SERVICE_ADDED, {
        variables: { _id: userId },
        onSubscriptionData: ({ subscriptionData }) => {
            setDataArray([...dataArray, subscriptionData.data.serviceAdded]);
            setTextItem([...textItem, "Nuevo servicio solicitado"]);
        },
    });
    var notif=props.serviceCreate.length+props.serviceUpdate.length
    console.log(notif)
    const menu = (
        <Menu>
            {!loading &&
                textItem.map((value, index) => (
                    <Menu.Item key={index}>{value}</Menu.Item>
                ))}
        </Menu>
    );

    return (
        <Dropdown className={classes.box} overlay={menu} trigger={["click"]}>
            <Button
                icon={
                    <Badge count={notif}>
                        <NotificationsNoneTwoToneIcon
                            className={classes.icon}
                        />
                    </Badge>
                }
            />
        </Dropdown>
    );
}
