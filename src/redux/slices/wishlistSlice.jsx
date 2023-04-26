import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.query = action.payload;
      state.wishlist.push(action.payload);
    },
  }
});

export const wishlistActions = wishlistSlice.actions

export default wishlistSlice.reducer