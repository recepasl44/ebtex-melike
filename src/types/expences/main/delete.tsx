import IExpenseDeleteStatus from "../../../enums/expense/main/list";
export interface IExpenseDeleteState {
  data: number | null;
  status: IExpenseDeleteStatus;
  error: string | null;
}
