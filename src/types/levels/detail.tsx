import { LevelData } from "./list";
import { LevelListStatus } from "../../enums/levels/list";
export interface LevelDetailState {
  data: LevelData | null;
  status: LevelListStatus;
  error: string | null;
}
