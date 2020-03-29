import React from "react";
import { Table } from "antd";
import { makeStyles } from "@material-ui/core/styles";

const columns = [
    {
        title: "Tipo",
        dataIndex: "tipo",
        sorter: (a, b) => a.tipo.length - b.tipo.length,
        sortDirections: ["descend", "ascend"]
    },
    {
        title: "Año",
        dataIndex: "anio",
        sorter: (a, b) => a.anio - b.anio,
        sortDirections: ["descend", "ascend"]
    },
    {
        title: "Altura (m)",
        dataIndex: "altura",
        sorter: (a, b) => a.altura - b.altura,
        sortDirections: ["descend", "ascend"]
    },
    {
        title: "Capacidad (m3)",
        dataIndex: "capacidad",
        sorter: (a, b) => a.capacidad - b.capacidad,
        sortDirections: ["descend", "ascend"]
    }
];

const data = [
    {
        key: "1",
        tipo: "Tractomula",
        anio: "2012",
        altura: "3",
        capacidad: "200"
    },
    {
        key: "2",
        tipo: "Campero",
        anio: "2015",
        altura: "1.5",
        capacidad: "20"
    },
    {
        key: "3",
        tipo: "Otro",
        anio: "2007",
        altura: "1",
        capacidad: "10"
    }
];

const useStyles = makeStyles(theme => ({
    header: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
}

const TruckMenu = () => {
    const classes = useStyles();
    return <Table columns={columns} dataSource={data} onChange={onChange} className={classes.header}/>;
};

export default TruckMenu;
