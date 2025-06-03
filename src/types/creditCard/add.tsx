import { ICreditCard } from "./list";
import CreditCardListStatus from "../../enums/creditCard/list";

export interface CreditCardAddPayload {
  card_holder_name: string;
  card_number: string;
  expire_month: string;
  expire_year: string;
  cvv: string;
  amount: string;
  branch_id: number;
  season_id: number;
}

export interface CreditCardAddState {
  data: ICreditCard | null;
  status: CreditCardListStatus;
  error: string | null;
}
