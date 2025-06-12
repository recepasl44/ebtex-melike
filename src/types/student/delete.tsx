export interface DeleteStudentResponse {
    data: { id: number };
  }
  
  export interface DeleteStudentState {
    data: { id: number } | null;
    status: DeleteStudentStatus;
    error: string | null;
  }
  
  export enum DeleteStudentStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  