import { IStudent } from "../student/list";
import { GuidanceMeetingsListStatus } from "../../enums/guidanceMeeting/list";

export interface GuidanceMeetList {
  id: number;
  student_id: number;
  student: IStudent;
  meeting_topic: string;
  guidance_name: string;
  meeting_notes: string;
  meeting_date: string;
}
export interface links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}
export interface link {
  url: string | null;
  label: string;
  active: boolean;
}
export interface meta {
  current_page: number;
  from: number;
  last_page: number;
  links: link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}
export interface ListGuidanceMeetingsResponse {
  data: GuidanceMeetList[];
  links: links;
  meta: meta;
}

export interface GuidanceMeetListState {
  data: GuidanceMeetList[];
  links: links;
  meta: meta;
  loading: boolean;
  error: string | null;
  status: GuidanceMeetingsListStatus;
}

export interface GuidanceMeetingsListArg {
  enabled?: boolean;
  [key: string]: any;
}
