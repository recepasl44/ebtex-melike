export interface SupplierDebtData {
    id: number
    supplier_id: number
    branch_id: number | null
    branch_name: string | null
    seasson_id: number | null
    seasson_name: string | null
    expense_category_id: number | null
    expense_category_name: string | null
    payment_method_id: number | null
    payment_method_name:string | null
    amount: string
    paid_amount?: string
    due_date: string
    description: string
    created_at: string
    updated_at: string
  }
  
  export interface SupplierDebtsListLinks {
    url: string | null
    label: string
    active: boolean
  }
  
  export interface SupplierDebtsListResponse {
    current_page: number
    data: SupplierDebtData[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: SupplierDebtsListLinks[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
  }
  
  export interface SupplierDebtsListArg {
    enabled?: boolean
    [key: string]: any
  }
  