import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addEmployeeEarning } from './thunk'
import { EmployeeEarningsAddState } from '../../../types/employeeEarnings/add'
import { EmployeeEarningsListStatus } from '../../../enums/employeeEarnings/list'

const initialState: EmployeeEarningsAddState = {
  data: null,
  status: EmployeeEarningsListStatus.IDLE,
  error: null
}

const employeeEarningAddSlice = createSlice({
  name: 'employeeEarningAdd',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addEmployeeEarning.pending, state => {
        state.status = EmployeeEarningsListStatus.LOADING
        state.error = null
      })
      .addCase(addEmployeeEarning.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(addEmployeeEarning.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default employeeEarningAddSlice.reducer
