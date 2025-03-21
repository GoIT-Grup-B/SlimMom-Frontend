// redux/dailySummary/dailySummaryOps.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://slimmom-backend-s8n8.onrender.com';

// Günlük kalori ihtiyacını hesapla
export const fetchDailyRate = createAsyncThunk(
  'dailySummary/fetchDailyRate',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/daily-calory-needs`,
        userData,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Günlük kalori ihtiyacı hesaplanamadı',
      );
    }
  },
);

// Belirli bir tarihte tüketilen kalorileri getir
export const fetchDailyCalories = createAsyncThunk(
  'dailySummary/fetchDailyCalories',
  async (date, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    if (!token) return rejectWithValue('Kullanıcı oturumu bulunamadı');

    try {
      const response = await axios.get(`${API_URL}/user/day-info`, {
        params: { date },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Günlük kalori verileri alınamadı',
      );
    }
  },
);
