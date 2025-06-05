import CompensationListStatus from "../../../enums/employee/compensation/list";

export interface CompensationDeleteState {
  data: number | null;
  status: CompensationListStatus;
  error: string | null;
}
