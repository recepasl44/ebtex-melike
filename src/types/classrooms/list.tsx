export interface IClassroom {
  lesson_times: never[];
  classroom_id: number;
  id: number;
  name: string;
  branche_id: number;
  branche: {
    id: number;
    name: string;
    created_by: number;
    type: number;
  };
  school_id: number;
  school: unknown;
  level_id: number;
  quota: number | null;
  level: unknown;
}

export interface ClassroomMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: { url: string | null; label: string; active: boolean }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ListClassroomResponse {
  data: IClassroom[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: ClassroomMeta;
}

export interface ClassroomListArg {
  [key: string]: any;
  enabled?: boolean;
}

export enum ClassroomListStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}

// Redux slice’daki state tipi:
export interface ClassroomListState {
  data: IClassroom[] | null;
  links: ListClassroomResponse['links'] | null;
  meta: ListClassroomResponse['meta'] | null;
  status: ClassroomListStatus;
  error: string | null;
}
