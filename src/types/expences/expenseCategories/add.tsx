import { IExpenseCategories } from "./list";
import GetCategoriesListStatus from "../../../enums/expense/expenseCategories/list";

export interface ExpenseCategoryAddPayload {
  name: string;
  description?: string;
}

export interface ExpenseCategoryAddState {
  data: IExpenseCategories | null;
  status: GetCategoriesListStatus;
  error: string | null;
}
