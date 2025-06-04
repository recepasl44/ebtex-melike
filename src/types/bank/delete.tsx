import IBankDeleteStatus from "../../enums/bank/list";
export interface IBankDeleteState {
  data: number | null;
  status: IBankDeleteStatus;
  error: string | null;
}
