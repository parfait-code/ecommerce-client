// src/store/slices/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Address, Order, UserPreferences } from '../../types/user';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    addresses: Address[];
    orders: Order[];
    preferences: UserPreferences;
    loading: boolean;
    error: string | null;
}

const defaultPreferences: UserPreferences = {
    language: 'en',
    currency: 'USD',
    emailNotifications: {
        orders: true,
        promotions: true,
        newsletter: false,
        productUpdates: false,
    },
    smsNotifications: false,
};

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    addresses: [],
    orders: [],
    preferences: defaultPreferences,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ user: User; addresses: Address[]; orders: Order[] }>) => {
            state.user = action.payload.user;
            state.addresses = action.payload.addresses;
            state.orders = action.payload.orders;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.addresses = [];
            state.orders = [];
            state.preferences = defaultPreferences;
            state.error = null;
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        addAddress: (state, action: PayloadAction<Address>) => {
            state.addresses.push(action.payload);
        },
        updateAddress: (state, action: PayloadAction<Address>) => {
            const index = state.addresses.findIndex(a => a.id === action.payload.id);
            if (index !== -1) {
                state.addresses[index] = action.payload;
            }
        },
        deleteAddress: (state, action: PayloadAction<string>) => {
            state.addresses = state.addresses.filter(a => a.id !== action.payload);
        },
        updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
            state.preferences = { ...state.preferences, ...action.payload };
        },
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload);
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    updateUser,
    addAddress,
    updateAddress,
    deleteAddress,
    updatePreferences,
    addOrder,
} = authSlice.actions;

export default authSlice.reducer;

// -----------------------------------
// Update src/store/store.ts to include authSlice:
// Add this import: import authReducer from './slices/authSlice';
// Add to reducer: auth: authReducer,