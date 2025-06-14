import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchInstrument } from './thunk';
import { InstrumentShowState } from '../../../types/instruments/show';
import { InstrumentsListStatus } from '../../../enums/instruments/list';
import type { Instrument } from '../../../types/instruments/list';

const initialState: InstrumentShowState = {
    data: null,
    status: InstrumentsListStatus.IDLE,
    error: null,
};

const instrumentShowSlice = createSlice({
    name: 'instrumentShow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInstrument.pending, (state) => {
                state.status = InstrumentsListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchInstrument.fulfilled, (state, action: PayloadAction<Instrument>) => {
                state.status = InstrumentsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchInstrument.rejected, (state, action) => {
                state.status = InstrumentsListStatus.FAILED;
                state.error = action.error?.message || 'Enstrüman getirilemedi.';
            });
    },
});

export default instrumentShowSlice.reducer;
