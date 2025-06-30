import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeEarningsMonthShowState } from '../../../types/employeeEarningsMonth/detail'
import EmployeeEarningsMonthListStatus from '../../../enums/employeeEarningsMonth/list'
import { fetchEmployeeEarningsMonth } from './thunk'

const initialState: EmployeeEarningsMonthShowState = {
  data: null,
  status: EmployeeEarningsMonthListStatus.IDLE,
  error: null
}

const employeeEarningsMonthShowSlice = createSlice({
  name: 'employeeEarningsMonthShow',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEmployeeEarningsMonth.pending, state => {
      state.status = EmployeeEarningsMonthListStatus.LOADING
      state.error = null
    })
    builder.addCase(fetchEmployeeEarningsMonth.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = EmployeeEarningsMonthListStatus.SUCCEEDED
      state.data = action.payload
    })
    builder.addCase(fetchEmployeeEarningsMonth.rejected, (state, action: PayloadAction<any>) => {
      state.status = EmployeeEarningsMonthListStatus.FAILED
      state.error = action.payload
    })
  }
})

export default employeeEarningsMonthShowSlice.reducer
