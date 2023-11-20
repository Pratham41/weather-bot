import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000";

const fetchUsers = createAsyncThunk("allUsers/fetchUsers", async () => {
  const { data } = await axios.get(`${API_URL}/bot/users`);
  return data;
});

const blockUser = createAsyncThunk("allUsers/blockUser", async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.put(
    `${API_URL}/bot/users?id=${userData.userId}`,
    { flag: userData.flag },
    config
  );
  return data;
});

const deleteUser = createAsyncThunk("allUsers/deleteUser", async (userId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.delete(
    `${API_URL}/bot/users?id=${userId}`,
    {},
    config
  );
  return data;
});


const initialState = {
  allUsers: [],
  successDelete: false,
  successUpdate: false,
  loadingDelete: false,
  loadingUpdate: false,
  loading: true,
  error: null,
};

const userSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loadingDelete = true;
        state.successDelete = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loadingDelete = false;
        state.successDelete = true;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loadingDelete = false;
        state.successDelete = false;
      })
      .addCase(blockUser.pending, (state) => {
        state.loadingUpdate = true;
        state.successUpdate = false;
      })
      .addCase(blockUser.fulfilled, (state) => {
        state.loadingUpdate = false;
        state.successUpdate = true;
      })
      .addCase(blockUser.rejected, (state) => {
        state.loadingUpdate = false;
        state.successUpdate = false;
      });
  },
});

export default userSlice.reducer;
export { fetchUsers, blockUser, deleteUser };
