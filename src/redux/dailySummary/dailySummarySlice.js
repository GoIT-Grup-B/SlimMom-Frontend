// redux/dailySummary/dailySummarySlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchDailyRate, fetchDailyCalories } from './dailySummaryOps';

const initialState = {
  dailyRate: 0,
  notAllowedFoods: [],
  consumedCalories: 0,
  leftCalories: 0,
  loading: false,
  error: null,
};

const dailySummarySlice = createSlice({
  name: 'dailySummary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchDailyRate için
      .addCase(fetchDailyRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyRate.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyRate = action.payload.dailyRate;
        state.notAllowedFoods = action.payload.notAllowedFoods;
      })
      .addCase(fetchDailyRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchDailyCalories için
      .addCase(fetchDailyCalories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyCalories.fulfilled, (state, action) => {
        state.loading = false;
        state.consumedCalories = action.payload.consumedCalories;
        state.leftCalories = action.payload.leftCalories;
      })
      .addCase(fetchDailyCalories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dailySummarySlice.reducer;
