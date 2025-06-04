
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createInstallment } from './thunk';
import CreateInstallmentStatus from '../../../enums/Installment/add';
import {
  CreateInstallmentResponse,
  CreateInstallmentState,
} from '../../../types/Installment/add';

const initialState: CreateInstallmentState = {
  data: null,
  status: CreateInstallmentStatus.IDLE,
  error: null,
};

const createInstallmentSlice = createSlice({
  name: 'installment/add',
  initialState,
  reducers: {
    resetCreateInstallmentState(state) {
      state.data = null;
      state.status = CreateInstallmentStatus.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInstallment.pending, (state) => {
        state.status = CreateInstallmentStatus.LOADING;
        state.error = null;
      })
      .addCase(createInstallment.fulfilled, (state, action: PayloadAction<CreateInstallmentResponse>) => {
        state.status = CreateInstallmentStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(createInstallment.rejected, (state, action: PayloadAction<any>) => {
        state.status = CreateInstallmentStatus.FAILED;
        state.error = action.payload || 'Create installment failed';
      });
  },
});

export const { resetCreateInstallmentState } = createInstallmentSlice.actions;
export default createInstallmentSlice.reducer;
