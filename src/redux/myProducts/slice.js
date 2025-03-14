export const myProductsSlice = createSlice({
  name: "myProducts",
  initialState: {
    items: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push({
        id: Date.now(),
        name: action.payload.name,
        weight: action.payload.weight,
        date: action.payload.date.toISOString().split("T")[0],
      });
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});
