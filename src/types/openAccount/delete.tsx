import IOpenAccountDeleteStatus from "../../enums/openAccount/list";

export interface IOpenAccountDeleteState {
  data: number | null;
  status: IOpenAccountDeleteStatus;
  error: string | null;
}
