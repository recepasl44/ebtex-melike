import { TransferData } from "./list";

import TransferListStatus from "../../enums/transfers/list";
export interface TransferShowState {
  data: TransferData | null;
  status: TransferListStatus;
  error: string | null;
}
