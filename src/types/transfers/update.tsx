import { TransferData } from "./list";
import { TransferListStatus } from "../../enums/transfers/list";

export interface TransferUpdatePayload {
  transferId: number;
  payload: {
    name: string;
    created_by?: number;
    type?: string | null;
  };
}

export interface TransferUpdateState {
  data: TransferData | null;
  status: TransferListStatus;
  error: string | null;
}
