import { IOpenAccount } from "./list";
import OpenAccountListStatus from "../../enums/openAccount/list";

export interface OpenAccountUpdatePayload {
  openAccountId: number;
  payload: {
    name: string;
    account_number: string;
    iban: string;
    bank_id: number;
    description: string;
  };
}

export interface OpenAccountUpdateState {
  data: IOpenAccount | null;
  status: OpenAccountListStatus;
  error: string | null;
}
