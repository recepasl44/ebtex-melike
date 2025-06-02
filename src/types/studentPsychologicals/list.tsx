import { IStudent } from "../student/list";
import { StudentPsychologicalsListStatus } from "../../enums/studentPsychologicals/list";

export interface StudentPsychologicalData {
  id: number;
  student_id: number;
  student: IStudent;
  psychological_support: string | null;
  emotional_reactions: string | null;
  activity_participation: number | null;
  communication_skills: number | null;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Meta {
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
}

export interface StudentPsychologicalListResponse {
  data: StudentPsychologicalData[];
  links: Links;
  meta: Meta;
  status: StudentPsychologicalsListStatus;
}

export interface StudentPsychologicalListArg {
  enabled?: boolean;
  [key: string]: any;
}
