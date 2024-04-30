import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartSlice";
import userReducer from "../slice/userSlice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  cartData: cartReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
