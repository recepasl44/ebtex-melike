import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeEarningsPeriodAddState } from '../../../types/employeeEarningsPeriod/add'
import EmployeeEarningsPeriodListStatus from '../../../enums/employeeEarningsPeriod/list'
import { addEmployeeEarningsPeriod } from './thunk'

const initialState: EmployeeEarningsPeriodAddState = {
  data: null,
  status: EmployeeEarningsPeriodListStatus.IDLE,
  error: null
}

const employeeEarningsPeriodAddSlice = createSlice({
  name: 'employeeEarningsPeriodAdd',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addEmployeeEarningsPeriod.pending, state => {
        state.status = EmployeeEarningsPeriodListStatus.LOADING
        state.error = null
      })
      .addCase(addEmployeeEarningsPeriod.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsPeriodListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(addEmployeeEarningsPeriod.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeeEarningsPeriodListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default employeeEarningsPeriodAddSlice.reducer
