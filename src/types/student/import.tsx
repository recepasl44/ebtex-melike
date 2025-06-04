export interface StudentImportPayload {
    student_import: File;
  }
  
  export interface StudentImportResponse {
    data: any;
  }
  
  export interface StudentImportState {
    data: any | null;
    status: StudentImportStatus;
    error: string | null;
  }
  
  export enum StudentImportStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  