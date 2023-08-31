import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import axios from "axios";
import { store } from "./store";

const BASE_URL = "http://localhost:3030/api/";

//----------------User-api--------------------------//

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(BASE_URL + "auth/login", user);
    dispatch(loginSuccess(res.data.body));
    return res.data
  } catch (error) {
    console.log(error);
    dispatch(loginFailure());
    return error.response.data
  }
};

export const logoutuser = (dispatch) => {
  dispatch(logout());
};

export const createUser = async (user) => {
  try {
    await axios.post(BASE_URL + "auth/register", user);
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const getUsers = async () => {
  try {
    console.log(store.getState().user.currentUser.accessToken);
    const res = await axios.get(BASE_URL + "users", {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const getFiveNewUsers = async () => {
  try {
    const res = await axios.get(BASE_URL + "users/?new=true", {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const getUserByID = async (id) => {
  try {
    const res = await axios.get(BASE_URL + "users/find/" + id, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data.body;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const updateUser = async (userid, obj) => {
  try {
    const res = await axios.put(BASE_URL + "users/" + userid, obj, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data.body;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const deleteUser = async (userid) => {
  try {
    const res = await axios.delete(BASE_URL + "users/" + userid, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const getUserStats = async () => {
  try {
    const res = await axios.get(BASE_URL + "users/stats", {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const getOnline = async () => {
  try {
    const res = await axios.get(BASE_URL + "users/online", {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data.body;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

//----------------Products-api-----------------//

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get(BASE_URL + "products");
    dispatch(getProductSuccess(res.data.body));
  } catch (error) {
    dispatch(getProductFailure(error.response.data.message));
    console.log(error.response.data);
    return error.response.data
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await axios.delete(BASE_URL + `products/${id}`, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure(error.response.data.message));
    console.log(error.response.data);
    return error.response.data
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    axios.put(BASE_URL + "products/" + id, product, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    dispatch(updateProductSuccess({ id, product }));
  } catch (error) {
    dispatch(updateProductFailure());
    console.log(error);
    return error.response.data
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await axios.post(BASE_URL + `products`, product, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    console.log(res.data);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
    console.log(error);
    return error.response.data
  }
};

/*----------------------- orders api ------------------------*/

export const getOrders = async () => {
  try {
    const res = await axios.get(BASE_URL + "orders", {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const deleteOrder = async (id) => {
  try {
    await axios.delete(BASE_URL + "orders" + id, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const getOrderByUserId = async (id) => {
  try {
    const res = await axios.get(BASE_URL + "orders/find/" + id, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    console.log(res.data.body);
    return res.data.body;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const getOrderByOrderId = async (id) => {
  try {
    const res = await axios.get(BASE_URL + "orders/findorder/" + id, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    console.log(res.data);
    return res.data.body;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const updateOrder = async (id, order) => {
  try {
    console.log(order);
    console.log(id);
    const res = await axios.put(BASE_URL + "orders/" + id, order, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const getFiveNewOrders = async () => {
  try {
    console.log(store.getState().user.currentUser.accessToken);
    const res = await axios.get(BASE_URL + "orders/stats", {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const getOrderStats = async () => {
  try {
    const res = await axios.get(BASE_URL + "orders/income", {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const getOrderStatsPerProduct = async (id) => {
  try {
    const res = await axios.get(BASE_URL + "orders/income?pid=" + id, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const getSalesPerformancePerProduct = async (id) => {
  try {
    const res = await axios.get(
      BASE_URL + "orders/alltimePerProduct?pid=" + id,
      {
        headers: {
          token: `Bearer ${store.getState().user.currentUser.accessToken}`,
        },
      }
    );
    console.log(res.data);
    const list = res.data.sort((a, b) => {
      return a._id - b._id;
    });
    return list;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const getAllTimeSales = async () => {
  try {
    const res = await axios.get(
      BASE_URL + "orders/alltime",
      {
        headers: {
          token: `Bearer ${store.getState().user.currentUser.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};
