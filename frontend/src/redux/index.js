import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./useSlice";
import productSliceReducer from "./productSlice.jsx"; // Import correctly (no curly braces)
import themeReducer from "./Thememode"
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    product: productSliceReducer,
    theme:themeReducer
  },
});
