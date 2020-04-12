import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Col, Row, Select} from "antd";
import {useHistory} from "react-router-dom";

function onBlur() {
    console.log("blur");
}

function onFocus() {
    console.log("focus");
}

function onSearch(val) {
    console.log("search:", val);
}

function uniqBy(a, key) {
    var seen = {};
    return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
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

const FilterVehiclePanel = (props) => {
    const typeOptions = [];
    {props.Vehicles.map((value) => {typeOptions.push({value : value.type})})}
    const uniqtypeOptions = uniqBy(typeOptions, JSON.stringify)

    const classes = useStyles();
    let history = useHistory();

    let type = "null";
    const toSearch = () => {
        history.push("/busqueda/"+type);
    };

    function onChange(value) {
        type = value;
        if (value===undefined) type="null";
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
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.value
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                                options={uniqtypeOptions}
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
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default FilterVehiclePanel;
