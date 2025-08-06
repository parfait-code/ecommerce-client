// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        products: productsReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

