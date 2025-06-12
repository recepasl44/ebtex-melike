import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import InvoiceNextSerialStatus from '../../../enums/supplierInvoices/list'
import { getNextSerial } from './thunk'
import { InvoiceNextSerialState } from '../../../types/supplierInvoices/nextSerial'

const initialState: InvoiceNextSerialState = {
  serialNo: null,
  status: InvoiceNextSerialStatus.IDLE,
  error: null,
}

const invoiceNextSerialSlice = createSlice({
  name: 'invoiceNextSerial',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNextSerial.pending, (state) => {
        state.status = InvoiceNextSerialStatus.LOADING
        state.error = null
      })
      .addCase(getNextSerial.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = InvoiceNextSerialStatus.SUCCEEDED
        state.serialNo = action.payload.serial_no
      })
      .addCase(getNextSerial.rejected, (state, action: PayloadAction<any>) => {
        state.status = InvoiceNextSerialStatus.FAILED
        state.error = action.payload
        state.serialNo = ''
      })
  },
})

export default invoiceNextSerialSlice.reducer
