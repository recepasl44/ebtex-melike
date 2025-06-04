import { LevelData } from "./list";
import { LevelListStatus } from "../../enums/levels/list";
export interface LevelDeletePayload {
  id?: number;
}
export interface LevelDeleteState {
  data: LevelData | null;
  status: LevelListStatus;
  error: string | null;
}
