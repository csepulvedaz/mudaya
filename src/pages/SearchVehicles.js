import React from "react";
import "antd/dist/antd.css";
import {Layout} from "antd";
import CustomHeader from "../components/header/CustomHeader";
import CustomFooter from "../components/footer/CustomFooter";
import CustomSearch from "../components/SearchVehicle/CustomSearch";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            background: "#fafafa",
        },
    },
}));

const SearchVehicles = (props) => {
    const classes = useStyles();

    let type = props.match.params.tipo;
    return (
        <Layout theme="light" className={classes["@global"]}>
            <CustomHeader />
            <CustomSearch type={type}/>
            <CustomFooter />
        </Layout>
    );
};

export default SearchVehicles;
