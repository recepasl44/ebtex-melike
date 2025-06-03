import ExpenseListStatus from "../../../enums/expense/summary/list";

export interface IExpense {
  id?: number;
  supplier_id: number;
  branch_id: number;
  branch_name: string;
  seasson_id: number;
  seasson_name: string;
  invoice_serial_no: string;
  invoice_date: string;
  invoice_amount: string;
  expense_category_id: number;
  category_name: string;
  amount: string;
  description: string;
  status: string;
  payment_status?: string;
  pay_id?: number;
  payment_method_id?: number;
  created_at: string;
  updated_at: string;
  platform_id: number | null;
  supplier: any;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface IExpensePaginate {
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  links: ILink[];
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface ExpenseListResponse {
  data: IExpense[];
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: ILink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface ExpenseListState {
  data: IExpense[] | null;
  status: ExpenseListStatus;
  error: string | null;
}

export interface ExpenseListArg {
  enabled?: boolean;
  [key: string]: any;
}
