import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteInstrument } from './thunk';
import { InstrumentDeleteState } from '../../../types/instruments/delete';
import { InstrumentsListStatus } from '../../../enums/instruments/list';

const initialState: InstrumentDeleteState = {
    data: null,
    status: InstrumentsListStatus.IDLE,
    error: null,
};

const instrumentDeleteSlice = createSlice({
    name: 'instrumentDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteInstrument.pending, (state) => {
                state.status = InstrumentsListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteInstrument.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = InstrumentsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteInstrument.rejected, (state, action: PayloadAction<any>) => {
                state.status = InstrumentsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default instrumentDeleteSlice.reducer;
