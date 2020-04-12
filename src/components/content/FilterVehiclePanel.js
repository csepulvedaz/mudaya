import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Col, Row, Select } from "antd";

const capacityOptions = [
    { value: "4" },
    { value: "5" },
    { value: "7" },
    { value: "8" },
    { value: "10" },
];
const zoneOptions = [
    { value: "Chico" },
    { value: "Otro" },
    { value: "sd" },
    { value: "8sad" },
    { value: "sdawe" },
];

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log("blur");
}

function onFocus() {
    console.log("focus");
}

function onSearch(val) {
    console.log("search:", val);
}

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backdropFilter: "contrast(80%)",
        padding: "50px 0px",
    },
    box: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    panel: {
        display: "flex",
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "600",
        fontSize: "22px",
        marginBottom: "30px",
    },
    button: {
        height: "45px",
        borderRadius: "9px",
        background: "#FCB625",
        fontWeight: "600",
        color: "#fff",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
        fontSize: "16px",
    },
    select: {
        width: 300,
        fontSize: "16px",
    },
}));

const FilterVehiclePanel = () => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <div className={classes.box}>
                <h3 className={classes.title}>
                    ENCUENTRA EL VEHÍCULO QUE MÁS SE ADAPTE A TUS NECESIDADES
                </h3>
                <div className={classes.panel}>
                    <Row
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                        align="middle"
                    >
                        <Col>
                            <Select
                                className={classes.select}
                                size={"large"}
                                showSearch
                                placeholder="Busca por zona"
                                optionFilterProp="value"
                                allowClear
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.value
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                                options={zoneOptions}
                            />
                        </Col>
                        <Col>
                            <Select
                                className={classes.select}
                                size={"large"}
                                showSearch
                                placeholder={"Busca por capacidad"}
                                optionFilterProp="value"
                                allowClear
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.value
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                                options={capacityOptions}
                            />
                        </Col>
                        <Col>
                            <Button
                                className={classes.button}
                                // onClick={() => alert("Buscar presionado")}
                            >
                                BUSCAR
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default FilterVehiclePanel;
