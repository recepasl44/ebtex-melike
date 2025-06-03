import { IExpenseCategories } from "./list";
import GetCategoriesListStatus from "../../../enums/expense/expenseCategories/list";

export interface ExpenseCategoriesUpdatePayload {
  expenseCategoryId: number;
  payload: {
    name: string;
    description?: string;
  };
}

export interface ExpenseCategoriesUpdateState {
  data: IExpenseCategories | null;
  status: GetCategoriesListStatus;
  error: string | null;
}
