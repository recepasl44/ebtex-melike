import { ICreditCard } from "./list";
import CreditCardListStatus from "../../enums/creditCard/list";

export interface CreditCardUpdatePayload {
  creditCardId: number;
  payload: {
    card_holder_name: string;
    card_number: string;
    expire_month: number;
    expire_year: number;
    cvv: string;
    amount: string;
    branch_id: number;
    season_id: number;
    description?: string;
  };
}

export interface CreditCardUpdateState {
  data: ICreditCard | null;
  status: CreditCardListStatus;
  error: string | null;
}
