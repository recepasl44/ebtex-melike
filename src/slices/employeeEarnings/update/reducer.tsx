import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateEmployeeEarning } from './thunk'
import { EmployeeEarningsUpdateState } from '../../../types/employeeEarnings/update'
import { EmployeeEarningsListStatus } from '../../../enums/employeeEarnings/list'

const initialState: EmployeeEarningsUpdateState = {
  data: null,
  status: EmployeeEarningsListStatus.IDLE,
  error: null
}

const employeeEarningUpdateSlice = createSlice({
  name: 'employeeEarningUpdate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateEmployeeEarning.pending, state => {
        state.status = EmployeeEarningsListStatus.LOADING
        state.error = null
      })
      .addCase(updateEmployeeEarning.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(updateEmployeeEarning.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default employeeEarningUpdateSlice.reducer
