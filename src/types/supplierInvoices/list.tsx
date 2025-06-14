
export interface SupplierInvoiceDetailData {
    id: number
    invoice_id: number
    item_name: string
    item_description: string | null
    invoiced_quantity: number
    unit_code: string | null
    unit_price: string
    line_extension_amount: string
    tax_amount: string
    created_at: string
    updated_at: string
    platform_id: number
    vat_rate: number | null
  }
  
  export interface SupplierInvoiceData {
    expense_category_id?:number
    description?:string
    id: number
    supplier_id: number
    issue_date: string
    invoice_type_code: string
    tax_total: string
    payable_amount: string
    pdf_content: string | null
    fis_seri_no: string | null
    platform_id: number
    created_at: string
    updated_at: string
    gider_kalemi: string | null
    fatura_adi: string | null
    makbuz_no: string | null
    register_no: string | null
    pdf_path: string | null
    student_id: number | null
    enrollment_id: number | null
    installment_id: number | null
    invoice_number: string | null
    document_currency_code: string | null
    details: SupplierInvoiceDetailData[]
  }
  
  export interface SupplierInvoicesListLinks {
    url: string | null
    label: string
    active: boolean
  }
  
  export interface SupplierInvoicesListResponse {
    current_page: number
    data: SupplierInvoiceData[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: SupplierInvoicesListLinks[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
  }
  
  export interface SupplierInvoicesListArg {
    enabled?: boolean
    [key: string]: any
  }
  