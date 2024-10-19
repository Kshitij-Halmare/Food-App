import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      // Directly push data into the draft state (handled by Immer)
      return action.payload;  // This replaces the state entirely
    }
  }
});

// Export the action
export const { setDataProduct } = productSlice.actions;

// Export the reducer (default export)
export default productSlice.reducer;
