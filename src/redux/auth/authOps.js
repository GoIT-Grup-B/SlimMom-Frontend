import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setToken } from './authSlice';
import { startLoading, stopLoading } from '../Loader/loaderSlice';

const API_URL = 'https://slimmom-backend-s8n8.onrender.com';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const token = response.data?.data?.accessToken || response.data?.token;

      if (!token) {
        throw new Error('No token received from API!');
      }

      dispatch(setToken(token));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return response.data;
    } catch (error) {
      console.error('Axios hata yanıtı:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Login failed');
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { token } = getState().auth; // Token state'ten alınıyor
    if (!token) return rejectWithValue('No token available');

    try {
      dispatch(startLoading());
      const response = await axios.get(`${API_URL}/users/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Refresh failed');
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      console.warn('Logout failed: No token found in Redux store!');
      return rejectWithValue('No token found');
    }

    try {
      dispatch(startLoading());
      const response = await axios.post(`${API_URL}/auth/logout`, null, {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Logout failed');
    } finally {
      dispatch(stopLoading());
    }
  },
);
