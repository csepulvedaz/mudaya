import React from "react";
import "antd/dist/antd.css";
import TruckMenu from "../components/TruckMenu";
import {Layout, Typography} from "antd";
import CustomHeader from "../components/CustomHeader";
import CustomFooter from "../components/CustomFooter";
import MainMap from "../components/MainMap";

const { Title } = Typography;

const { Sider, Content } = Layout;

const Main = () => {
    return (
        <Layout theme="light">
            <CustomHeader />
            <Content style={{ paddingBlockStart: "4%", paddingInline: "2%", paddingInlineEnd: "2%" }}>
                <Layout theme="light">
                    <Sider
                        theme="light"
                        width={380}
                        style={{
                            overflow: "auto",
                            height: "85vh",
                            center: 0
                        }}
                        title={"Camiones disponibles"}
                    >
                        <Title level={3} style={{ textAlign: 'center' }}>Camiones Disponibles</Title>
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
