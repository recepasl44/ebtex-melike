import { ICreditCard } from "./list";
import CreditCardListStatus from "../../enums/creditCard/list";

export interface CreditCardShowState {
  data: ICreditCard | null;
  status: CreditCardListStatus;
  error: string | null;
}
