import { createSlice } from '@reduxjs/toolkit';
import { fetchUserDailyNeeds } from './dailySummaryOps';

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
      .addCase(fetchUserDailyNeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDailyNeeds.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.dailyRate = action.payload.dailyRate;
          state.notAllowedFoods = action.payload.notAllowedFoods;
        }
      })
      .addCase(fetchUserDailyNeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dailySummarySlice.reducer;
