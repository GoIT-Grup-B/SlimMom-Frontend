import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const diaryProductsListItemSlice = createSlice({
  name: "diaryProductsListItem",
  initialState,
  reducers: {
    addDiaryProduct: (state, action) => {
      state.items.push({
        id: Date.now(),
        name: action.payload.name,
        weight: action.payload.weight,
        calories: action.payload.calories, // Kalori bilgisi ekleyelim
        date: action.payload.date.toISOString().split("T")[0],
      });
    },
    removeDiaryProduct: (state, action) => {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addDiaryProduct, removeDiaryProduct } =
  diaryProductsListItemSlice.actions;
export default diaryProductsListItemSlice.reducer;
