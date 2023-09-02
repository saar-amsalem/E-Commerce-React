import {
  FavoriteBorderOutlined,
  SearchOutlined,
  FavoriteOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { updateWishlist,deleteWishlist } from "../redux/apiCalls";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
  display: block;
  max-width: 100%
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

const Link = styled.a`
  text-decoration: none;
  color: black;
  &:visited {
    color: black;
  }
`;

const Product = ({ item, wishlisted }) => {

  const [inWishList, setInWishList] = useState(wishlisted)
  const user = useSelector(state => state.user.currentUser)
  const history = useHistory()
  const clickHandler = async() => {
      if(!user) {
        history.push("/login")
      }
      if (!inWishList)
      {
        const res = await updateWishlist({ productId: item._id})
        console.log(res);
        if (res.status === 499) {
          const message = `Your token expired, please try to reconnect !`
          alert(message)
          return
        }
        if (res.status !== 200) {
          const message = `An unexpected error occured, please try again !`
          alert(message)
          return
        }
        setInWishList(true)
      }
      else
      {
        const res = await deleteWishlist({ productId: item._id})
        console.log(res);
        if (res.status === 499) {
          const message = `Your token expired, please try to reconnect !`
          alert(message)
          return
        }
        if (res.status !== 200) {
          const message = `An unexpected error occured, please try again !`
          alert(message)
          return
        }
        setInWishList(false)
      }
    }
  

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <Link href={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
         <Icon onClick={clickHandler} color={"black"}>
          {inWishList ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
        </Icon> 
      </Info>
    </Container>
  );
};

export default Product;
