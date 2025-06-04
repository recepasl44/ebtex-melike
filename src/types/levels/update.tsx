import { LevelData } from "./list";
import { LevelListStatus } from "../../enums/levels/list";
export interface LevelUpdatePayload {
  levelId: number;
  payload: {
    program_id?: number;
    name: string;
  };
}
export interface LevelUpdateState {
  data: LevelData | null;
  status: LevelListStatus;
  error: string | null;
}
