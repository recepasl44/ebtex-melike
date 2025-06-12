import { GuidanceMeetList } from "./list";
import GuidanceMeetingsListStatus from "../../enums/guidanceMeeting/list";

export interface GuidanceMeetingsUpdatePayload {
  guidanceMeetingId: number;
  payload: {
    student_id?: number;
    meeting_topic?: string;
    guidance_name?: string;
    meeting_notes?: string;
    meeting_date?: string;
  };
}
export interface GuidanceMeetingsUpdateState {
  data: GuidanceMeetList | null;
  status: GuidanceMeetingsListStatus;
  error: string | null;
}
