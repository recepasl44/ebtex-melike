import { Meeting } from "./list";
import MeetingListStatus from "../../enums/meetings/list";

export interface MeetingShowState {
  data: Meeting | null;
  status: MeetingListStatus;
  error: string | null;
}
