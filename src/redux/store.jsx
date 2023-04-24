// import { configureStore } from "@reduxjs/toolkit";
// import cartSlice from "./slices/cartSlice";
// import searchQuerySlice from './slices/searchQuerySlice';
// import searchHistorySlice from './slices/searchHistorySlice';

// const store = configureStore({
//     reducer:{
//         cart: cartSlice,
//         searchQuery: searchQuerySlice,
//         searchHistory: searchHistorySlice,
//     }
// })

// export default store

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartSlice from "./slices/cartSlice";
import searchQuerySlice from './slices/searchQuerySlice';
import searchHistorySlice from './slices/searchHistorySlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['searchHistory']
  };
  
  const persistedReducer = persistReducer(persistConfig, combineReducers({
    cart: cartSlice,
    searchQuery: searchQuerySlice,
    searchHistory: searchHistorySlice,
  }));
  
  export const store = configureStore({
    reducer: persistedReducer,
  });
  
  export const persistor = persistStore(store);
