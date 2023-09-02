import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getOrderByOrderId, getUserByID } from "../redux/apiCalls";
import { store } from "../redux/store";
import styled from "styled-components";
import {
  CalendarToday,
  PermIdentity,
} from "@material-ui/icons";
import { useSelector } from "react-redux";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const UserContainer = styled.div`
  flex: 4;
  padding: 20px;
`;

const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserTitle = styled.h1`
  font-size: 24px;
`;

const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`;

const UserShowImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UserShowUsername = styled.span`
  font-weight: 600;
`;

const UserShowUserTitle = styled.span`
  font-weight: 300;
`;

const UserShowBottom = styled.div`
  margin-top: 20px;
`;

const UserShowTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;

const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;

const UserShowIcon = styled.div`
  font-size: 16px !important;
`;

const UserShowInfoTitle = styled.span`
  margin-left: 10px;
`;

const UserUpdateTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;



const UserUpdateButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  text-decoration: none;
`;

export default function User() {
  const [order, setOrder] = useState();
  const [user, setUser] = useState();
  const params = useParams();
  const history = useHistory();
  const products = useSelector(state => state.product.products);

  useEffect(() => {
    const getORD = async () => {
      const res = await getOrderByOrderId(params.orderId);
      if (res.status === 499) {
        alert("Invalid token, please try to reconnect !")
        return
      }
      if (res.status === 404) {
        alert("No user/order found with this ID !")
        return
      }
      if (res.status !== 200) {
        alert("An unexpected error occured, please try again !")
        return
      }
      setOrder(res.body);
      const userRes = await getUserByID(res.body.userId);
      if (res.status === 404) {
        alert("No user/order found with this ID !")
        return
      }
      if (res.status !== 200) {
        alert("An unexpected error occured, please try again !")
        return
      }
      setUser(userRes.body);
    };
    getORD();
  }, []);

  const clickHandler = (e) => {
    //to implement update user in DB
    e.preventDefault();
    history.push("/orders");
  };
  
  return (
    <UserContainer>
      <UserTitleContainer>
        <UserTitle>Order No. {params.orderId}</UserTitle>
      </UserTitleContainer>
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <UserShowImg
              src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              alt=""
            />
            <UserShowTopTitle>
              <UserShowUsername>user id: {order?.userId}</UserShowUsername>
              <UserShowUserTitle>{user?.username}</UserShowUserTitle>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowTitle>Order Details</UserShowTitle>
            <UserShowInfo>
              <UserShowIcon>
                <PermIdentity />
              </UserShowIcon>
              <UserShowInfoTitle>User Email : {user?.email}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <UserShowIcon>
                <CalendarToday />
              </UserShowIcon>
              <UserShowInfoTitle>
                Order Date : {order?.createdAt.substring(0, 10)}{" "}
                {order?.createdAt.substring(11, 16)}
              </UserShowInfoTitle>
            </UserShowInfo>
            <UserUpdateButton onClick={clickHandler}>
              Back to Orders
            </UserUpdateButton>
          </UserShowBottom>
        </UserShow>
      </UserContainer>
      <UserUpdateTitle>Order Details</UserUpdateTitle>
      {order?.products.map((product) => (
        <Product key={product._id}>
          <ProductDetail>
            <Image
              src={products.find(elm => elm._id === product.productId).img}
            />
            <Details>
              <ProductName>
                <b>Product:</b>
                {products.find(elm => elm._id === product.productId).title}
              </ProductName>
              <ProductId>
                <b>ID:</b> {product.productId}
              </ProductId>
              <ProductSize>
                <b>Quantity:</b> {product.quantity}
              </ProductSize>
            </Details>
          </ProductDetail>
        </Product>
      ))}
    </UserContainer>
  );
}
