
import SuppliersListStatus from "../../../enums/suppliers/list"

export interface Supplier {
  totalDebts: string | number
  totalPayments: string | number
  remainingDebt: string | number
  paymentsByMethod: any
  pay_nakit: number
  pay_kredi: number
  pay_senet: number
  pay_banka: number
  pay_diger: number
  id: number
  name: string
  mail: string | null
  phone: string | null
  address: string | null
  fax: string | null
  iban: string | null
  taxNumber: string | null
  taxOffice: string | null
  status: number
  created_at: string
  updated_at: string
  register_no: string
  platform_id: number
  total_debts: number | string
  total_payments: number | string
  remaining_debt: number | string
  [key: string]: any;
}

// API yanıtında pagination + data
export interface SuppliersListResponse {
  current_page: number
  data: Supplier[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

// Thunk arg
export interface SuppliersListArg {
  page?: number
  per_page?: number
  search?: string
  enabled?: boolean
  [key: string] :any
}

// Redux slice state
export interface SuppliersListState {
  data: Supplier[] | null
  current_page: number
  last_page: number
  total: number
  status: SuppliersListStatus
  error: string | null
}
