import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteEmployeeEarning } from './thunk'
import { EmployeeEarningsDeleteState } from '../../../types/employeeEarnings/delete'
import { EmployeeEarningsListStatus } from '../../../enums/employeeEarnings/list'

const initialState: EmployeeEarningsDeleteState = {
  data: null,
  status: EmployeeEarningsListStatus.IDLE,
  error: null
}

const employeeEarningDeleteSlice = createSlice({
  name: 'employeeEarningDelete',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteEmployeeEarning.pending, state => {
        state.status = EmployeeEarningsListStatus.LOADING
        state.error = null
      })
      .addCase(deleteEmployeeEarning.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(deleteEmployeeEarning.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default employeeEarningDeleteSlice.reducer
