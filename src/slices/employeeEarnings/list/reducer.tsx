import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchEmployeeEarnings } from './thunk'
import { ListEmployeeEarningsResponse } from '../../../types/employeeEarnings/list'
import { EmployeeEarningsListStatus } from '../../../enums/employeeEarnings/list'

export interface EmployeeEarningListState {
  data: ListEmployeeEarningsResponse['data'] | null
  links: ListEmployeeEarningsResponse['links'] | null
  meta: ListEmployeeEarningsResponse['meta'] | null
  status: EmployeeEarningsListStatus
  error: string | null
}

const initialState: EmployeeEarningListState = {
  data: null,
  links: null,
  meta: null,
  status: EmployeeEarningsListStatus.IDLE,
  error: null
}

const employeeEarningListSlice = createSlice({
  name: 'employeeEarnings/list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEmployeeEarnings.pending, state => {
      state.status = EmployeeEarningsListStatus.LOADING
      state.error = null
    })
    builder.addCase(
      fetchEmployeeEarnings.fulfilled,
      (state, action: PayloadAction<ListEmployeeEarningsResponse>) => {
        state.status = EmployeeEarningsListStatus.SUCCEEDED
        state.data = action.payload.data
        state.links = action.payload.links
        state.meta = action.payload.meta
      }
    )
    builder.addCase(fetchEmployeeEarnings.rejected, (state, action: PayloadAction<any>) => {
      state.status = EmployeeEarningsListStatus.FAILED
      state.error = action.payload || 'Fetch employee earnings failed'
    })
  }
})

export default employeeEarningListSlice.reducer
