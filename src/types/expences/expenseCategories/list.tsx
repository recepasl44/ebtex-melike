import GetCategoriesListStatus from "../../../enums/expense/expenseCategories/list";

export interface IExpenseCategories {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  platform_id: number | null;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface IExpenseCategoriesPaginate {
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface ExpenseCategoriesListResponse {
  data: IExpenseCategories[];
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

export interface ExpenseCategoriesListState {
  data: IExpenseCategories[] | null;
  status: GetCategoriesListStatus;
  error: string | null;
}
export interface ExpenseCategoriesListArgs {
  enabled?: boolean;
  [key: string]: any;
}
