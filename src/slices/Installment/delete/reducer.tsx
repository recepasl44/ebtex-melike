
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteInstallment } from './thunk';
import {
  DeleteInstallmentState,
  DeleteInstallmentResponse,
} from '../../../types/Installment/delete';
import DeleteInstallmentStatus from '../../../enums/Installment/delete';

const initialState: DeleteInstallmentState = {
  deletedId: null,
  status: DeleteInstallmentStatus.IDLE,
  error: null,
};

const deleteInstallmentSlice = createSlice({
  name: 'installment/delete',
  initialState,
  reducers: {
    resetDeleteInstallmentState(state) {
      state.deletedId = null;
      state.status = DeleteInstallmentStatus.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteInstallment.pending, (state) => {
        state.status = DeleteInstallmentStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteInstallment.fulfilled, (state, action: PayloadAction<DeleteInstallmentResponse>) => {
        state.status = DeleteInstallmentStatus.SUCCEEDED;
        state.deletedId = action.payload.deletedId;
      })
      .addCase(deleteInstallment.rejected, (state, action: PayloadAction<any>) => {
        state.status = DeleteInstallmentStatus.FAILED;
        state.error = action.payload || 'Delete installment failed';
      });
  },
});

export const { resetDeleteInstallmentState } = deleteInstallmentSlice.actions;
export default deleteInstallmentSlice.reducer;
