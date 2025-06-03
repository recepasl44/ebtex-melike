import EstimatedBudgetStatus from '../../enums/estimatedBudget/list';

export interface EstimatedBudgetItem {
  id: number;
  item: string;
  type: string;
  amount: number;
}

export interface EstimatedBudgetListResponse {
  data: EstimatedBudgetItem[];
  student_count: number;
  total: number;
  per_student: number;
}

export interface EstimatedBudgetListState {
  data: EstimatedBudgetItem[] | null;
  student_count: number;
  total: number;
  per_student: number;
  status: EstimatedBudgetStatus;
  error: string | null;
}

export interface EstimatedBudgetListArg {
  enabled?: boolean;
}
