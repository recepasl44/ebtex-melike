import { Primler } from "./list";
import { PrimlerListStatus } from "../../../enums/employee/primler/list";

export interface PrimlerShowState {
  data: Primler | null;
  status: PrimlerListStatus;
  error: string | null;
}
