import { GuardianMeetingData } from "./list";

export interface GuardianMeetingDetailState {
  data: GuardianMeetingData | null;
  status: string;
  error: string | null;
}
