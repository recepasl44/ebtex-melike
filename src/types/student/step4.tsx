export interface StudentStep4Payload {
  studentId?: number;
  agreement_file: string;


}

export interface StudentStep4Response {
  data: any;
}

export interface StudentStep4State {
  data: any | null;
  status: StudentStep4Status;
  error: string | null;
}

export enum StudentStep4Status {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED'
}
