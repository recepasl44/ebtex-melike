import { IOpenAccount } from "./list";
import OpenAccountStatus from "../../enums/openAccount/list";

export interface OpenAccountAddPayload {
  customer_name: string;
  amount: string;
  some_description: string;
  branch_id: number;
  season_id: number;
}

export interface OpenAccountAddState {
  data: IOpenAccount | null;
  status: OpenAccountStatus;
  error: string | null;
}
