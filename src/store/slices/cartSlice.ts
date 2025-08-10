// src/store/slices/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '@/src/types';

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

const initialState: CartState = {
    items: [],
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{
            product: Product;
            selectedSize: string;
            selectedColor: string;
            quantity?: number;
        }>) => {
            const { product, selectedSize, selectedColor, quantity = 1 } = action.payload;

            const existingItem = state.items.find(
                item =>
                    item.product.id === product.id &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    product,
                    quantity,
                    selectedSize,
                    selectedColor,
                });
            }
        },
        removeFromCart: (state, action: PayloadAction<{
            productId: string;
            selectedSize: string;
            selectedColor: string;
        }>) => {
            const { productId, selectedSize, selectedColor } = action.payload;
            state.items = state.items.filter(
                item => !(
                    item.product.id === productId &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
                )
            );
        },
        updateQuantity: (state, action: PayloadAction<{
            productId: string;
            selectedSize: string;
            selectedColor: string;
            quantity: number;
        }>) => {
            const { productId, selectedSize, selectedColor, quantity } = action.payload;
            const item = state.items.find(
                item =>
                    item.product.id === productId &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
            );
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
