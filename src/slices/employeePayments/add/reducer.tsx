import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addEmployeePayment } from './thunk'
import { EmployeePaymentAddState } from '../../../types/employeePayments/add'
import EmployeePaymentListStatus from '../../../enums/employeePayments/list'

const initialState: EmployeePaymentAddState = {
  data: null,
  status: EmployeePaymentListStatus.IDLE,
  error: null
}

const employeePaymentAddSlice = createSlice({
  name: 'employeePaymentAdd',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addEmployeePayment.pending, state => {
        state.status = EmployeePaymentListStatus.LOADING
        state.error = null
      })
      .addCase(addEmployeePayment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EmployeePaymentListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(addEmployeePayment.rejected, (state, action: PayloadAction<any>) => {
        state.status = EmployeePaymentListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default employeePaymentAddSlice.reducer
