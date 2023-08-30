import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutfromuser,
} from "./userRedux";
import { clearCart, loadCart } from "./cartRedux";
import axios from "axios";
import { store } from "./store";

export const register = async (dispatch, user) => {
  try {
    const newUser = await axios.post("http://localhost:3030/api/auth/register", user)
    console.log(newUser.data.body);
    alert("Registerd Successfully !")
    await login(dispatch, user);
    return newUser.data
  } catch (err) {
    console.log(err.response.data);
    return err.response.data
  }
}


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3030/api/auth/login", user);
    dispatch(loginSuccess(res.data.body));
    const cart = await getCart(); //getting user cart from DB
    dispatch(loadCart(cart.products)); //if there are products, will update state and show them
    return res.data
  } catch (err) {
    dispatch(loginFailure());
    return err.response.data;
  }
};

export const logout = async (dispatch, products) => {
  try {
    dispatch(logoutStart())
    await getCart(); //get user's cart data
    await updateCart(products);
    dispatch(clearCart());
    dispatch(logoutfromuser());
  } catch (error) {
    dispatch(logoutFailure())
    return error.response.data;
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
    return error.response.data;
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
    const res = await axios.put(
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
    console.log(res.data);
  } catch (error) {
    return error.response.data;
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
    return res.data;
  } catch (error) {
    return error.response.data;
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
    return error.response.data;
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
    return err.response.data;
  }
};

//------------------------------------Products-api------------------------------------------------//
export const getProducts = async () => {
  try {
    const res = await axios.get(`http://localhost:3030/api/products`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3030/api/products/find/${id}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getAllCategories = async () => {
  try {
    console.log("in api calls getAllCategories !");
    const res = await axios.get(`http://localhost:3030/api/products/categories`);    
    return res.data
  } catch (error) {
    return error.response.data;
  }
}


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
    return error.response.data;
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
    return error.response.data;
  }
}

export const updateWishlist = async (product) => {
  try {
    console.log(product);
    const res = await axios.post("http://localhost:3030/api/wishlist/add/"+store.getState().user.currentUser._id,product,{
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data
  } catch (error) {
    return error.response.data;
  }
}

export const deleteWishlist = async (product) => {
  try {
    console.log(product);
    const res = await axios.delete("http://localhost:3030/api/wishlist/delete/"+store.getState().user.currentUser._id,product,{
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    console.log(res.data);
    return res.data
  } catch (error) {
    return error.response.data;
  }
}


//------------------------------------Users-api------------------------------------------------//

export const getUserById = async () => {
  try {
    const res = await axios.get("http://localhost:3030/api/users/find/" + store.getState().user?.currentUser._id, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    console.log(res.data.body);
    return res.data.body
  } catch (err) {
    return err.response.data;
  }
};
