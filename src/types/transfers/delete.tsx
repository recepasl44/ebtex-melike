import TransferDeleteStatus from "../../enums/transfers/list";
export interface TransferDeleteState {
  data: number | null;
  status: TransferDeleteStatus;
  error: string | null;
}
