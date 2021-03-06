import React, { useContext } from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import CustomHeader from "../components/header/CustomHeader";
import CustomFooter from "../components/footer/CustomFooter";
import CustomContent from "../components/content/CustomContent";
import CustomDriverContent from "../components/content/CustomDriverContent";
import { makeStyles } from "@material-ui/core/styles";
import Chatbot from "../components/content/ChatBot";
import AuthContext from "../context/auth-context";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            background: "#fff",
        },
    },
}));

const Main = () => {
    const classes = useStyles();
    const { client } = useContext(AuthContext);
    return (
        <Layout theme="light" className={classes["@global"]}>
            <CustomHeader />
            {client === "user" && (
                <>
                    <CustomContent /> <Chatbot style={{ zIndex: "1001" }} />
                </>
            )}
            {client === "driver" && <CustomDriverContent />}
            <CustomFooter />
        </Layout>
    );
};

export default Main;
