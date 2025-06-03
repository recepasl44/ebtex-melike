import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addAppointment } from './thunk';
import { AppoipmenthListStatus } from '../../../enums/appoipments/list';

interface AppoipmenthListState {
    data: any | null;
    status: AppoipmenthListStatus;
    error: any | null;
}

const initialState: AppoipmenthListState = {
    data: null,
    status: AppoipmenthListStatus.IDLE,
    error: null,
};

const appointmentsAddSlice = createSlice({
    name: 'appointmentsAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAppointment.pending, (state) => {
                state.status = AppoipmenthListStatus.LOADING;
                state.error = null;
            })
            .addCase(addAppointment.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AppoipmenthListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addAppointment.rejected, (state, action: PayloadAction<any>) => {
                state.status = AppoipmenthListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default appointmentsAddSlice.reducer;