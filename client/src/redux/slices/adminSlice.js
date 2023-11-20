import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    userInfo: userInfoFromStorage,
  },
  reducers: {
    getInfo: (state, action) => {
      return state.userInfo;
    },
    addInfo: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.userInfo = action.payload;
    },
    removeInfo: (state, action) => {
      localStorage.removeItem("userInfo");
      state.userInfo = {};
    },
  },
});

export const { addInfo, removeInfo, getInfo } = adminSlice.actions;
export default adminSlice.reducer;
