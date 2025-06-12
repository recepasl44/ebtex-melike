import { SupplierInvoiceData } from './list'
import SupplierInvoicesListStatus from '../../enums/supplierInvoices/list'

export interface SupplierInvoicesAddPayload {
  id: number
  supplier_id: number
  issue_date: string
  invoice_type_code: string
  tax_total: string
  payable_amount: string
  pdf_content?: string | null
  fis_seri_no?: string | null
  gider_kalemi?: string | null
  fatura_adi?: string | null
  makbuz_no?: string | null
  register_no?: string | null
  pdf_path?: string | null
  student_id?: number | null
  enrollment_id?: number | null
  installment_id?: number | null
  invoice_number?: string | null
  document_currency_code?: string | null
  details?: {
    id?: number
    invoice_id?: number
    item_name: string
    item_description?: string | null
    invoiced_quantity: number
    unit_code?: string | null
    unit_price: string
    line_extension_amount: string
    tax_amount?: string
    platform_id?: number
    vat_rate?: number | null
  }[]
}

export interface SupplierInvoicesAddState {
  data: SupplierInvoiceData | null
  status: SupplierInvoicesListStatus
  error: string | null
}
