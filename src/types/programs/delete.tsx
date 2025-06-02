
import { Program } from "./list";
import { ProgramListStatus } from "../../enums/programs/list";

export interface ProgramDeletePayload {
  id?: number;
}

export interface ProgramDeleteState {
  data: Program | null;
  status: ProgramListStatus;
  error: string | null;
}
