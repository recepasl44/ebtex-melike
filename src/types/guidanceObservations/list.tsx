import GuidanceObservationsListStatus from "../../enums/guidanceObservations/list";
import { data } from "../lessons/list";
import { IStudent } from "../student/list";

export interface GuidanceObservation {
  id: number;
  student_id: number;
  student: IStudent;
  lesson_id: number;
  lesson: data;
  teacher_id: number;
  teacher: any;
  title: string;
  description: string;
  observation_date: string;
  status: number;
}

export interface GuidanceObservationsListResponse {
  data: GuidanceObservation[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface GuidanceObservationsListState {
  data: GuidanceObservation[];
  loading: boolean;
  error: string | null;
  status: GuidanceObservationsListStatus;
}

export interface GuidanceObservationsListArg {
  enabled?: boolean;
  [key: string]: any;
}
