import ICategoriesDeleteStatus from "../../../enums/expense/expenseCategories/list";

export interface IExpenseCategoryDeleteState {
  data: number | null;
  status: ICategoriesDeleteStatus;
  error: string | null;
}
