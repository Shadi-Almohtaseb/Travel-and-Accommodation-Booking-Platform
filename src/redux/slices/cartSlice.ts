import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems') || '') : [];

const initialState = {
  cart: cartItems,
  isError: false,
  loading: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => {
      state.cart = [];
      state.loading = false;
      state.isError = false;
    },
    addItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cart.find((x: any) => x.id === item.id);
      if (existItem) {
        state.cart = state.cart.map((x: any) => x.id === existItem.id ? item : x);
        toast.error("Item already in the cart");
      } else {
        state.cart = [...state.cart, item];
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.cart = state.cart.filter((x: any) => x.id !== item.id);
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
  },
});

export const { reset, addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
