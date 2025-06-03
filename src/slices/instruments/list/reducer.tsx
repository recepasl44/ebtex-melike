import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InstrumentListState, InstrumentListResponse } from '../../../types/instruments/list';
import { InstrumentsListStatus } from '../../../enums/instruments/list';
import { fetchInstrumentList } from './thunk';

const initialState: InstrumentListState = {
    data: null,
    meta: null,
    status: InstrumentsListStatus.IDLE,
    error: null,
};

const instrumentListSlice = createSlice({
    name: 'instrumentList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInstrumentList.pending, (state) => {
                state.status = InstrumentsListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchInstrumentList.fulfilled, (state, action: PayloadAction<InstrumentListResponse>) => {
                state.status = InstrumentsListStatus.SUCCEEDED;
                state.data = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(fetchInstrumentList.rejected, (state, action: PayloadAction<any>) => {
                state.status = InstrumentsListStatus.FAILED;
                state.error = action.payload || 'Fetch instrument list failed';
            });
    },
});

export default instrumentListSlice.reducer;