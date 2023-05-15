
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartSlice from "./slices/cartSlice";
import searchHistorySlice from './slices/searchHistorySlice';
import wishlistSlice from "./slices/wishlistSlice";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['searchHistory', 'cart', 'wishlist']
  };
  
  const persistedReducer = persistReducer(persistConfig, combineReducers({
    cart: cartSlice,
    searchHistory: searchHistorySlice,
    wishlist: wishlistSlice,
  }));
  
  export const store = configureStore({
    reducer: persistedReducer,
  });
  
  export const persistor = persistStore(store);
