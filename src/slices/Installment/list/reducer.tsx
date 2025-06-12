
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listInstallments } from './thunk';
import ListInstallmentStatus from '../../../enums/Installment/list';
import {
  ListInstallmentsState,
  ListInstallmentsResponse,
} from '../../../types/Installment/list';

const initialState: ListInstallmentsState = {
  data: [],
  meta: null,
  status: ListInstallmentStatus.IDLE,
  error: null,
};

const listInstallmentsSlice = createSlice({
  name: 'installment/list',
  initialState,
  reducers: {
    resetListInstallmentsState: (state) => {
      state.data = [];
      state.meta = null;
      state.status = ListInstallmentStatus.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listInstallments.pending, (state) => {
        state.status = ListInstallmentStatus.LOADING;
        state.error = null;
      })
      .addCase(
        listInstallments.fulfilled,
        (state, action: PayloadAction<ListInstallmentsResponse>) => {
          state.status = ListInstallmentStatus.SUCCEEDED;
          state.data = action.payload.data;
          // meta varsa kaydet:
          state.meta = action.payload.meta || null;
        }
      )
      .addCase(listInstallments.rejected, (state, action: PayloadAction<any>) => {
        state.status = ListInstallmentStatus.FAILED;
        state.error = action.payload || 'List installments failed';
      });
  },
});

export const { resetListInstallmentsState } = listInstallmentsSlice.actions;
export default listInstallmentsSlice.reducer;
