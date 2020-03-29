import React from "react";
import "antd/dist/antd.css";
import TruckMenu from "../components/sider/TruckMenu";
import { Layout, Typography } from "antd";
import CustomHeader from "../components/header/CustomHeader";
import CustomFooter from "../components/footer/CustomFooter";
import MainMap from "../components/content/map/MainMap";
import { makeStyles } from "@material-ui/core/styles";

const { Title } = Typography;
const { Sider, Content } = Layout;

const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            background: "#fafafa"
        }
    },
    content: {
        paddingBlockStart: "4%",
        paddingInline: "2%",
        paddingInlineEnd: "2%"
    },
    sider: {
        overflow: "auto",
        height: "90vh",
        center: 0
    },
    title: {
        textAlign: "center"
    }
}));

const Main = () => {
    const classes = useStyles();
    return (
        <Layout theme="light">
            <CustomHeader />
            <Content className={classes.content}>
                <Layout theme="light">
                    <Sider
                        theme="light"
                        width="30%"
                        className={classes.sider}
                        title={"Camiones disponibles"}
                    >
                        <Title level={3} className={classes.title}>
                            Camiones Disponibles
                        </Title>
                        <TruckMenu />
                    </Sider>
                    <Content theme="light">
                        <MainMap />
                        <CustomFooter />
                    </Content>
                </Layout>
            </Content>
            
        </Layout>
    );
};

export default Main;
