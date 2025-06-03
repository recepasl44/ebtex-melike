import { IExpense } from "./list";
import ExpenseListStatus from "../../../enums/expense/summary/list";

export interface ExpenseAddPayload {
  supplier_id: number;
  season: number;
  invoice_serial_no: string;
  invoice_date: string;
  expense_category_id: number;
  amount: number;
  description: string;
  status: string;
  payment_status?: string;
  payment_details?: {
    due_date: string;
    amount: number;
    description: string;
  };
}

export interface ExpenseAddState {
  data: IExpense | null;
  status: ExpenseListStatus;
  error: string | null;
}
