import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOverduePayments } from './thunk';
import { ListOverduePaymentsResponse, OverduePayment } from '../../../types/overduePayments/list';

interface OverduePaymentsState {
  data: OverduePayment[];
  current_page: number;
  total: number;
  per_page: number;
  total_overdue_amount: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OverduePaymentsState = {
  data: [],
  current_page: 1,
  total: 0,
  per_page: 25,
  total_overdue_amount: "0",
  status: 'idle',
  error: null
};

const overduePaymentsSlice = createSlice({
  name: 'overduePayments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOverduePayments.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchOverduePayments.fulfilled, (state, action: PayloadAction<ListOverduePaymentsResponse>) => {
      state.status = 'succeeded';
      state.data = action.payload.data;
      state.current_page = action.payload.current_page;
      state.total = action.payload.total;
      state.per_page = action.payload.per_page;
      state.total_overdue_amount = action.payload.total_overdue_amount;
    });
    builder.addCase(fetchOverduePayments.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  }
});

export default overduePaymentsSlice.reducer;
