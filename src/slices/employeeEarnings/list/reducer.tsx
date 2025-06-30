import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchEmployeeEarnings } from './thunk'
import { ListEmployeeEarningsResponse, PaginationMeta } from '../../../types/employeeEarnings/list'
import { EmployeeEarningsListStatus } from '../../../enums/employeeEarnings/list'

export interface EmployeeEarningListState {
  data: ListEmployeeEarningsResponse['data'] | null
  meta: PaginationMeta | null
  status: EmployeeEarningsListStatus
  error: string | null
}

const initialState: EmployeeEarningListState = {
  data: null,
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
    builder.addCase(fetchEmployeeEarnings.rejected, (state, action: PayloadAction<any>) => {
      state.status = EmployeeEarningsListStatus.FAILED
      state.error = action.payload || 'Fetch employee earnings failed'
    })
  }
})

export default employeeEarningListSlice.reducer
