import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import searchQuerySlice from './slices/searchQuerySlice';
import searchHistorySlice from './slices/searchHistorySlice';

const store = configureStore({
    reducer:{
        cart: cartSlice,
        searchQuery: searchQuerySlice,
        searchHistory: searchHistorySlice,
    }
})

export default store