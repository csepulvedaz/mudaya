import React, {useContext} from "react";
import "antd/dist/antd.css";
import {Layout} from "antd";
import CustomHeader from "../components/header/CustomHeader";
import CustomFooter from "../components/footer/CustomFooter";
import CustomContent from "../components/content/CustomContent";
import CustomDriverContent from "../components/content/CustomDriverContent";
import {makeStyles} from "@material-ui/core/styles";

import AuthContext from "../context/auth-context";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            background: "#fafafa",
        },
    },
}));

const Main = () => {
    const classes = useStyles();
    const context = useContext(AuthContext);

    return (
        <Layout theme="light" className={classes["@global"]}>
            <CustomHeader />
            {context.client === "user" && <CustomContent />}
            {context.client !== "user" && <CustomDriverContent />}
            <CustomFooter />
        </Layout>
    );
};

export default Main;
