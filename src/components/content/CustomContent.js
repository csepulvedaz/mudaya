import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {Layout, Spin} from "antd";
import {makeStyles} from "@material-ui/core/styles";
import {LoadingOutlined} from "@ant-design/icons";

import ServicesOfferedCardPanel from "./servicesOffered/ServicesOfferedCardPanel";
import VehiclesCardPanel from "./vehicle/VehiclesCardPanel";
import FilterVehiclePanel from "./vehicle/filter/FilterVehiclePanel";
import SearchVehiclePanel from "./vehicle/filter/SearchVehiclePanel";
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
        //background: `url(${bg}) no-repeat 50% 100% `,
        //backgroundSize: "cover",
        backgroundColor: "#fff",
    },
}));

const CustomContent = (props) => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(ALL_VEHICLES, {
        fetchPolicy: "no-cache",
    });
    const [type, setType] = useState(null);
    const [department, setDepartment] = useState(null);
    const [city, setCity] = useState(null);

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
            <FilterVehiclePanel type={type} setType={setType} department={department} setDepartment={setDepartment} city={city} setCity={setCity}/>
            {(type||department||city) && <SearchVehiclePanel type={type} department={department} city={city} />}

            {(!type&&!department&&!city) && (
                <>
                    <ServicesOfferedCardPanel />
                    <VehiclesCardPanel vehicles={data.vehicles} />
                </>
            )}
        </Content>
    );
};

export default CustomContent;
