import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Col, Row, Select} from "antd";

import {cities, departments, types} from "../../../utils/selectArrays";
import bg from "../../../../assets/filter-bg.jpg";

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: `url(${bg}) no-repeat 50% 100%`,
        backgroundSize: "cover",
        backgroundPositionY: "55%",
        padding: "100px 0px",
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
        color: "#fff",
        fontWeight: "600",
        fontSize: "22px",
        marginBottom: "30px",
    },
    button: {
        height: "45px",
        borderRadius: "9px",
        background: theme.palette.primary.main,
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
const { Option } = Select;

const FilterVehiclePanel = (props) => {
    const classes = useStyles();
    const [option, setOption] = useState({type:"",department:"",city:""});

    const selectType = types;
    let index = selectType.indexOf(
        selectType.find((obj) => {
            return obj.value === "";
        })
    ); // remove "Seleccione un tipo" option
    if (index !== -1) selectType.splice(index, 1);

    const selectDepartment = departments;
    index = selectDepartment.indexOf(
        selectDepartment.find((obj) => {
            return obj.value === "";
        })
    ); // remove "" option
    if (index !== -1) selectDepartment.splice(index, 1);

    const cityData = cities;
    index = cityData.indexOf(
        cityData.find((obj) => {
            return obj.department === "";
        })
    ); // remove "Seleccione un municipio" option
    if (index !== -1) cityData.splice(index, 1);
    const [selectCity, setSelectCity] = useState(cityData);

    const toSearch = () => {
        props.setType(option.type);
        props.setDepartment(option.department);
        props.setCity(option.city);
    };

    const toMain = () => {
        props.setType(null);
        props.setDepartment(null);
        props.setCity(null);
    };

    function onChangeType(value) {
        setOption({type:value,department:option.department,city:option.city});
        if (value === undefined) setOption({type:"null",department:option.department,city:option.city});
    }

    function onChangeDepartment(value) {
        setOption({type:option.type,department:value,city:option.city});
        if (value === undefined) setOption({type:option.type,department:"null",city:option.city});
        setSelectCity(cityData.filter(function(city){return city.department === value;}));
        if (value === undefined) setSelectCity(cityData);
    }

    function onChangeCity(value) {
        setOption({type:option.type,department:option.department,city:value});
        if (value === undefined) setOption({type:option.type,department:option.department,city:"null"});
    }

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
                                placeholder="Busca por tipo"
                                optionFilterProp="value"
                                allowClear
                                onChange={onChangeType}
                                filterOption={(input, option) =>
                                    option.label
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                                options={selectType.sort((a, b) => (a.label > b.label) ? 1 : -1)}
                            />
                        </Col>
                        <Col>
                            <Select
                                className={classes.select}
                                size={"large"}
                                showSearch
                                placeholder="Busca por departamento"
                                optionFilterProp="value"
                                allowClear
                                onChange={onChangeDepartment}
                                filterOption={(input, option) =>
                                    option.label
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                                options={selectDepartment.sort((a, b) => (a.label > b.label) ? 1 : -1)}
                            />
                        </Col>
                        <Col>
                            <Select
                                className={classes.select}
                                size={"large"}
                                showSearch
                                placeholder="Busca por municipio"
                                optionFilterProp="value"
                                allowClear
                                onChange={onChangeCity}
                                filterOption={(input, option) =>
                                    option.value
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {selectCity.sort((a, b) => (a.city > b.city) ? 1 : -1).map(city => (
                                    <Option key={city.city+", "+city.department.substr(0,2)}>{city.city+", "+city.department.substr(0,2)}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col>
                            <Button
                                className={classes.button}
                                onClick={toSearch}
                            >
                                BUSCAR
                            </Button>
                        </Col>
                        {(props.type||props.department||props.city)&& (
                            <Col>
                                <Button
                                    className={classes.button}
                                    onClick={toMain}
                                >
                                    VOLVER
                                </Button>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default FilterVehiclePanel;
