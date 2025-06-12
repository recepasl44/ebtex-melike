
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateInstallment } from './thunk';
import UpdateInstallmentStatus from '../../../enums/Installment/update';
import { UpdateInstallmentResponse, UpdateInstallmentState } from '../../../types/Installment/update';

const initialState: UpdateInstallmentState = {
  data: null,
  status: UpdateInstallmentStatus.IDLE,
  error: null,
};

const updateInstallmentSlice = createSlice({
  name: 'installment/update',
  initialState,
  reducers: {
    resetUpdateInstallmentState(state) {
      state.data = null;
      state.status = UpdateInstallmentStatus.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateInstallment.pending, (state) => {
        state.status = UpdateInstallmentStatus.LOADING;
        state.error = null;
      })
      .addCase(updateInstallment.fulfilled, (state, action: PayloadAction<UpdateInstallmentResponse>) => {
        state.status = UpdateInstallmentStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateInstallment.rejected, (state, action: PayloadAction<any>) => {
        state.status = UpdateInstallmentStatus.FAILED;
        state.error = action.payload || 'Update installment failed';
      });
  },
});

export const { resetUpdateInstallmentState } = updateInstallmentSlice.actions;
export default updateInstallmentSlice.reducer;
