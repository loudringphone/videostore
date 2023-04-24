import { createSlice } from '@reduxjs/toolkit';

const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState: { 
    query: null, 
    searchHistory: []
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
      state.searchHistory.push(action.payload);
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    }
  }
});

export const { setSearchQuery, clearSearchHistory } = searchQuerySlice.actions;

export default searchQuerySlice.reducer;