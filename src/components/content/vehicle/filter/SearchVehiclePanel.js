import React from "react";
import {useQuery} from "@apollo/client";
import {makeStyles} from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import {Carousel, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

import SearchVehicleCard from "./SearchVehicleCard";
import img1 from "../../../../assets/van.png";
import {ALL_VEHICLES} from "../../../../graphql/queries";

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        //backdropFilter: "contrast(40%)",
        background: "#fdfdff",
        display: "flex",
        justifyContent: "center",
        paddingBottom: "20px",
    },
    box: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "13px",
        padding: "20px 20px",
        width: "100%"
    },
    panel: {
        borderRadius: "13px",
        display: "flex",
        justifyContent: "center",
        width: "100%"
    },
    title: {
        textAlign: "center",
        color: theme.palette.primary.main,
        fontWeight: "600",
        fontSize: "22px",
    },
    button_r: {
        borderRadius: "0px 8px 8px 0px",
        background: theme.palette.primary.main,
        fontWeight: "600",
        color: "#fff",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
        fontSize: "60px",
        alignSelf: "center",
        width: "40px",
        height: "70px",
    },
    button_l: {
        borderRadius: "8px 0px 0px 8px",
        background: theme.palette.primary.main,
        fontWeight: "600",
        color: "#fff",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
        fontSize: "60px",
        alignSelf: "center",
        width: "40px",
        height: "70px",
    },
    spin: {
        position: "absolute",
        zIndex: "1",
        top: "50%",
        left: "50%",
    },
}));

const SearchVehiclePanel = (props) => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(ALL_VEHICLES, {
        variables: { type: props.type !== "null" ? props.type : null,  department: props.department !== "null" ? props.department : null, city: props.city !== "null" ? props.city : null},
        fetchPolicy: "no-cache",
    });
    if (loading) {
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );
    }

    const size = data.vehicles.length;

    const carouselprops = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: size > 4 ? 4 : size,
        slidesToScroll: size > 4 ? 4 : size,
    };
    if (error) return `Error! ${error}`;

    return (
        <div className={classes.content}>
            <div className={classes.box}>
                <h3 className={classes.title}>RESULTADOS DE TU BÚSQUEDA</h3>
                <div className={classes.panel}>
                    {size > 4 && (
                        <NavigateBeforeIcon className={classes.button_l} />
                    )}
                    <Carousel
                        id="carousel"
                        {...carouselprops}
                        arrows="true"
                        style={{
                            width: "90vw",
                            alignSelf: "center",
                        }}
                    >
                        {data.vehicles.map((value, index) => {
                            return (
                                <div key={index}>
                                    <SearchVehicleCard
                                        image={img1}
                                        value={value}
                                    />
                                </div>
                            );
                        })}
                    </Carousel>
                    {size > 4 && (
                        <NavigateNextIcon className={classes.button_r} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchVehiclePanel;
