import EmployeeEarningsMonthListStatus from '../../enums/employeeEarningsMonth/list';

export interface EarningItem {
  id: number;
  employee_id: number;
  period: string;
  income_type: string;
  quantity: string;
  unit_price: string;
  total: string;
  created_at: string;
  updated_at: string;
  platform_id: number | null;
}

export interface EmployeeMonth {
  employee_id: number;
  first_name: string | null;
  last_name: string | null;
  branch_id: number | null;
  profession_id: number | null;
  branch: string | null;
  profession: string | null;
  items: EarningItem[];
}

export interface EmployeeEarningsMonthListState {
  data: EmployeeMonth[] | null;
  status: EmployeeEarningsMonthListStatus;
  error: string | null;
}

export interface EmployeeEarningsMonthListArgs {
  enabled?: boolean;
  [key: string]: any;
}
