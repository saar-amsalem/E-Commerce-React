import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutfromuser,
  updateUser,
} from "./userRedux";
import { clearCart, loadCart } from "./cartRedux";
import axios from "axios";
import { store } from "./store";

export const register = async (dispatch, user) => {
  try {
    console.log(user);
    const newUser = await axios.post("http://localhost:3030/api/auth/register", user)
    await login(dispatch, { username: user.username, password: user.password });
    await createWishlist([])
    await createCart(newUser.data.body._id)
    await getCart(dispatch)
    return newUser.data
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
}


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3030/api/auth/login", user);
    if (res.status === 200) {
      dispatch(loginSuccess(res.data.body));
    }
    await getCart(dispatch)
    return res.data
  } catch (error) {
    dispatch(loginFailure());
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
};

export const logout = async (dispatch, products) => {
  try {
    dispatch(logoutStart())
    const res = await updateCart(products);
    dispatch(clearCart());
    dispatch(logoutfromuser());
    return res
  } catch (error) {
    dispatch(logoutFailure())
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
};

//------------------------------------Cart-api------------------------------------------------//

export const clearCartData = (dispatch) => {
  dispatch(clearCart());
};

export const createCart = async (userId) => {
  try {
    await axios.post(
      "http://localhost:3030/api/carts",
      {
        userId: userId,
        products: []
      },
      {
        headers: {
          token: `Bearer ${store.getState().user.currentUser.accessToken}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
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
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
};

//update cart
export const updateCart = async (products) => {
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
    return res.data
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
};

//get cart data
export const getCart = async (dispatch) => {
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
    console.log(res.data);
    res.status === 200 ? dispatch(loadCart(res.data.body.products)) : dispatch(loadCart([]));
    return res.data;
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
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
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
};


//------------------------------------Orders-api------------------------------------------------//

export const addOrder = async (order) => {
  try {
    const res = await axios.post("http://localhost:3030/api/orders", order, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
};

export const getOrdersForUser = async (userId) => {
  try {
    const res = await axios.get("http://localhost:3030/api/orders/find/" + userId, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    console.log(res);
    return res.data
  } catch (error) {
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
};

//------------------------------------Products-api------------------------------------------------//
export const getProducts = async () => {
  try {
    const res = await axios.get(`http://localhost:3030/api/products`);
    return res.data;
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3030/api/products/find/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
}

export const getAllCategories = async () => {
  try {
    const res = await axios.get(`http://localhost:3030/api/products/categories`);    
    return res.data
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
}

export const getRecommendedProducts = async (category) => {
  try {
    console.log(category);
    const res = await axios.get(`http://localhost:3030/api/products/recommended/${category}`);    
    return res.data
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
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
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
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
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
}

export const updateWishlist = async (product) => {
  try {
    const res = await axios.post("http://localhost:3030/api/wishlist/add/"+store.getState().user.currentUser._id,product,{
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    console.log(res.data);
    return res.data
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
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
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
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
    return res.data
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
};

export const updateUserInDB = async (dispatch, userid, obj) => {
  try {
    console.log("apiCalls token : ", store.getState().user.currentUser.accessToken );
    const res = await axios.put("http://localhost:3030/api/users/" + userid, obj, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    dispatch(updateUser(res.data.body))
    return res.data;
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
};


//------------------------------------Payment-api------------------------------------------------//

export const pay = async (stripeToken, amount) => {
  try {
    console.log("in api calls pay method !");
    const res = await axios.post("http://localhost:3030/api/checkout/payment", { tokenId: stripeToken, amount: amount} )
    console.log(res.data.body);
    return res.data
  } catch (error) {
    console.log(error);
    if(error.response) {
      return error.response;
    }
    if (error.request) {
      return { ...error.request.data, status: 400 }
    }
  }
};