import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InstrumentUpdateState } from '../../../types/instruments/update';
import { InstrumentsListStatus } from '../../../enums/instruments/list';
import { updateInstrument } from './thunk';

const initialState: InstrumentUpdateState = {
    data: null,
    status: InstrumentsListStatus.IDLE,
    error: null,
};

const instrumentUpdateSlice = createSlice({
    name: 'instrumentUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateInstrument.pending, (state) => {
                state.status = InstrumentsListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateInstrument.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = InstrumentsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateInstrument.rejected, (state, action: PayloadAction<any>) => {
                state.status = InstrumentsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default instrumentUpdateSlice.reducer;