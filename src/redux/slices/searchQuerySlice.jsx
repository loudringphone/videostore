import { createSlice } from '@reduxjs/toolkit';

const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState: null,
  reducers: {
    setSearchQuery: (state, action) => {
      return action.payload;
    }
  }
});

export const { setSearchQuery } = searchQuerySlice.actions;

export default searchQuerySlice.reducer;