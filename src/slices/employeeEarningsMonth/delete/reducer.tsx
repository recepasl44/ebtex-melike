import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteEmployeeEarningsMonth } from './thunk';
import { EmployeeEarningsMonthDeleteState } from '../../../types/employeeEarningsMonth/delete';
import EmployeeEarningsMonthListStatus from '../../../enums/employeeEarningsMonth/list';

const initialState: EmployeeEarningsMonthDeleteState = {
  data: null,
  status: EmployeeEarningsMonthListStatus.IDLE,
  error: null,
};

const employeeEarningsMonthDeleteSlice = createSlice({
  name: 'employeeEarningsMonth/delete',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteEmployeeEarningsMonth.pending, state => {
        state.status = EmployeeEarningsMonthListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteEmployeeEarningsMonth.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsMonthListStatus.SUCCEEDED;
        state.data = action.payload as any;
      })
      .addCase(deleteEmployeeEarningsMonth.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsMonthListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default employeeEarningsMonthDeleteSlice.reducer;
