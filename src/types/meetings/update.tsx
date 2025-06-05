import { Meeting } from "./list";
import MeetingListStatus from "../../enums/meetings/list";

export interface MeetingUpdatePayload {
  meetingId: number;
  payload: {
    season_id: number;
    branche_id: number;
    student_id: number;
    type_id: number;
    meeting_date: string;
    meeting_note: string;
    created_by: string;
    meeting_price: any;
  };
}

export interface MeetingUpdateState {
  data: Meeting | null;
  status: MeetingListStatus;
  error: string | null;
}
