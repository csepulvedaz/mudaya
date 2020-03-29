import React from "react";
import "antd/dist/antd.css";
import Maps from "../components/MapContainer";
import TruckMenu from "../components/TruckMenu";
import { Layout } from "antd";
import CustomHeader from "../components/CustomHeader";
import CustomFooter from "../components/CustomFooter";
import MainMap from "../components/MainMap";

const { Sider, Content } = Layout;

const Main = () => {
    return (
        <Layout theme="light">
            <CustomHeader />
            <Content style={{ paddingBlockStart: "4%", paddingInline: "3%" }}>
                <Layout theme="light">
                    <Sider
                        theme="light"
                        width={300}
                        style={{
                            overflow: "auto",
                            height: "82vh",
                            center: 0
                        }}
                    >
                        <TruckMenu />
                    </Sider>
                    <Content theme="light">
                        <MainMap />
                    </Content>
                </Layout>
            </Content>
            <CustomFooter />
        </Layout>
    );
};

export default Main;
