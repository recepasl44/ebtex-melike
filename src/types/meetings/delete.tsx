import MeetingDeleteStatus from "../../enums/meetings/list";

export interface MeetingDeleteState {
  data: number | null;
  status: MeetingDeleteStatus;
  error: string | null;
}
