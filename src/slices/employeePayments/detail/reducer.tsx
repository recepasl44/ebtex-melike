import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchEmployeePayment } from './thunk'
import { EmployeePaymentShowState } from '../../../types/employeePayments/detail'
import EmployeePaymentListStatus from '../../../enums/employeePayments/list'

const initialState: EmployeePaymentShowState = {
  data: null,
  status: EmployeePaymentListStatus.IDLE,
  error: null
}

const employeePaymentShowSlice = createSlice({
  name: 'employeePaymentShow',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEmployeePayment.pending, state => {
      state.status = EmployeePaymentListStatus.LOADING
      state.error = null
    })
    builder.addCase(fetchEmployeePayment.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = EmployeePaymentListStatus.SUCCEEDED
      state.data = action.payload
    })
    builder.addCase(fetchEmployeePayment.rejected, (state, action: PayloadAction<any>) => {
      state.status = EmployeePaymentListStatus.FAILED
      state.error = action.payload
    })
  }
})

export default employeePaymentShowSlice.reducer
