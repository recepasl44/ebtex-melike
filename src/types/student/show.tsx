import { IStudent } from './list';

export interface ShowStudentResponse {
  data: IStudent;
}

export interface ShowStudentState {
  data: IStudent | null;
  status: StudentStatus;
  error: string | null;
}

export enum StudentStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED'
}
