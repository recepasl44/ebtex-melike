import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateAppointment } from './thunk';
import { QuestionsAddState } from '../../../types/appoipments/update';
import { AppoipmenthListStatus } from '../../../enums/appoipments/list';


const initialState: QuestionsAddState = {
    data: null,
    status: AppoipmenthListStatus.IDLE,
    error: null,
};

const appointmentsUpdateSlice = createSlice({
    name: 'appointmentsUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateAppointment.pending, (state) => {
                state.status = AppoipmenthListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateAppointment.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AppoipmenthListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateAppointment.rejected, (state, action: PayloadAction<any>) => {
                state.status = AppoipmenthListStatus.FAILED;
                state.error = action.payload;
            });
    },
});
export default appointmentsUpdateSlice.reducer;

