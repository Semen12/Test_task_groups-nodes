// src/store/slices/groupsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api.ts';
import { Group, Node } from '../../types';

interface GroupsState {
    groups: Group[];
    selectedGroupId: number | null;
    selectedNode: Node | null;
    loading: boolean;
    error: string | null;
}

const initialState: GroupsState = {
    groups: [],
    selectedGroupId: null,
    selectedNode: null,
    loading: false,
    error: null,
};

// Thunk
export const fetchGroups = createAsyncThunk<Group[]>('groups/fetch', async () => {
    const response = await api.getGroups();
    return response.data.map((group: any) => ({
        ...group,
        nodes: JSON.parse(group.nodes),
    }));
});

// Slice
const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        setSelectedGroup: (state, action: PayloadAction<number>) => {
            state.selectedGroupId = action.payload;
            state.selectedNode = null;
        },
        setSelectedNode: (state, action: PayloadAction<Node>) => {
            state.selectedNode = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGroups.pending, state => {
                state.loading = true;
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.loading = false;
                state.groups = action.payload;
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Ошибка при загрузке групп';
            });
    },
});

export const { setSelectedGroup, setSelectedNode } = groupsSlice.actions;
export default groupsSlice.reducer;
