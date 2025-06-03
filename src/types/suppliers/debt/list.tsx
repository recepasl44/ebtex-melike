export interface DebtData {
    id: number;
    supplier_id: number;
    branch_id: number | null;
    branch_name: string | null;
    seasson_id: number | null;
    seasson_name: string | null;
    expense_category_id: number | null;
    expense_category_name: string | null;
    payment_method_id: number | null;
    amount: string; // para değeri string olarak dönebiliyor, örn: "15000.00"
    due_date: string; // ISO formatında tarih, örn: "2025-05-14"
    description: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface DebtMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  }
  
  export interface ListDebtResponse {
    data: DebtData[];
    first_page_url: string;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    prev_page_url: string | null;
    meta: DebtMeta;
  }
  