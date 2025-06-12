import { IBank } from "./list";
import BankListStatus from "../../enums/bank/list";

export interface BankShowState {
  data: IBank | null;
  status: BankListStatus;
  error: string | null;
}
