import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchEmployeeEarning } from './thunk'
import { EmployeeEarningShowState } from '../../../types/employeeEarnings/detail'
import { EmployeeEarningsListStatus } from '../../../enums/employeeEarnings/list'

const initialState: EmployeeEarningShowState = {
  data: null,
  status: EmployeeEarningsListStatus.IDLE,
  error: null
}

const employeeEarningShowSlice = createSlice({
  name: 'employeeEarningShow',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEmployeeEarning.pending, state => {
      state.status = EmployeeEarningsListStatus.LOADING
      state.error = null
    })
    builder.addCase(fetchEmployeeEarning.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = EmployeeEarningsListStatus.SUCCEEDED
      state.data = action.payload
    })
    builder.addCase(fetchEmployeeEarning.rejected, (state, action: PayloadAction<any>) => {
      state.status = EmployeeEarningsListStatus.FAILED
      state.error = action.payload
    })
  }
})

export default employeeEarningShowSlice.reducer
