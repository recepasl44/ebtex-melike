import { IExpense } from "./list";
import ExpenseListStatus from "../../../enums/expense/main/list";

export interface ExpenseShowState {
  data: IExpense | null;
  status: ExpenseListStatus;
  error: string | null;
}
