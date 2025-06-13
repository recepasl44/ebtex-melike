
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ShowInstallmentStatus from '../../../enums/Installment/show';
import { showInstallment } from './thunk';
import {
  ShowInstallmentState,
  ShowInstallmentResponse,
} from '../../../types/Installment/show';
import { IInstallment } from '../../../types/Installment/list'; 


const initialState: ShowInstallmentState = {
  data: null,
  status: ShowInstallmentStatus.IDLE,
  error: null,
};

const showInstallmentSlice = createSlice({
  name: 'installment/show',
  initialState,
  reducers: {
    resetShowInstallmentState(state) {
      state.data = null;
      state.status = ShowInstallmentStatus.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(showInstallment.pending, (state) => {
        state.status = ShowInstallmentStatus.LOADING;
        state.error = null;
      })
      .addCase(
        showInstallment.fulfilled,
        (state, action: PayloadAction<ShowInstallmentResponse>) => {
          state.status = ShowInstallmentStatus.SUCCEEDED;
          state.data = action.payload as unknown as IInstallment;
        }
      )
      .addCase(showInstallment.rejected, (state, action: PayloadAction<any>) => {
        state.status = ShowInstallmentStatus.FAILED;
        state.error = action.payload || 'Show installment failed';
      });
  },
});

export const { resetShowInstallmentState } = showInstallmentSlice.actions;
export default showInstallmentSlice.reducer;
