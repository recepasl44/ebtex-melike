import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFinanceNotes } from './thunk';
import { ListFinanceNotesResponse, FinanceNote } from '../../../types/financeNotes/list';

interface FinanceNotesState {
    data: FinanceNote[];
    current_page: number;
    total: number;
    per_page: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: FinanceNotesState = {
    data: [],
    current_page: 1,
    total: 0,
    per_page: 25,
    status: 'idle',
    error: null,
};

const financeNotesSlice = createSlice({
    name: 'financeNotes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFinanceNotes.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(
            fetchFinanceNotes.fulfilled,
            (state, action: PayloadAction<ListFinanceNotesResponse>) => {
                state.status = 'succeeded';
                state.data = action.payload.data;
                state.current_page = action.payload.current_page;
                state.total = action.payload.total;
                state.per_page = action.payload.per_page;
            }
        );
        builder.addCase(fetchFinanceNotes.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export default financeNotesSlice.reducer;