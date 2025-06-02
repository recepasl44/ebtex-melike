import GuardianMeetingListStatus from "../../enums/guardianMeeting/list";
import { GuardianData } from "../guardian/list";
import { IStudent } from "../student/list";

export interface GuardianMeetingData {
  id: number;
  student_id: number;
  student: IStudent;
  guardian_id: number;
  guardian: GuardianData;
  teacher_id: number;
  teacher: any;
  subject: string;
  suggestions: string;
  guardian_requests: string;
  satisfaction_status: string;
  working_time: number;
  meeting_type: number;
  meeting_date: string;
  notes: string;
  status: number;
}

export interface GuardianMeetingLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface GuardianMeetingMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export interface GuardianMeetingListResponse {
  data: GuardianMeetingData[];
  links: GuardianMeetingLinks;
  meta: GuardianMeetingMeta;
}

export interface GuardianMeetingListState {
  data: GuardianMeetingData[];
  links: GuardianMeetingLinks;
  meta: GuardianMeetingMeta;
  loading: boolean;
  error: string | null;
  status: GuardianMeetingListStatus;
}

export interface GuardianMeetingListArg {
  enabled?: boolean;
  [key: string]: any;
}
