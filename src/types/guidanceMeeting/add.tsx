import { GuidanceMeetList } from "./list";
import GuidanceMeetingsListStatus from "../../enums/guidanceMeeting/list";

export interface GuidanceMeetingsAddPayload {
  student_id: number;
  meeting_topic: string;
  guidance_name: string;
  meeting_notes: string;
  meeting_date?: string;
}
export interface GuidanceMeetingsAddState {
  data: GuidanceMeetList | null;
  status: GuidanceMeetingsListStatus;
  error: string | null;
}
