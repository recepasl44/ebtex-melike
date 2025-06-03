export interface IClassroom {
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
  data: IClassroom[];
  status: ClassroomListStatus;
  error: string | null;
}
