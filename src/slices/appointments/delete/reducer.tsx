import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteAppointment } from './thunk';
import { AppoipmenthListStatus } from '../../../enums/appoipments/list';
import { AppointmentDeleteState } from '../../../types/appoipments/delete';

const initialState: AppointmentDeleteState = {
    data: null,
    status: AppoipmenthListStatus.IDLE,
    error: null,
};

const appointmentDeleteSlice = createSlice({
    name: 'appointmentDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteAppointment.pending, (state) => {
                state.status = AppoipmenthListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteAppointment.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AppoipmenthListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteAppointment.rejected, (state, action: PayloadAction<unknown>) => {
                state.status = AppoipmenthListStatus.FAILED;
                state.error = typeof action.payload === 'string' ? action.payload : 'An unknown error occurred';
            });
    },
});

export default appointmentDeleteSlice.reducer;
