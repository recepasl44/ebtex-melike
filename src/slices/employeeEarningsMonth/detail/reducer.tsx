import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEmployeeEarningsMonthDetail } from './thunk';
import { EmployeeEarningsMonthDetailState } from '../../../types/employeeEarningsMonth/detail';
import EmployeeEarningsMonthListStatus from '../../../enums/employeeEarningsMonth/list';

const initialState: EmployeeEarningsMonthDetailState = {
  data: null,
  status: EmployeeEarningsMonthListStatus.IDLE,
  error: null,
};

const employeeEarningsMonthDetailSlice = createSlice({
  name: 'employeeEarningsMonth/detail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEmployeeEarningsMonthDetail.pending, state => {
        state.status = EmployeeEarningsMonthListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchEmployeeEarningsMonthDetail.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsMonthListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchEmployeeEarningsMonthDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsMonthListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default employeeEarningsMonthDetailSlice.reducer;
