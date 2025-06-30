import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEmployeeEarningsMonth } from './thunk';
import { EmployeeEarningsMonthListState } from '../../../types/employeeEarningsMonth/list';
import EmployeeEarningsMonthListStatus from '../../../enums/employeeEarningsMonth/list';

const initialState: EmployeeEarningsMonthListState = {
  data: null,
  status: EmployeeEarningsMonthListStatus.IDLE,
  error: null,
};

const employeeEarningsMonthListSlice = createSlice({
  name: 'employeeEarningsMonth/list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEmployeeEarningsMonth.pending, state => {
        state.status = EmployeeEarningsMonthListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchEmployeeEarningsMonth.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsMonthListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchEmployeeEarningsMonth.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsMonthListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default employeeEarningsMonthListSlice.reducer;
