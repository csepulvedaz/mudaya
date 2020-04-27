import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Col, Row, Select} from "antd";
import {types} from "../../utils/selectArrays";

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

const FilterVehiclePanel = (props) => {
    const classes = useStyles();
    const [option, setOption] = useState("");

    const selectType = types;
    selectType.splice(0, 1); // removes "Seleccione un tipo" option

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
                                    option.value
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
