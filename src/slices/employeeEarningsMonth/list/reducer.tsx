import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeEarningsMonthListState, EmployeeEarningsMonthListResponse } from '../../../types/employeeEarningsMonth/list'
import EmployeeEarningsMonthListStatus from '../../../enums/employeeEarningsMonth/list'
import { fetchEmployeeEarningsMonthList } from './thunk'

const initialState: EmployeeEarningsMonthListState = {
  data: null,
  meta: null,
  status: EmployeeEarningsMonthListStatus.IDLE,
  error: null
}

const employeeEarningsMonthListSlice = createSlice({
  name: 'employeeEarningsMonthList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEmployeeEarningsMonthList.pending, state => {
      state.status = EmployeeEarningsMonthListStatus.LOADING
      state.error = null
    })
    builder.addCase(
      fetchEmployeeEarningsMonthList.fulfilled,
      (state, action: PayloadAction<EmployeeEarningsMonthListResponse>) => {
        state.status = EmployeeEarningsMonthListStatus.SUCCEEDED
        state.data = action.payload.rows
        state.meta = action.payload.meta
      }
    )
    builder.addCase(fetchEmployeeEarningsMonthList.rejected, (state, action: PayloadAction<any>) => {
      state.status = EmployeeEarningsMonthListStatus.FAILED
      state.error = action.payload || 'Fetch employee earnings month list failed'
    })
  }
})

export default employeeEarningsMonthListSlice.reducer
