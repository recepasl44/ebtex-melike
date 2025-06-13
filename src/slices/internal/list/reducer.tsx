import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import InternalListStatus from '../../../enums/internal/list';
import { InternalSummaryState, InternalSummaryResponse } from '../../../types/internal/list';
import { fetchInternalSummary } from './thunk';

const initialState: InternalSummaryState = {
    data: null,
    status: InternalListStatus.IDLE,
    error: null,
};

const internalSummarySlice = createSlice({
    name: 'internalSummary',
    initialState,
    reducers: {
        resetInternalSummaryState(state) {
            state.data = null;
            state.status = InternalListStatus.IDLE;
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchInternalSummary.pending, state => {
                state.status = InternalListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchInternalSummary.fulfilled,
                (state, action: PayloadAction<InternalSummaryResponse>) => {
                    state.status = InternalListStatus.SUCCEEDED;
                    state.data = action.payload.data;
                }
            )
            .addCase(fetchInternalSummary.rejected, (state, action) => {
                state.status = InternalListStatus.FAILED;
                state.error = action.payload as string;
            });
    },
});

export const { resetInternalSummaryState } = internalSummarySlice.actions;
export default internalSummarySlice.reducer;
