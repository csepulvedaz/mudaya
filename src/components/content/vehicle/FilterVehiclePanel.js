import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Col, Row, Select} from "antd";
import {types} from "../../utils/selectArrays";

import bg from "../../../assets/filter-bg.jpg";

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background:`url(${bg}) no-repeat 50% 100%`,
        backgroundSize:"cover",
        backgroundPositionY:"55%",
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

const FilterVehiclePanel = (props) => {
    const classes = useStyles();
    const [option, setOption] = useState("");

    const selectType = types;
    let index = selectType.indexOf(selectType.find(obj => {return obj.value === ""})); // remove "Seleccione un tipo" option
    if (index !== -1) selectType.splice(index, 1);

    const toSearch = () => {
        props.setType(option);
    };

    const toMain = () => {
        props.setType(null);
    };

    function onChange(value) {
        setOption(value);
        if (value === undefined) setOption("null");
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
                                onChange={onChange}
                                filterOption={(input, option) =>
                                    option.label
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                                options={selectType}
                            />
                        </Col>
                        <Col>
                            <Button
                                className={classes.button}
                                onClick={toSearch}
                            >
                                BUSCAR
                            </Button>
                        </Col>
                        {props.type && (
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
