import { LevelData } from "./list";
import { LevelListStatus } from "../../enums/levels/list";
export interface LevelAddPayload {
  id?: number;
  program_id?: number;
  name?: string;
}
export interface LevelAddState {
  data: LevelData | null;
  status: LevelListStatus;
  error: string | null;
}
