import { GuidanceMeetList } from "./list";
import GuidanceMeetingsListStatus from "../../enums/guidanceMeeting/list";

export interface GuidanceMeetingsDetailState {
  data: GuidanceMeetList | null;
  status: GuidanceMeetingsListStatus;
  error: string | null;
}
