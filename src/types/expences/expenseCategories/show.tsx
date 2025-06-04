import { IExpenseCategories } from "./list";
import GetCategoriesListStatus from "../../../enums/expense/expenseCategories/list";

export interface ExpenseCategoriesShowState {
  data: IExpenseCategories | null;
  status: GetCategoriesListStatus;
  error: string | null;
}
