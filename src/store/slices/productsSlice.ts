// src/store/slices/productsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/src/types';
import { products as mockProducts } from '../../data/mockData';

interface ProductsState {
    items: Product[];
    filteredItems: Product[];
    selectedCategory: string | null;
    sortBy: 'price-asc' | 'price-desc' | 'name' | null;
    filters: {
        sizes: string[];
        colors: string[];
        priceRange: [number, number];
    };
}

const initialState: ProductsState = {
    items: mockProducts,
    filteredItems: mockProducts,
    selectedCategory: null,
    sortBy: null,
    filters: {
        sizes: [],
        colors: [],
        priceRange: [0, 500],
    },
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
            applyFilters(state);
        },
        setSortBy: (state, action: PayloadAction<ProductsState['sortBy']>) => {
            state.sortBy = action.payload;
            applySorting(state);
        },
        setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
            applyFilters(state);
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
            state.selectedCategory = null;
            state.sortBy = null;
            state.filteredItems = state.items;
        },
    },
});

function applyFilters(state: ProductsState) {
    let filtered = state.items;

    // Category filter
    if (state.selectedCategory) {
        filtered = filtered.filter(p => p.category === state.selectedCategory);
    }

    // Size filter
    if (state.filters.sizes.length > 0) {
        filtered = filtered.filter(p =>
            p.sizes.some(s => state.filters.sizes.includes(s.value) && s.available)
        );
    }

    // Color filter
    if (state.filters.colors.length > 0) {
        filtered = filtered.filter(p =>
            p.colors.some(c => state.filters.colors.includes(c.name) && c.available)
        );
    }

    // Price filter
    filtered = filtered.filter(p =>
        p.price >= state.filters.priceRange[0] &&
        p.price <= state.filters.priceRange[1]
    );

    state.filteredItems = filtered;
    applySorting(state);
}

function applySorting(state: ProductsState) {
    if (!state.sortBy) return;

    const sorted = [...state.filteredItems];

    switch (state.sortBy) {
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    state.filteredItems = sorted;
}

export const { setCategory, setSortBy, setFilters, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;