
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get('https://quikkmart.onrender.com/cart', { withCredentials: true });
  return response.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async (item) => {
  const response = await axios.post('https://quikkmart.onrender.com/cart/add', item, { withCredentials: true });
  return response.data;
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async (item) => {
  const response = await axios.put('https://quikkmart.onrender.com/cart/update', item, { withCredentials: true });
  return response.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId) => {
  const response = await axios.delete(`https://quikkmart.onrender.com/cart/remove/${productId}`, { withCredentials: true });
  return response.data;
});

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  const response = await axios.delete('https://quikkmart.onrender.com/cart/clear', { withCredentials: true });
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.loading = false;
      })
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;

