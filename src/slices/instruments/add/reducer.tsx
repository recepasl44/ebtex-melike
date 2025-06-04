import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addInstrument } from './thunk';
import { InstrumentAddState } from '../../../types/instruments/add';
import { InstrumentsListStatus } from '../../../enums/instruments/list';

const initialState: InstrumentAddState = {
    data: null,
    status: InstrumentsListStatus.IDLE,
    error: null,
};

const instrumentAddSlice = createSlice({
    name: 'instrumentAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addInstrument.pending, (state) => {
                state.status = InstrumentsListStatus.LOADING;
                state.error = null;
            })
            .addCase(addInstrument.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = InstrumentsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addInstrument.rejected, (state, action: PayloadAction<any>) => {
                state.status = InstrumentsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default instrumentAddSlice.reducer;