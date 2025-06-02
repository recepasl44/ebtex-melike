import { IExpense } from "./list";
import ExpenseListStatus from "../../../enums/expense/main/list";

export interface ExpenseUpdatePayload {
  expenseId: number;
  payload: {
    supplier_id: number;
    season: number;
    invoice_serial_no: string;
    invoice_date: string;
    expense_category_id: number;
    amount: number;
    description: string;
    status: string;
  };
}

export interface ExpenseUpdateState {
  data: IExpense | null;
  status: ExpenseListStatus;
  error: string | null;
}
