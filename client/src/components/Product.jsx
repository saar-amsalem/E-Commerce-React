import {
  FavoriteBorderOutlined,
  SearchOutlined,
  FavoriteOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { createWishlist,updateWishlist,getWishlist,deleteWishlist } from "../redux/apiCalls";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffebcd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: none;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  border: ${(props) => props.type === "filled" && "none"};
  
  color: ${(props) => props.type === "filled" && "black"};
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const [wish,setWish] = useState()
  const [fill,setFill] = useState(false)

  useEffect(()=> {
    const getWish = async () => {
    try {
      const res = await getWishlist();
      console.log(res);
      res && setWish(res)
      res.products.find((obj)=>obj.productId == item._id) ? setFill(true) : setFill(false)
    } catch (error) {
      console.log(error);
    }
  }
  getWish();
  },[])

  const clickHandler = async() => {
    
    console.log(wish);
    if (wish)
    {
      const hasproduct = wish.products.find((obj)=>obj.productId == item._id)
      console.log(hasproduct);
      if (!hasproduct)
      {
        
        const res = await updateWishlist({ productId: item._id})
        setWish(res)
        console.log(res + "inserted");
        setFill(true)
      }
      else
      {
        const res = await deleteWishlist({ productId: item._id})
        setWish(res)
        console.log(res+ "deleted");
        setFill(false)
      }
    }
    else {
      setFill(true)
      const res = await createWishlist({productId: item._id})
      setWish(res)
      console.log(res);
    }
    
  }
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        {/* <Icon>
          <ShoppingCartOutlined />
        </Icon> */}
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
         <Icon onClick={clickHandler} color={"black"}>
          {fill ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
        </Icon> 
      </Info>
    </Container>
  );
};

export default Product;
