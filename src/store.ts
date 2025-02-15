import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import orderReducer from "./reducer/orderSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["order"],
};

const persistedReducer = persistReducer(persistConfig, orderReducer);

const store = configureStore({
  reducer: {
    order: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
