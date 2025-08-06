// store/slices/productsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    rating: number;
}

interface ProductsState {
    products: Product[];
    featuredProducts: Product[];
    currentProduct: Product | null;
    isLoading: boolean;
    error: string | null;
    filters: {
        category: string;
        minPrice: number;
        maxPrice: number;
        searchQuery: string;
    };
}

const initialState: ProductsState = {
    products: [],
    featuredProducts: [],
    currentProduct: null,
    isLoading: false,
    error: null,
    filters: {
        category: '',
        minPrice: 0,
        maxPrice: 10000,
        searchQuery: '',
    },
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (filters?: Partial<ProductsState['filters']>) => {
        const response = await axios.get('/api/products', { params: filters });
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id: string) => {
        const response = await axios.get(`/api/products/${id}`);
        return response.data;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
                state.featuredProducts = action.payload.featured || [];
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Erreur lors du chargement des produits';
            })
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Produit non trouvé';
            });
    },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;

