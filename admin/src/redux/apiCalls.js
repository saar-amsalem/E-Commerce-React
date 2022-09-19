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
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logoutuser = (dispatch) => {
  dispatch(logout());
};

export const createUser = async (user) => {
  try {
    await axios.post("http://localhost:3030/api/auth/register", user);
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
};

export const getUserByID = async (id) => {
  try {
    const res = await axios.get(BASE_URL + "users/find/" + id, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (userid, obj) => {
  try {
    const res = await axios.put(BASE_URL + "users/" + userid, obj, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (userid) => {
  try {
    await axios.delete(BASE_URL + "users/" + userid, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserStats = async () => {
  try {
    const res = await axios.get("http://localhost:3030/api/users/stats", {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getOnline = async () => {
  try {
    const res = await axios.get(BASE_URL + "users/online", {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

//----------------Products-api-----------------//

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get(BASE_URL + "products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
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
  } catch (err) {
    dispatch(deleteProductFailure());
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
  } catch (err) {
    dispatch(updateProductFailure());
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
  } catch (err) {
    dispatch(addProductFailure());
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
  } catch {}
};

export const deleteOrder = async (id) => {
  try {
    await axios.delete(BASE_URL + "orders" + id, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOrderByUserId = async (id) => {
  try {
    const res = await axios.get(BASE_URL + "orders/find/" + id, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
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
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateOrder = async (id, order) => {
  try {
    await axios.put(BASE_URL + "orders/" + id, order, {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getFiveNewOrders = async () => {
  try {
    const res = await axios.get(BASE_URL + "orders/stats", {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getOrderStats = async () => {
  try {
    const res = await axios.get(BASE_URL + "orders/income", {
      headers: {
        token: `Bearer ${store.getState().user.currentUser.accessToken}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSalesPerformance = async (id) => {
  try {
    const res = await axios.get(
      "http://localhost:3030/api/orders/income?pid=" + id,
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
  } catch (err) {
    console.log(err);
  }
};

export const getAllTimeSales = async (id) => {
  try {
    const res = await axios.get(
      "http://localhost:3030/api/orders/alltime?pid=" + id,
      {
        headers: {
          token: `Bearer ${store.getState().user.currentUser.accessToken}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
