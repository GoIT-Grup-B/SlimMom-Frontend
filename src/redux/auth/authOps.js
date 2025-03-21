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

      // API'den gelen token'ın nerede olduğuna dikkat et!
      const token = response.data?.data?.accessToken || response.data?.token;

      if (!token) {
        throw new Error('No token received from API!');
      }

      dispatch(setToken(token)); // Redux'a kaydediyoruz
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return response.data;
    } catch (error) {
      console.error('Axios hata yanıtı:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Login failed');
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

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Redux store'dan token al
    if (!token) {
      console.warn('Logout failed: No token found in Redux store!');
      return rejectWithValue('No token found');
    }

    try {
      const response = await axios.post(`${API_URL}/auth/logout`, null, {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`, // Tokenı doğru formatta gönderiyoruz
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Logout failed');
    }
  },
);
