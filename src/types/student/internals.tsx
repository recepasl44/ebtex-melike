export interface StudentInternalsResponse {
    data: {
      branche_id: number;
      all_registered: number;
      registered: number;
      next_season_registered: number;
      both_season_registered: number;
      success: string;
    };
  }
  
  export interface StudentInternalsState {
    data: StudentInternalsResponse['data'] | null;
    status: StudentInternalsStatus;
    error: string | null;
  }
  
  export enum StudentInternalsStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  export interface InternalsPayload {
    school_id: number;
    branche_id: number;
  
  }