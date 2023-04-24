import { createSlice } from '@reduxjs/toolkit';

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState: [],
  reducers: {
    addSearchQuery: (state, action) => {
      const query = action.payload.trim().toLowerCase();
      if (query.length > 0 && !state.includes(query)) {
        state.unshift(query);
        // if (state.length > 5) {
        //   state.pop();
        // }
      }
    },
    clearSearchHistory: (state) => {
      return [];
    },
  },
});

export const { addSearchQuery, clearSearchHistory } = searchHistorySlice.actions;

export default searchHistorySlice.reducer;
