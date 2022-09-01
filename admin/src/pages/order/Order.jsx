import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
  import styled from "styled-components";
  import { useEffect,useState } from "react";
  import { Link, useHistory, useParams } from "react-router-dom";
  import { getOrderByOrderId,getUserByID } from "../../redux/apiCalls";
  import "./order.css";
import { store } from "../../redux/store";

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

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;
  
  export default function User() {
    const [order,setOrder] = useState();
    const [user,setUser] = useState();
    const params = useParams();
    const history = useHistory();
    const products = store.getState().product.products;

    useEffect(()=>{
      const getORD = async() => {
        const res = await getOrderByOrderId(params.orderId);
        setOrder(res);
        const useres = await getUserByID(res.userId);
        setUser(useres);
        console.log(res);
      }
      console.log(order);
      getORD();
    },[])

    const clickHandler = (e)=> {
      //to implement update user in DB
      e.preventDefault()
      history.push("/orders")
    }
    
  
    return (
    <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Order No. {params.orderId}</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">user id: {order?.userId}</span>
                <span className="userShowUserTitle">{user?.username}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Order Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">User Email : {user?.email}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">Order Date : {order?.createdAt.substring(0,10)} {order?.createdAt.substring(11,16)}</span>
              </div>
              <button className="userUpdateButton" onClick={clickHandler}>Back to Orders</button>
            </div>
          </div>
          </div>
            <br />
            <span className="userUpdateTitle">Order Details</span>
            <br />
            <br />
            <br />
            {order?.products.map((product) => (
                <Product key={product._id}>
                <ProductDetail>
                  <Image src={products.find(obj=>obj._id===product.productId).img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {products.find(obj=>obj._id===product.productId).title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product.productId}
                    </ProductId>
                    <ProductSize>
                      <b>Quantity:</b> {product.quantity}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <br />
                <br />
                </Product>
                
              ))}
              <br />
        </div>
    );
  }
  