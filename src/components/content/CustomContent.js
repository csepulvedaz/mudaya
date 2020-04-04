import React from "react";
import { Layout } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import bg from "../../assets/bg.jpg";
import ServicesCardPanel from "./ServicesCardPanel";
import VehiclesCardPanel from "./VehiclesCardPanel";

const { Content } = Layout;

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        height: "1000px",
        paddingBlockStart: "5%",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        // alignItems:"flex-end",
        background: `url(${bg}) no-repeat 50% 100% `,
        backgroundSize: "cover",
        backgroundColor: "#fafafa",
    },
}));

const CustomContent = () => {
    const classes = useStyles();
    return (
        <Content className={classes.content}>
            <ServicesCardPanel />
            <VehiclesCardPanel />
        </Content>
    );
};

export default CustomContent;
