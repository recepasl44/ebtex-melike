import { ICreditCard } from "./list";
import CreditCardListStatus from "../../enums/creditCard/list";

export interface CreditCardUpdatePayload {
  creditCardId: number;
  payload: {
    name: string;
    account_number: string;
    iban: string;
    bank_id: number;
    description: string;
  };
}

export interface CreditCardUpdateState {
  data: ICreditCard | null;
  status: CreditCardListStatus;
  error: string | null;
}
