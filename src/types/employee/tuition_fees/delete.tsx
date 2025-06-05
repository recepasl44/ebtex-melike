import TuitionFeesDeleteStatus from "../../../enums/employee/tuition_fees/list";

export interface TuitionFeesDeletePayload {
  data: number | null;
  status: TuitionFeesDeleteStatus;
  error: string | null;
}
