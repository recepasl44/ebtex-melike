import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchEmployeePayments } from './thunk'
import { EmployeePaymentListState, EmployeePaymentListResponse } from '../../../types/employeePayments/list'
import EmployeePaymentListStatus from '../../../enums/employeePayments/list'

const initialState: EmployeePaymentListState = {
  data: null,
  meta: null,
  status: EmployeePaymentListStatus.IDLE,
  error: null
}

const employeePaymentListSlice = createSlice({
  name: 'employeePaymentList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEmployeePayments.pending, state => {
      state.status = EmployeePaymentListStatus.LOADING
      state.error = null
    })
    builder.addCase(
      fetchEmployeePayments.fulfilled,
      (state, action: PayloadAction<EmployeePaymentListResponse>) => {
        state.status = EmployeePaymentListStatus.SUCCEEDED
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
    builder.addCase(fetchEmployeePayments.rejected, (state, action: PayloadAction<any>) => {
      state.status = EmployeePaymentListStatus.FAILED
      state.error = action.payload || 'Fetch employee payments failed'
    })
  }
})

export default employeePaymentListSlice.reducer
