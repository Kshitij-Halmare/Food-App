import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Helper function to load cart items from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cartItems");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.error("Could not load cart from localStorage", e);
    return [];
  }
};

// Helper function to save cart items to localStorage
const saveCartToLocalStorage = (cartItem) => {
  try {
    const serializedCart = JSON.stringify(cartItem);
    localStorage.setItem("cartItems", serializedCart);
  } catch (e) {
    console.error("Could not save cart to localStorage", e);
  }
};

// Utility function to calculate totals
const calculateTotals = (cartItems) => {
  const totalQty = cartItems.reduce((qty, item) => qty + item.qty, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.total, 0);
  return { totalQty, totalPrice };
};

// Initial state
const initialState = {
  products: [],
  cartItem: loadCartFromLocalStorage(), // Load cart from localStorage on initialization
  ...calculateTotals(loadCartFromLocalStorage()), // Recalculate totals from the loaded cart
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Set product data
    setDataProduct: (state, action) => {
      state.products = action.payload;
    },

    // Increase item quantity in cart
    increaseCartItems: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItem.find(cart => cart.id === item.id);

      if (existingItem) {
        existingItem.qty += 1;
        existingItem.total += parseFloat(item.price);
      }

      const { totalQty, totalPrice } = calculateTotals(state.cartItem);
      state.totalQty = totalQty;
      state.totalPrice = totalPrice;

      saveCartToLocalStorage(state.cartItem);
    },

    // Add item to the cart
    addCartItems: (state, action) => {
      const item = action.payload;
      const itemPrice = parseFloat(item.price);
      const existingItem = state.cartItem.find(cart => cart.id === item.id);

      if (existingItem) {
        toast("Item is present in the cart");
      } else {
        toast("One Item added to Cart");
        state.cartItem.push({ ...item, qty: 1, total: itemPrice });
      }

      const { totalQty, totalPrice } = calculateTotals(state.cartItem);
      state.totalQty = totalQty;
      state.totalPrice = totalPrice;

      saveCartToLocalStorage(state.cartItem);
    },

    // Subtract item from the cart
    subtractCartItems: (state, action) => {
      const item = action.payload;
      const itemPrice = parseFloat(item.price);

      const existingItem = state.cartItem.find(cart => cart.id === item.id);

      if (existingItem) {
        if (existingItem.qty === 1) {
          state.cartItem = state.cartItem.filter(cartItem => cartItem.id !== item.id);
        } else {
          existingItem.qty -= 1;
          existingItem.total -= itemPrice;
        }
      }

      const { totalQty, totalPrice } = calculateTotals(state.cartItem);
      state.totalQty = totalQty;
      state.totalPrice = totalPrice;

      saveCartToLocalStorage(state.cartItem);
    },

    // Remove item from the cart
    deleteCartItems: (state, action) => {
      toast("One Item Deleted");
      const itemId = action.payload;
      state.cartItem = state.cartItem.filter(item => item.id !== itemId);

      const { totalQty, totalPrice } = calculateTotals(state.cartItem);
      state.totalQty = totalQty;
      state.totalPrice = totalPrice;

      saveCartToLocalStorage(state.cartItem);
    },
  }
});

// Export actions
export const {
  increaseCartItems,
  subtractCartItems,
  setDataProduct,
  addCartItems,
  deleteCartItems
} = productSlice.actions;

// Export reducer
export default productSlice.reducer;

// Selector to get total quantity and total price from state
export const selectCartTotals = (state) => ({
  totalQty: state.product.totalQty,
  totalPrice: state.product.totalPrice,
});
