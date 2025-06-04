import InvoiceNextSerialStatus from '../../enums/supplierInvoices/list'

export interface InvoiceNextSerialResponse {
  success: boolean
  serial_no: string
}

export interface InvoiceNextSerialState {
  serialNo: string | null
  status: InvoiceNextSerialStatus
  error: string | null
}

export interface InvoiceNextSerialArg {
  
}
