
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAppointment } from './thunk';
import {AppoipmenthListStatus} from '../../../enums/appoipments/list';
import {
  
  ListAppointmentState
  
} from '../../../types/appoipments/list';

const initialState: ListAppointmentState = {
  data: [],
  meta: null,
  status: AppoipmenthListStatus.IDLE,
  error: null,
};

const listInstallmentsSlice = createSlice({
  name: 'installment/list',
  initialState,
  reducers: {
    resetListInstallmentsState: (state) => {
      state.data = [];
      state.meta = null;
      state.status = AppoipmenthListStatus.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointment.pending, (state) => {
        state.status = AppoipmenthListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchAppointment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = AppoipmenthListStatus.SUCCEEDED;
          state.data = action.payload.data;
   
          state.meta = action.payload.meta || null;
        }
      )
      .addCase(fetchAppointment.rejected, (state, action: PayloadAction<any>) => {
        state.status = AppoipmenthListStatus.FAILED;
        state.error = action.payload || 'List installments failed';
      });
  },
});

export const { resetListInstallmentsState } = listInstallmentsSlice.actions;
export default listInstallmentsSlice.reducer;
