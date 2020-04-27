import React from "react";
import {useQuery} from "@apollo/client";
import {Layout, Spin} from "antd";
import {makeStyles} from "@material-ui/core/styles";
import bg from "../../assets/bg.jpg";
import {LoadingOutlined} from "@ant-design/icons";

import DriverVehiclePanel from "./driverContent/DriverVehiclePanel";
import {ALL_VEHICLES} from "../../graphql/queries";

const { Content } = Layout;

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        paddingBlockStart: "4%",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        // alignItems:"flex-end",
        background: `url(${bg}) no-repeat 50% 100% `,
        backgroundSize: "cover",
        backgroundColor: "#fafafa",
    },
}));

const CustomDriverContent = (props) => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(ALL_VEHICLES);

    if (loading)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );
    if (error) return `Error! ${error}`;

    return (
        <Content className={classes.content}>
            <DriverVehiclePanel vehicles={data.vehicles}/>
        </Content>
    );
};

export default CustomDriverContent;
