import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Css/SideBar.css";
import { useEffect } from "react";
import { useState } from "react";
import { getAllCategories } from "../redux/apiCalls";

export default (props) => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllCategories()
      console.log(res);
      setCategories(res)
    }
    fetch()
    return () => {}
  },[])

  return (
    <Menu>
      <a className="menu-item" href={`/`}>
         Home
      </a>
      {
        categories.map(cat => {
          return (
            <a className="menu-item" href={`/products/${cat}`} style={{zIndex:5}}>
              {cat}
            </a>
          )
        })
      }
      <a className="menu-item" href="/chat" style={{zIndex:5}}>
        live chat
      </a>
    </Menu>
  );
};
