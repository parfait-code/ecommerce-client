// src/store/slices/wishlistSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface WishlistState {
    items: Product[];
    lastAdded: string | null;
}

const initialState: WishlistState = {
    items: [],
    lastAdded: null,
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const exists = state.items.some(item => item.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
                state.lastAdded = action.payload.id;
            }
        },
        removeFromWishlist: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearWishlist: (state) => {
            state.items = [];
            state.lastAdded = null;
        },
        moveAllToCart: (state) => {
            // This will be handled in a thunk or saga
            state.items = [];
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    moveAllToCart
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
