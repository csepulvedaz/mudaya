import React, { useState, useContext } from "react";
import { useSubscription } from "@apollo/client";
import { Menu, Dropdown, Button, Badge } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/icons/FormatListBulletedRounded";

import DropListElement from "./DropListElement";
import { SERVICE_ADDED } from "../../../graphql/subscriptions";
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
});

const { SubMenu } = Menu;

const menu = (
    <Menu>
        <Menu.Item>
            <DropListElement
                vehicleId="ZZZ - 999"
                brand="MARCA"
                model="MODELO"
                addressOrigin="Calle 86 #95 F - 16 apto 102"
                addressTarget="Kra. 14 # 87 - 78"
                date="jue 24 - Mar - 21"
            />
        </Menu.Item>
        <Menu.Item>
            <DropListElement
                vehicleId="XXX - 000"
                brand="MARCA"
                model="MODELO"
                addressOrigin="Calle 100 #95 F - 16 apto 102"
                addressTarget="Kra. 40 # 87 - 78"
                date="vie 15 - Mar - 21"
            />
        </Menu.Item>
        <SubMenu title="Servicios cancelados" disabled>
            <Menu.Item>
                <DropListElement />
            </Menu.Item>
        </SubMenu>
    </Menu>
);

export default function ServicesList(props) {
    const classes = useStyles();
    const [dataArray, setDataArray] = useState([]);
    const { userId } = useContext(AuthContext);
    const { data } = useSubscription(SERVICE_ADDED, {
        variables: { _id: userId },
        onSubscriptionData: ({ subscriptionData }) => {
            setDataArray([...dataArray, subscriptionData]);
        },
    });

    return (
        <Dropdown className={classes.box} overlay={menu} trigger={["click"]}>
            <Button
                icon={
                    <Badge count={dataArray.length}>
                        <List className={classes.icon} />
                    </Badge>
                }
            />
        </Dropdown>
    );
}
