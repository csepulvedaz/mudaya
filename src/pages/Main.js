import React from "react";
import "antd/dist/antd.css";
import { Layout, Typography } from "antd";
import CustomHeader from "../components/header/CustomHeader";
import CustomFooter from "../components/footer/CustomFooter";
import CustomContent from "../components/content/CustomContent";
import { makeStyles } from "@material-ui/core/styles";

const { Title } = Typography;

const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            background: "#fafafa"
        }
    },
}));

const Main = () => {
    const classes = useStyles();
    return (
        <Layout theme="light">
            <CustomHeader />
            <CustomContent/>
            <CustomFooter />
        </Layout>
    );
};

export default Main;
