import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateEmployeeEarningsMonth } from './thunk';
import { EmployeeEarningsMonthUpdateState } from '../../../types/employeeEarningsMonth/update';
import EmployeeEarningsMonthListStatus from '../../../enums/employeeEarningsMonth/list';

const initialState: EmployeeEarningsMonthUpdateState = {
  data: null,
  status: EmployeeEarningsMonthListStatus.IDLE,
  error: null,
};

const employeeEarningsMonthUpdateSlice = createSlice({
  name: 'employeeEarningsMonth/update',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateEmployeeEarningsMonth.pending, state => {
        state.status = EmployeeEarningsMonthListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateEmployeeEarningsMonth.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsMonthListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateEmployeeEarningsMonth.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsMonthListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default employeeEarningsMonthUpdateSlice.reducer;
