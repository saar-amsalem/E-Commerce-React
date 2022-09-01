import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation,useHistory } from "react-router-dom";
import {store} from "../redux/store"
import axios from "axios";
import { clearCartData, deleteCart } from "../redux/apiCalls";

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = store.getState().cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch()
  
  const handleClick = async() => {  
    history.push("/")
  }
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post("http://localhost:3030/api/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity
          })),
          amount: cart.total,
          address: data.billing_details.address,
          status: "processing"
        },{headers: {token: `Bearer ${store.getState().user.currentUser.accessToken}`}});
        setOrderId(res.data._id);
        await deleteCart(store.getState().user.currentUser._id);
        clearCartData(dispatch)
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Something went wrong !`}
      <button style={{ padding: 10, marginTop: 20 }} onClick={handleClick}>Go to Homepage</button>
    </div>
  );
};

export default Success;
