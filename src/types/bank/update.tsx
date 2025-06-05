import { IBank } from "./list";
import BankListStatus from "../../enums/bank/list";

export interface BankUpdatePayload {
  bankId: number;
  payload: {
    name: string;
    account_number: string;
    iban: string;
    bank_id: number;
    description: string;
  };
}

export interface BankUpdateState {
  data: IBank | null;
  status: BankListStatus;
  error: string | null;
}
