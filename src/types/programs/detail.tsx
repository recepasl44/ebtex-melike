
import { Program } from "./list";
import { ProgramListStatus } from "../../enums/programs/list";

export interface ProgramDetailState {
  data: Program | null;
  status: ProgramListStatus;
  error: string | null;
}
