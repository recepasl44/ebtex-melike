import { GuardianMeetingData } from "./list";

export interface GuardianMeetingAddPayload {
  student_id?: number;
  guardian_id?: number;
  teacher_id?: number;
  subject?: string;
  suggestions?: string;
  guardian_requests?: string;
  satisfaction_status?: string;
  meeting_type?: number;
  meeting_date?: string;
  notes?: string;
  status?: number;
}

export interface GuardianMeetingAddState {
  data: GuardianMeetingData | null;
  status: string;
  error: string | null;
}
