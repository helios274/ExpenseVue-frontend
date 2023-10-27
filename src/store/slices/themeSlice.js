import { createSlice } from "@reduxjs/toolkit";
var initialState = {
  themeMode: "light",
};

const data = localStorage.getItem("theme");
if (data) {
  initialState = JSON.parse(data);
  document.querySelector("html").classList.add(initialState.themeMode);
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, actions) => {
      state.themeMode = actions.payload.themeMode;
      document.querySelector("html").classList.remove("dark", "light");
      document.querySelector("html").classList.add(state.themeMode);
      localStorage.setItem("theme", JSON.stringify(state));
    },
    // toggleLightTheme: (state) => {
    //   state.themeMode = "light";
    //   document.querySelector("html").classList.remove("dark");
    //   document.querySelector("html").classList.add(state.themeMode);
    //   localStorage.setItem("theme", JSON.stringify(state));
    // },
    // toggleDarkTheme: (state) => {
    //   state.themeMode = "dark";
    //   document.querySelector("html").classList.remove("light");
    //   document.querySelector("html").classList.add(state.themeMode);
    //   localStorage.setItem("theme", JSON.stringify(state));
    // },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
