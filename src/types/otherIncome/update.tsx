import { OtherIncomeData } from './list';
import OtherIncomeListStatus from '../../enums/otherIncome/list';

export interface OtherIncomeUpdatePayload {
  id: number;
  payload: {
    season: string;
    date: string;
    customer_id: number;
    income_item: string;
    payment_method: string;
    amount: number;
    description: string;
    other_income_category_id?: number;
  };
}

export interface OtherIncomeUpdateState {
  data: OtherIncomeData | null;
  status: OtherIncomeListStatus;
  error: string | null;
}
