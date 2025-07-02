import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateEmployeePayment } from './thunk'
import { EmployeePaymentUpdateState } from '../../../types/employeePayments/update'
import EmployeePaymentListStatus from '../../../enums/employeePayments/list'

const initialState: EmployeePaymentUpdateState = {
  data: null,
  status: EmployeePaymentListStatus.IDLE,
  error: null
}

const employeePaymentUpdateSlice = createSlice({
  name: 'employeePaymentUpdate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateEmployeePayment.pending, state => {
        state.status = EmployeePaymentListStatus.LOADING
        state.error = null
      })
      .addCase(updateEmployeePayment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeePaymentListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(updateEmployeePayment.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeePaymentListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default employeePaymentUpdateSlice.reducer
