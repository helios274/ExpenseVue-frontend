import { createSlice } from "@reduxjs/toolkit";

var initialState = {
  userData: null,
  token: "",
};

const data = localStorage.getItem("auth");

if (data) {
  initialState = JSON.parse(data);
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.userData = actions.payload.userData;
      state.token = actions.payload.token;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.userData = null;
      state.token = "";
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
