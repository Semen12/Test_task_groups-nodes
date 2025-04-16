// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import groupsReducer from './slices/groupsSlice.ts';
import metricsReducer from './slices/metricsSlice.ts';

export const store = configureStore({
    reducer: {
        groups: groupsReducer,
        metrics: metricsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;