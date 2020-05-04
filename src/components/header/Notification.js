import React, { useState, useContext } from "react";
import { useSubscription } from "@apollo/client";
import { Menu, Dropdown, Button, Badge } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsNoneTwoToneIcon from "@material-ui/icons/NotificationsNoneTwoTone";

import { SERVICE_ADDED } from "../../graphql/subscriptions";
import AuthContext from "../../context/auth-context";

const useStyles = makeStyles({
    icon: {
        fontSize: "40px",
        color: "#fcb625",
    },
    box: {
        margin: "10px 0px",
        width: "45px",
        height: "45px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "9px",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
        backgroundColor: " #ffffff",
    },
});

export default function Notification() {
    const classes = useStyles();
    const [dataArray, setDataArray] = useState([]);
    const { userId } = useContext(AuthContext);
    const { data } = useSubscription(SERVICE_ADDED, {
        variables: { _id: userId },
        onSubscriptionData: ({ subscriptionData }) => {
            setDataArray([...dataArray, subscriptionData]);
        },
    });

    const menu = (
        <Menu>
            <Menu.Item>
                {/* New comment: {!loading && serviceAdded.content} */}
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown className={classes.box} overlay={menu} trigger={["click"]}>
            <Button
                icon={
                    <Badge count={dataArray.length}>
                        <NotificationsNoneTwoToneIcon
                            className={classes.icon}
                        />
                    </Badge>
                }
            />
        </Dropdown>
    );
}
