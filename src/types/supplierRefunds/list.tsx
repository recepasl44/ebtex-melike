export interface SupplierRefundData {
    id: number
    supplier_id: number
    amount: string
    refund_date: string
    description: string
    created_at: string
    updated_at: string
    platform_id: number
    refund_type: string
    invoice_id: number | null
    debt_id: number | null
    payment_method_id: number | null
  }
  
  export interface SupplierRefundsListResponse {
    data: SupplierRefundData[]
  }
  
  export interface SupplierRefundsListArg {
    enabled?: boolean
    [key: string]: any
  }
  