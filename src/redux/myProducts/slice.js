import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const myProductsSlice = createSlice({
  name: "myProducts",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push({
        id: Date.now(),
        name: action.payload.name,
        weight: action.payload.weight,
        date: action.payload.date.toISOString().split("T")[0], // YYYY-MM-DD formatı
      });
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addProduct, removeProduct } = myProductsSlice.actions;
export default myProductsSlice.reducer;
