import DebitDeleteStatus from "../../../../enums/employee/salary/debit/list";

export interface DebitDeleteState {
  data: number | null;
  status: DebitDeleteStatus;
  error: string | null;
}
