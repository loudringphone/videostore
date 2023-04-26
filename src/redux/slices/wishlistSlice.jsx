import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!state.includes(action.payload)) {
        state.unshift(action.payload);
      };
    },
    removeItem: (state, action) => {
      if (state.includes(action.payload)) {
        const index = state.indexOf(action.payload);
        state.splice(index, 1);
      };
    },
  },
});

export const wishlistActions = wishlistSlice.actions

export default wishlistSlice.reducer