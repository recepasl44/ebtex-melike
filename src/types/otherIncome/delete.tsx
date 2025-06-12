import OtherIncomeListStatus from '../../enums/otherIncome/list';

export interface OtherIncomeDeleteState {
  data: number | null;
  status: OtherIncomeListStatus;
  error: string | null;
}
