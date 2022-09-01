import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Css/SideBar.css";

export default (props) => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/products/women">
        women
      </a>
      <a className="menu-item" href="/products/jeans">
        jeans
      </a>
      <a className="menu-item" href="/products/man">
        men
      </a>
      <a className="menu-item" href="/chat">
        live chat
      </a>
    </Menu>
    /////////
  );
};
