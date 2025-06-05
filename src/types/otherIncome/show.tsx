import { OtherIncomeData } from './list';
import OtherIncomeListStatus from '../../enums/otherIncome/list';

export interface OtherIncomeShowState {
  data: OtherIncomeData | null;
  status: OtherIncomeListStatus;
  error: string | null;
}
