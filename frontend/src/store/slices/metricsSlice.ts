// src/store/slices/metricsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api.ts';
import { Metric } from '../../types';

interface MetricsState {
    metrics: Metric[];
    loading: boolean;
    error: string | null;
}

const initialState: MetricsState = {
    metrics: [],
    loading: false,
    error: null,
};

export const fetchMetrics = createAsyncThunk<Metric[]>('metrics/fetch', async () => {
    const response = await api.getMetrics();
    return response.data.map((metric: any) => ({
        ...metric,
        node_info: JSON.parse(metric.node_info),
    }));
});

const metricsSlice = createSlice({
    name: 'metrics',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMetrics.pending, state => {
                state.loading = true;
            })
            .addCase(fetchMetrics.fulfilled, (state, action) => {
                state.loading = false;
                state.metrics = action.payload;
            })
            .addCase(fetchMetrics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Ошибка при загрузке метрик';
            });
    },
});

export default metricsSlice.reducer;
