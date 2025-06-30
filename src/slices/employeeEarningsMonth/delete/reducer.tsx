import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeEarningsMonthDeleteState } from '../../../types/employeeEarningsMonth/delete'
import EmployeeEarningsMonthListStatus from '../../../enums/employeeEarningsMonth/list'
import { deleteEmployeeEarningsMonth } from './thunk'

const initialState: EmployeeEarningsMonthDeleteState = {
  data: null,
  status: EmployeeEarningsMonthListStatus.IDLE,
  error: null
}

const employeeEarningsMonthDeleteSlice = createSlice({
  name: 'employeeEarningsMonthDelete',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteEmployeeEarningsMonth.pending, state => {
        state.status = EmployeeEarningsMonthListStatus.LOADING
        state.error = null
      })
      .addCase(deleteEmployeeEarningsMonth.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsMonthListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(deleteEmployeeEarningsMonth.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsMonthListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default employeeEarningsMonthDeleteSlice.reducer
