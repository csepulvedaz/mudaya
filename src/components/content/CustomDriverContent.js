import React, {useContext, useState} from "react";
import {useQuery} from "@apollo/client";
import {Layout, Spin} from "antd";
import {makeStyles} from "@material-ui/core/styles";
import bg from "../../assets/bg.jpg";
import {LoadingOutlined} from "@ant-design/icons";

import DriverCalendar from "./driverContent/DriverCalendar";
import DriverVehiclePanel from "./driverContent/DriverVehiclePanel";
import DriverServicesPanel from "./driverContent/DriverServicesPanel";
import {SERVICES_BY_DRIVER, VEHICLES_BY_DRIVER} from "../../graphql/queries";
import AuthContext from "../../context/auth-context";
import DriverLeftSider from "./driverContent/DriverLeftSider";

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
    const context = useContext(AuthContext);
    const [option, setOption] = useState(1);
    const { loading, error, data } = useQuery(VEHICLES_BY_DRIVER,{variables: { idDriver: context.userId }});
    let { loading2, error2, data2 } = useQuery(SERVICES_BY_DRIVER,{variables: { idDriver: context.userId }});

    if (loading || loading2)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );
    if (error || error2) return `Error! ${error}`;


    if (data2===undefined) data2={services:undefined};
    return (
        <Layout>
            <DriverLeftSider setOption={setOption}/>
            <Content className={classes.content}>
                {option === 1 && <DriverCalendar/>}
                {option === 2 && <DriverServicesPanel services={data2.servicesByDriver}/>}
                {option === 3 && <DriverVehiclePanel vehicles={data.vehiclesByDriver}/>}
            </Content>
        </Layout>
    );
};

export default CustomDriverContent;
