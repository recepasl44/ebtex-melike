import { IOpenAccount } from "./list";
import OpenAccountListStatus from "../../enums/openAccount/list";

export interface OpenAccountShowState {
  data: IOpenAccount | null;
  status: OpenAccountListStatus;
  error: string | null;
}
