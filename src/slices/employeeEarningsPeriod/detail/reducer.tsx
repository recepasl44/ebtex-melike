import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeEarningsPeriodShowState } from '../../../types/employeeEarningsPeriod/detail'
import EmployeeEarningsPeriodListStatus from '../../../enums/employeeEarningsPeriod/list'
import { fetchEmployeeEarningsPeriod } from './thunk'

const initialState: EmployeeEarningsPeriodShowState = {
  data: null,
  status: EmployeeEarningsPeriodListStatus.IDLE,
  error: null
}

const employeeEarningsPeriodShowSlice = createSlice({
  name: 'employeeEarningsPeriodShow',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEmployeeEarningsPeriod.pending, state => {
      state.status = EmployeeEarningsPeriodListStatus.LOADING
      state.error = null
    })
    builder.addCase(fetchEmployeeEarningsPeriod.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = EmployeeEarningsPeriodListStatus.SUCCEEDED
      state.data = action.payload
    })
    builder.addCase(fetchEmployeeEarningsPeriod.rejected, (state, action: PayloadAction<any>) => {
      state.status = EmployeeEarningsPeriodListStatus.FAILED
      state.error = action.payload
    })
  }
})

export default employeeEarningsPeriodShowSlice.reducer
