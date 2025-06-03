export interface SupplierNoteData {
    id: number
    supplier_id: number
    note: string
    created_at: string
    updated_at: string
    platform_id: number
  }
  
  export interface SupplierNotesListLinks {
    url: string | null
    label: string
    active: boolean
  }
  
  export interface SupplierNotesListResponse {
    current_page: number
    data: SupplierNoteData[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: SupplierNotesListLinks[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
  }
  
  export interface SupplierNotesListArg {
    enabled?: boolean
    [key: string]: any
  }
  