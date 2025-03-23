import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Kullanıcının kendi günlük kalori ihtiyacını çek
export const fetchUserDailyNeeds = createAsyncThunk(
  'dailySummary/fetchUserDailyNeeds',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get('/user/my-daily-calory-needs', {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      const result = response.data.data;

      localStorage.setItem('dailyRate', JSON.stringify(result));

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
