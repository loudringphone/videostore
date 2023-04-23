import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import searchQuerySlice from './slices/searchQuerySlice';

const store = configureStore({
    reducer:{
        cart: cartSlice,
        searchQuery: searchQuerySlice,
    }
})

export default store