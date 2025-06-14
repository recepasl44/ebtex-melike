export interface SupplierPaymentData {
    id: number
    supplier_id: number
    amount: string
    payment_date: string
    description: string
    is_paid: number
    due_date: string | null
    pdf_path: string | null
    created_at: string
    updated_at: string
    platform_id: number
    payment_method_id: number | null
    season_id: number | null
    payment_method: any
  }
  
  export interface SupplierPaymentsListResponse {
    data: SupplierPaymentData[]
  }
  
  export interface SupplierPaymentsListArg {
    enabled?: boolean
    [key: string]: any
  }
  