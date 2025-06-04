import MeetingListStatus from "../../enums/meetings/list";

export interface Meeting {
  id: number;
  season_id: number;
  season: null;
  branche_id: number;
  branche: null;
  student_id: number;
  student: null;
  type_id: number;
  type: null;
  meeting_date: string;
  meeting_price?: any;
  created_by: string;
  meeting_note: string;
  meeting_by: null;
  meeting_date_start: string;
  meeting_date_end: string;
  source: string;
}
export interface MeetingListMeta {
  current_page: number;
  last_page: number;
  path: string;
  links: [url: string, label: string, active: boolean];
  per_page: number;
  from: number;
  to: number;
  total: number;
}
export interface MeetingListLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface MeetingListResponse {
  data: Meeting[];
  meta: MeetingListMeta;
  links: MeetingListLinks;
}

export interface MeetingListState {
  data: MeetingListResponse | null;
  status: MeetingListStatus;
  error: string | null;
}

export interface MeetingListArg {
  enabled?: boolean;
  [key: string]: any;
}
