import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeEarningsPeriodUpdateState } from '../../../types/employeeEarningsPeriod/update'
import EmployeeEarningsPeriodListStatus from '../../../enums/employeeEarningsPeriod/list'
import { updateEmployeeEarningsPeriod } from './thunk'

const initialState: EmployeeEarningsPeriodUpdateState = {
  data: null,
  status: EmployeeEarningsPeriodListStatus.IDLE,
  error: null
}

const employeeEarningsPeriodUpdateSlice = createSlice({
  name: 'employeeEarningsPeriodUpdate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateEmployeeEarningsPeriod.pending, state => {
        state.status = EmployeeEarningsPeriodListStatus.LOADING
        state.error = null
      })
      .addCase(updateEmployeeEarningsPeriod.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsPeriodListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(updateEmployeeEarningsPeriod.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsPeriodListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default employeeEarningsPeriodUpdateSlice.reducer
