import { GuardianMeetingData } from "./list";

export interface GuardianMeetingDeletePayload {
  id: number;
}

export interface GuardianMeetingDeleteState {
  data: GuardianMeetingData | null;
  status: string;
  error: string | null;
}
