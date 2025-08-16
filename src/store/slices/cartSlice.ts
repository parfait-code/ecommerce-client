import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../../types';

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    promoCode: string | null;
    discount: number;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

const initialState: CartState = {
    items: [],
    isOpen: false,
    promoCode: null,
    discount: 0,
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
};

const calculateTotals = (state: CartState) => {
    state.subtotal = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    // Free shipping over $100
    state.shipping = state.subtotal >= 100 ? 0 : 10;

    // Calculate discount
    if (state.promoCode === 'SAVE20') {
        state.discount = state.subtotal * 0.2;
    } else if (state.promoCode === 'SAVE10') {
        state.discount = state.subtotal * 0.1;
    } else {
        state.discount = 0;
    }

    // Calculate tax (10%)
    const afterDiscount = state.subtotal - state.discount;
    state.tax = afterDiscount * 0.1;

    // Calculate total
    state.total = afterDiscount + state.shipping + state.tax;
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

            calculateTotals(state);
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
            calculateTotals(state);
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

            if (item) {
                if (quantity > 0) {
                    item.quantity = quantity;
                } else {
                    // Remove item if quantity is 0
                    state.items = state.items.filter(i => i !== item);
                }
            }
            calculateTotals(state);
        },

        applyPromoCode: (state, action: PayloadAction<string>) => {
            state.promoCode = action.payload;
            calculateTotals(state);
        },

        removePromoCode: (state) => {
            state.promoCode = null;
            state.discount = 0;
            calculateTotals(state);
        },

        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },

        openCart: (state) => {
            state.isOpen = true;
        },

        closeCart: (state) => {
            state.isOpen = false;
        },

        clearCart: (state) => {
            state.items = [];
            state.promoCode = null;
            state.discount = 0;
            state.subtotal = 0;
            state.shipping = 0;
            state.tax = 0;
            state.total = 0;
        },

        addMultipleToCart: (state, action: PayloadAction<CartItem[]>) => {
            action.payload.forEach(newItem => {
                const existingItem = state.items.find(
                    item =>
                        item.product.id === newItem.product.id &&
                        item.selectedSize === newItem.selectedSize &&
                        item.selectedColor === newItem.selectedColor
                );

                if (existingItem) {
                    existingItem.quantity += newItem.quantity;
                } else {
                    state.items.push(newItem);
                }
            });
            calculateTotals(state);
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    applyPromoCode,
    removePromoCode,
    toggleCart,
    openCart,
    closeCart,
    clearCart,
    addMultipleToCart
} = cartSlice.actions;

export default cartSlice.reducer;