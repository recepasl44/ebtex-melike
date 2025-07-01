import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeEarningsPeriodListState, EmployeeEarningsPeriodListResponse } from '../../../types/employeeEarningsPeriod/list'
import EmployeeEarningsPeriodListStatus from '../../../enums/employeeEarningsPeriod/list'
import { fetchEmployeeEarningsPeriodList } from './thunk'

const initialState: EmployeeEarningsPeriodListState = {
  data: null,
  meta: null,
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
    builder.addCase(fetchEmployeeEarningsPeriodList.rejected, (state, action: PayloadAction<any>) => {
      state.status = EmployeeEarningsPeriodListStatus.FAILED
      state.error = action.payload || 'Fetch employee earnings period list failed'
    })
  }
})

export default employeeEarningsPeriodListSlice.reducer
