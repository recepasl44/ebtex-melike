import { GuidanceMeetList } from "./list";
import GuidanceMeetingsListStatus from "../../enums/guidanceMeeting/list";

export interface GuidanceMeetingsDeletePayload {
  id?: number;
}
export interface GuidanceMeetingsDeleteState {
  data: GuidanceMeetList | null;
  status: GuidanceMeetingsListStatus;
  error: string | null;
}
