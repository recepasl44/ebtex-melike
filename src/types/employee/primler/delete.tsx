import PrimlerDeleteStatus from "../../../enums/employee/primler/list";

export interface PrimlerDeleteState {
  data: number | null;
  status: PrimlerDeleteStatus;
  error: string | null;
}
