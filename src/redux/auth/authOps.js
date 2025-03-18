import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setToken } from './authSlice';

const API_URL = 'https://slimmom-backend-s8n8.onrender.com';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const token = response.data.data.accessToken;

      dispatch(setToken(token));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Otomatik ekleme

      return response.data;
    } catch (error) {
      console.error('Axios hata yanıtı:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(`${API_URL}/auth/logout`, null, {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Logout failed');
    }
  },
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth; // Token state'ten alınıyor
    if (!token) return rejectWithValue('No token available');

    try {
      const response = await axios.get(`${API_URL}/users/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Refresh failed');
    }
  },
);
