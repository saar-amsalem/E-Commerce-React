import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutfromuser,
} from "./userRedux";
import { clearCart, loadCart } from "./cartRedux";
import axios from "axios";
import { store } from "./store";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3030/api/auth/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
    const cart = await getCart(); //getting user cart from DB
    if (cart.products) dispatch(loadCart(cart.products)); //if there are products, will update state and show them
  } catch (err) {
    console.log("Wrong Credentials");
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch, products) => {
  try {
    const res = await getCart(); //get user's cart data

    if (!res) {
      //if there is no cart, save to DB
      console.log("inside if logout ! ");
      await saveCarttoDB(products);
      dispatch(clearCart()); //free local storage memory
      dispatch(logoutfromuser());
    } else {
      //else update in DB
      await updateCart(products);
      dispatch(clearCart());
      dispatch(logoutfromuser());
    }
  } catch (error) {
    console.log(error);
  }
};

//------------------------------------Cart-api------------------------------------------------//

export const clearCartData = (dispatch) => {
  dispatch(clearCart());
};

//save cart
export const saveCarttoDB = async (products) => {
  let temp = [];
  products.forEach((item) => {
    temp.push({
      //push to a temp array the relevant elements to save in DB
      title: item.title,
      img: item.img,
      color: item.color,
      size: item.size,
      categories: item.categories,
      productId: item._id,
      price: item.price,
      quantity: item.quantity,
    });
  });
  try {
    await axios.post(
      "http://localhost:3030/api/carts",
      {
        userId: store.getState().user.currentUser._id,
        products: temp,
      },
      {
        headers: {
          token: `Bearer ${store.getState().user.currentUser.accessToken}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//update cart
export const updateCart = async (products) => {
  console.log(products);
  let temp = [];
  products.forEach((item) => {
    temp.push({
      title: item.title,
      img: item.img,
      color: item.color,
      size: item.size,
      categories: item.categories,
      productId: item._id,
      price: item.price,
      quantity: item.quantity,
    });
  });
  try {
    await axios.put(
      "http://localhost:3030/api/carts/" +
        store.getState().user.currentUser._id,
      {
        userId: store.getState().user.currentUser._id,
        products: temp,
      },
      {
        headers: {
          token: `Bearer ${store.getState().user.currentUser.accessToken}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//get cart data
export const getCart = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3030/api/carts/find/" +
        store.getState().user.currentUser._id,
      {
        headers: {
          token: `Bearer ${store.getState().user.currentUser.accessToken}`,
        },
      }
    );
    if (res.data) {
      console.log(res.data);
      return res.data;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteCart = async (id) => {
  try {
    await axios.delete("http://localhost:3030/api/carts/" + id, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//------------------------------------Orders-api------------------------------------------------//

export const addOrder = async (order) => {
  try {
    await axios.post("http://localhost:3030/api/orders", order, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

//------------------------------------Products-api------------------------------------------------//
export const getProducts = async () => {
  try {
    const res = await axios.get(`http://localhost:3030/api/products`);
    return res.data;
  } catch (error) {}
};


//----------------------------------Wishlist-api-------------------------------------------------//

export const getWishlist = async () => {
  try {
    const res = await axios.get("http://localhost:3030/api/wishlist/find/"+store.getState().user.currentUser._id,{
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const createWishlist = async (body) => {
  try {
    const obj = {
      userId: store.getState().user.currentUser._id,
      products: body
    }
    const res = await axios.post("http://localhost:3030/api/wishlist",obj,{
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const updateWishlist = async (product) => {
  try {
    console.log(product);
    const res = await axios.post("http://localhost:3030/api/wishlist/find/"+store.getState().user.currentUser._id,product,{
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const deleteWishlist = async (product) => {
  try {
    console.log(product);
    const res = await axios.post("http://localhost:3030/api/wishlist/delete/"+store.getState().user.currentUser._id,product,{
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    console.log(res.data);
    return res.data
  } catch (error) {
    console.log(error);
  }
}
