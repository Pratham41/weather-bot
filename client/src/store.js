import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../src/redux/slices/userSlice";
import adminReducer from "../src/redux/slices/adminSlice";

const rootReducer = combineReducers({
  users: userReducer,
  admin: adminReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
