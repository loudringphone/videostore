import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : [];


const searchHistorySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    addSearchQuery: (state, action) => {
      const query = action.payload.trim().toLowerCase();
      if (query.length > 0 && !state.includes(query)) {
        state.unshift(query);
      }
    },
    clearSearchHistory: (state) => {
      return [];
    },
  },
});

export const { addSearchQuery, clearSearchHistory } = searchHistorySlice.actions;

export default searchHistorySlice.reducer;