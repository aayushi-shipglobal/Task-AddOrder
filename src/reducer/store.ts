import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import buyerReducer from './buyerSlice';
import orderReducer from './orderSlice'; 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['buyerDetails', 'orderDetails'],
};

const persistedBuyerReducer = persistReducer(persistConfig, buyerReducer);
const persistedOrderReducer = persistReducer(persistConfig, orderReducer);

const store = configureStore({
  reducer: {
    buyerDetails: persistedBuyerReducer,
    orderDetails: persistedOrderReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
