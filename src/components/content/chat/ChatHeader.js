import React, { useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {useQuery} from "@apollo/client";
import AuthContext from "../../../context/auth-context";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { PROFILEUSER, PROFILEDRIVER } from "../../../graphql/queries";

const useStyles = makeStyles((theme)=>({
    root:{
        paddingBottom:"16px",
        margin:"10px 20px 0px 20px",
        borderBottom:"1px #e0e0e0 solid",
        boxShadow:"0 17px 9px -9px #efefef",
    },
    title:{
        fontSize:"24px",
        fontWeight: "bold",
        textAlign: "left",
    },
    phone:{
        fontSize:"14px",
        textAlign: "left",
        color:"#8b8b8b",
    }
}))

const ChatHeader = (props) => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const { idDriver, idUser } = props.valueService;
    
    const { loading, error, data:dataU } = useQuery(PROFILEUSER, {
        variables: { _id: idUser},
    });
    const { loading:loading1, error:error1, data:dataD } = useQuery(PROFILEDRIVER, {
        variables: { _id: idDriver },
    });
    if (loading1 || loading)
        return (
            <Spin
                tip="Cargando..."
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                className={classes.spin}
            />
        );
    const {name: nameU, surname:surnameU, phone:phoneU} = dataU.profileUser;
    const {name: nameD, surname:surnameD, phone:phoneD} = dataD.profileDriver;

    return (
        <div className={classes.root}>
            {context.client === "driver" && (
                <>
                    <div className={classes.title}>
                    {nameU} {surnameU}
                    </div>
                    <div className={classes.phone}>
                    Celular: {phoneU}
                    </div>
                </>
            )}
            {context.client === "user" && (
                <>
                    <div className={classes.title}>
                    {nameD} {surnameD}
                    </div>
                    <div className={classes.phone}>
                    Celular: {phoneD}
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatHeader;