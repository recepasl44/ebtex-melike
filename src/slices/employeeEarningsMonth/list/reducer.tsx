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
        state.data = action.payload.data
        state.meta = {
          current_page: action.payload.current_page,
          first_page_url: action.payload.first_page_url,
          from: action.payload.from,
          last_page: action.payload.last_page,
          last_page_url: action.payload.last_page_url,
          next_page_url: action.payload.next_page_url,
          path: action.payload.path,
          per_page: action.payload.per_page,
          prev_page_url: action.payload.prev_page_url,
          to: action.payload.to,
          total: action.payload.total,
          links: action.payload.links
        }
      }
    )
    builder.addCase(fetchEmployeeEarningsMonthList.rejected, (state, action: PayloadAction<any>) => {
      state.status = EmployeeEarningsMonthListStatus.FAILED
      state.error = action.payload || 'Fetch employee earnings month list failed'
    })
  }
})

export default employeeEarningsMonthListSlice.reducer
