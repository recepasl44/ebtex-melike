import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeEarningsPeriodDeleteState } from '../../../types/employeeEarningsPeriod/delete'
import EmployeeEarningsPeriodListStatus from '../../../enums/employeeEarningsPeriod/list'
import { deleteEmployeeEarningsPeriod } from './thunk'

const initialState: EmployeeEarningsPeriodDeleteState = {
  data: null,
  status: EmployeeEarningsPeriodListStatus.IDLE,
  error: null
}

const employeeEarningsPeriodDeleteSlice = createSlice({
  name: 'employeeEarningsPeriodDelete',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteEmployeeEarningsPeriod.pending, state => {
        state.status = EmployeeEarningsPeriodListStatus.LOADING
        state.error = null
      })
      .addCase(deleteEmployeeEarningsPeriod.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsPeriodListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(deleteEmployeeEarningsPeriod.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsPeriodListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default employeeEarningsPeriodDeleteSlice.reducer
