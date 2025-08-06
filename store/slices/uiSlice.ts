// store/slices/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    sidebarOpen: boolean;
    cartDrawerOpen: boolean;
    searchModalOpen: boolean;
    theme: 'light' | 'dark';
    notifications: Array<{
        id: string;
        type: 'success' | 'error' | 'warning' | 'info';
        message: string;
    }>;
}

const initialState: UIState = {
    sidebarOpen: false,
    cartDrawerOpen: false,
    searchModalOpen: false,
    theme: 'light',
    notifications: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        toggleCartDrawer: (state) => {
            state.cartDrawerOpen = !state.cartDrawerOpen;
        },
        toggleSearchModal: (state) => {
            state.searchModalOpen = !state.searchModalOpen;
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
        addNotification: (state, action) => {
            state.notifications.push({
                id: Date.now().toString(),
                ...action.payload,
            });
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(n => n.id !== action.payload);
        },
    },
});

export const {
    toggleSidebar,
    toggleCartDrawer,
    toggleSearchModal,
    setTheme,
    addNotification,
    removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;