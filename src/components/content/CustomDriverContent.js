import React, { useState } from "react";
import { Layout } from "antd";
import { makeStyles } from "@material-ui/core/styles";

import DriverCalendarPanel from "./driverContent/DriverCalendarPanel";
import DriverVehiclePanel from "./driverContent/DriverVehiclePanel";
import DriverServicesPanel from "./driverContent/DriverServicesPanel";
import DriverLeftSider from "./driverContent/DriverLeftSider";

const { Content } = Layout;

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        zIndex: 0,
        paddingBlockStart: "4%",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        // alignItems:"flex-end",
        backgroundSize: "cover",
        background: "#fafafa",
    },
}));

const CustomDriverContent = () => {
    const classes = useStyles();
    const [option, setOption] = useState(1);

    return (
        <Layout>
            <DriverLeftSider setOption={setOption} />
            <Content className={classes.content}>
                {option === 1 && <DriverCalendarPanel />}
                {option === 2 && <DriverServicesPanel />}
                {option === 3 && <DriverVehiclePanel />}
            </Content>
        </Layout>
    );
};

export default CustomDriverContent;
