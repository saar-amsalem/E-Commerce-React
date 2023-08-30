import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    token: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.token = action.payload.accessToken;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutStart: (state) => {
      state.isFetching = true
    },
    logoutSuccess: (state)=> {
      state.isFetching = false;
      state.currentUser = null;
      state.token = null;
    },
    logoutFailure: (state)=> {
      state.isFetching = false;
      state.error = true
    },
  },
});

export const { loginStart, loginSuccess, loginFailure,logoutSuccess: logoutfromuser,logoutStart,logoutFailure,token } = userSlice.actions;
export default userSlice.reducer;