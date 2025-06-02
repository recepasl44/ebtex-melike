import { IBank } from "./list";
import BankListStatus from "../../enums/bank/list";

export interface BankAddPayload {
  bank_name: string;
  amount: string;
  iban: string;
  branch_id: number;
  season_id: number;
}

export interface BankAddState {
  data: IBank | null;
  status: BankListStatus;
  error: string | null;
}
