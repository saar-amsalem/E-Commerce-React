import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation,useHistory } from "react-router-dom";
import { addOrder, clearCartData, deleteCart } from "../redux/apiCalls";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Error = styled.span`
  color: red;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 300;
  color: black;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = useSelector((state) => state.cart)
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const [err,setErr] = useState("")
  const history = useHistory();
  const dispatch = useDispatch()
  
  const handleClick = async() => {  
    history.push("/")
  }

  useEffect(() => {
    const createOrder = async () => {
      if (!data) return
      const orderCreated = await addOrder({
        userId: currentUser._id,
        products: cart.products.map((item) => ({
          productId: item._id,
          quantity: item.quantity
        })),
        amount: cart.total,
        address: data.billing_details.address,
        status: "processing"
      })
      if (orderCreated.err) {
        setErr(orderCreated.message)
        return
      }
      setOrderId(orderCreated.body._id);
      await deleteCart(currentUser._id);
      clearCartData(dispatch)
    };
    createOrder();
    return () => {}
  }, []);

  return (
    <Container>
      { err
        ? <Error>{err}</Error> 
        : <Title>{`Order has been created successfully. Your order number is ${orderId}`}</Title>
      }
      <Button onClick={handleClick}>Go to Homepage</Button>
    </Container>
  );
};

export default Success;
