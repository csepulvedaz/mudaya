import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Layout, Menu} from "antd";
import {CarOutlined, ReconciliationOutlined, ScheduleOutlined} from '@ant-design/icons';


const {Sider} = Layout;
const useStyles = makeStyles({

    sider:{
        paddingBlockStart:"5%",
        backgroundColor: "#ffffff",
        width:"250px",
        minHeight:"800px",
    }
});

const DriverLeftSider = (props) => {
    const classes = useStyles();

    const toCalendar = () => {
        props.setOption(1);
    };
    const toServices = () => {
        props.setOption(2);
    };
    const toVehicles = () => {
        props.setOption(3);
    };

    return (
        <Sider className={classes.sider}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['schedule']}
                style={{ height: '100%'}}
            >
                <Menu.Item key="schedule" onClick={toCalendar}><ScheduleOutlined />Programación</Menu.Item>
                <Menu.Item key="services" onClick={toServices}><ReconciliationOutlined /> Servicios</Menu.Item>
                <Menu.Item key="vehicles" onClick={toVehicles}><CarOutlined />Vehículos</Menu.Item>
            </Menu>
        </Sider>
    );
};

export default DriverLeftSider;
