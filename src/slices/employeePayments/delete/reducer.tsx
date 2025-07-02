import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteEmployeePayment } from './thunk'
import { EmployeePaymentDeleteState } from '../../../types/employeePayments/delete'
import EmployeePaymentListStatus from '../../../enums/employeePayments/list'

const initialState: EmployeePaymentDeleteState = {
  data: null,
  status: EmployeePaymentListStatus.IDLE,
  error: null
}

const employeePaymentDeleteSlice = createSlice({
  name: 'employeePaymentDelete',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteEmployeePayment.pending, state => {
        state.status = EmployeePaymentListStatus.LOADING
        state.error = null
      })
      .addCase(deleteEmployeePayment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeePaymentListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(deleteEmployeePayment.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeePaymentListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default employeePaymentDeleteSlice.reducer
