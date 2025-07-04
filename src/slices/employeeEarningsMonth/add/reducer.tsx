import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeEarningsMonthAddState } from '../../../types/employeeEarningsMonth/add'
import EmployeeEarningsMonthListStatus from '../../../enums/employeeEarningsMonth/list'
import { addEmployeeEarningsMonth } from './thunk'

const initialState: EmployeeEarningsMonthAddState = {
  data: null,
  status: EmployeeEarningsMonthListStatus.IDLE,
  error: null
}

const employeeEarningsMonthAddSlice = createSlice({
  name: 'employeeEarningsMonthAdd',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addEmployeeEarningsMonth.pending, state => {
        state.status = EmployeeEarningsMonthListStatus.LOADING
        state.error = null
      })
      .addCase(addEmployeeEarningsMonth.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsMonthListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(addEmployeeEarningsMonth.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsMonthListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default employeeEarningsMonthAddSlice.reducer
