import React from "react";
import "antd/dist/antd.css";
import { Menu, Dropdown } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/icons/FormatListBulletedRounded";

import DropListElement from "./DropListElement";

const useStyles = makeStyles({
  root: {
    width: "84px",
    height: "34px",
    border: "solid 2px #ffee00",
    borderRadius: "6px",
    background: "#ffffc8"
  },
  icon_list: {
    fontSize: "40px",
    color: "#6663ff"
  },
  button: {
    height: "45px",
    margin: "10px 20px",
    borderRadius: "9px",
    background: "#FCB625",
    fontWeight: "600",
    color: "#fff",
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
    fontSize: "16px"
  },
  box: {
    width: "45px",
    height: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0px",
    borderRadius: "9px",
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
    backgroundColor: " #ffffff"
  }
});

const { SubMenu } = Menu;

const menu = (
  <Menu>
    <Menu.Item>
        <DropListElement license_alpha="ZZZ" 
            license_numeric ="999" 
            brand ="MARCA" 
            model ="MODELO"
            addressOrigin ="Calle 86 #95 F - 16 apto 102" 
            addressTarget ="Kra. 14 # 87 - 78" 
            date ="jue 24 - Mar - 21"
        />
    </Menu.Item>
    <Menu.Item>
        <DropListElement license_alpha="XXX" 
            license_numeric ="000" 
            brand ="MARCA" 
            model ="MODELO"
            addressOrigin ="Calle 100 #95 F - 16 apto 102" 
            addressTarget ="Kra. 40 # 87 - 78" 
            date ="vie 15 - Mar - 21"
        />
    </Menu.Item>
    <SubMenu title ="Servicios cancelados" disabled>
      <Menu.Item>
        <DropListElement />
      </Menu.Item>
    </SubMenu>
  </Menu>
);

export default function ServicesList(props) {
  const classes = useStyles();

  return (
    <Dropdown className={classes.box} overlay={menu} trigger={["click"]}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <List className={classes.icon_list} />
      </a>
    </Dropdown>
  );
}
