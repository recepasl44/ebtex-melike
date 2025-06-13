import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAppointment } from './thunk';
import { QuestionsAddState } from '../../../types/appoipments/detail';
import { AppoipmenthListStatus } from '../../../enums/appoipments/list';

const initialState: QuestionsAddState = {
    data: null,
    status: AppoipmenthListStatus.IDLE,
    error: null,
};

const appointmentShowSlice = createSlice({
    name: 'appointmentShow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppointment.pending, (state) => {
                state.status = AppoipmenthListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchAppointment.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AppoipmenthListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchAppointment.rejected, (state, action: PayloadAction<any>) => {
                state.status = AppoipmenthListStatus.FAILED;
                state.error = action.payload;
            });
    },
});
export default appointmentShowSlice.reducer;