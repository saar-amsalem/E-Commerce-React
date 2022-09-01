import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import "./Css/Navbar.css";
import icon from "../img/icon.jpg";
import Sidebar from "./Sidebar";
import io from "socket.io-client";
import axios from "axios";
import { store } from "../redux/store";
const socket = io("http://localhost:3030");

const Container = styled.div`
  background-color: #f0ffff;
  padding: 10px;
  text-align: center;
  width: 100%;
  position: sticky;
  top: 0px;
  overflow: hidden;
  z-index: 3;

  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  display: flex;
  padding: 0px 10px;
  ${mobile({ padding: "0px" })}
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 100px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const a_style = {
  "text-decoration": "none",
};

const Navbar = () => {
  
 
  const [admin,setAdmin] = useState(false)
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const [caturl, setCaturl] = useState("");
  let history = useHistory();

  const handleSearchClick = () => {
    history.push(caturl);
  };

  const onClicklogout = () => {
    logout(dispatch, products, user._id);
    alert("logged out successfully !");
    history.push("/");
  };

  useEffect(()=>{
    const getUser = async () => {
      const res = await axios.get("http://localhost:3030/api/users/find/"+store.getState().user?.currentUser._id);
      console.log(res.data);
      console.log(res.data.isAdmin);
      setAdmin(res.data.isAdmin)
    }
    getUser();
  },[])

  return (
    <Container>
      {/* <Sidebar /> */}
      <Wrapper>
        <Left>
          <Sidebar
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          />
          <Image src={icon} alt="logo" />
          <Language>EN</Language>
          <SearchContainer>
            <Input
              placeholder="Search"
              onChange={(e) => {
                setCaturl("/products/" + e.target.value);
              }}
            />
            <button onClick={handleSearchClick}>
              <Search></Search>
            </button>
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo>MMJBS Team</Logo>
          </Link>
        </Center>
        <Right>
        {admin &&<MenuItem>
              <a href="http://localhost:3001">
                Admin Dashboard
              </a>
            </MenuItem>}
          {user ? (
            <MenuItem />
          ) : (
            <MenuItem>
              <Link to="/register" style={a_style}>
                REGISTER
              </Link>
            </MenuItem>
          )}
          {user ? (
            <MenuItem />
          ) : (
            <MenuItem>
              <Link to="/login" style={a_style}>
                SIGN IN
              </Link>
            </MenuItem>
          )}
          {!user ? (
            <MenuItem />
          ) : (
            <MenuItem onClick={onClicklogout}>LOGOUT</MenuItem>
          )}
          {user ? (
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          ) : (
            <MenuItem>
              <Badge color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;