import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeEarningsPeriodListState, EmployeeEarningsPeriodListResponse } from '../../../types/employeeEarningsPeriod/list'
import EmployeeEarningsPeriodListStatus from '../../../enums/employeeEarningsPeriod/list'
import { fetchEmployeeEarningsPeriodList } from './thunk'

const initialState: EmployeeEarningsPeriodListState = {
  data: null,
  status: EmployeeEarningsPeriodListStatus.IDLE,
  error: null
}

const employeeEarningsPeriodListSlice = createSlice({
  name: 'employeeEarningsPeriodList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEmployeeEarningsPeriodList.pending, state => {
      state.status = EmployeeEarningsPeriodListStatus.LOADING
      state.error = null
    })
    builder.addCase(
      fetchEmployeeEarningsPeriodList.fulfilled,
      (state, action: PayloadAction<EmployeeEarningsPeriodListResponse>) => {
        state.status = EmployeeEarningsPeriodListStatus.SUCCEEDED
        state.data = action.payload.data
      }
    )
    builder.addCase(fetchEmployeeEarningsPeriodList.rejected, (state, action: PayloadAction<any>) => {
      state.status = EmployeeEarningsPeriodListStatus.FAILED
      state.error = action.payload || 'Fetch employee earnings period list failed'
    })
  }
})

export default employeeEarningsPeriodListSlice.reducer
