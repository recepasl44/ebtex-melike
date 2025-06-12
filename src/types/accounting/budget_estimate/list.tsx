import BudgetEstimateStatus from "../../../enums/accounting/budget_estimate/list";

export interface BudgetItem {
  id: number;
  gider_kalemi: string;
  gider_turu: string;
  toplam_gider: number;
}

export interface BudgetSummary {
  student_count: number;
  total_expense: number;
  per_student: number;
}

export interface BudgetEstimateResponse {
  data: BudgetItem[];
  summary: BudgetSummary;
}

export interface BudgetEstimateState {
  data: BudgetItem[] | null;
  summary: BudgetSummary | null;
  status: BudgetEstimateStatus;
  error: string | null;
}

export interface BudgetEstimateArgs {
  enabled?: boolean;
  [key: string]: any;
}
