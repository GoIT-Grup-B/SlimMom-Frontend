import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser, refreshUser } from "./authOps";

export const initialState = {
  user: {
    name: null,
    email: null,
    password: "",
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isLoggedIn = !!action.payload; // Token varsa giriş yapıldı
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Reducers
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || "Login failed";
        state.isLoggedIn = false;
      })

      // Register Reducers
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload || "Registration failed";
        state.isLoggedIn = false;
      })

      // Logout Reducers
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload || "Logout failed";
      })

      // Refresh Reducers
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.error = action.payload || "Refresh failed";
        state.isRefreshing = false;
      })
      .addCase("persist/REHYDRATE", (state, action) => {
        // Redux Persist yeniden yükleme işlemi için varsayılan davranış
        return action.payload ? { ...state, ...action.payload.auth } : state;
      });
  },
});
export const { setToken } = authSlice.actions;

export default authSlice.reducer;
