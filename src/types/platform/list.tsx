
export interface IPlatform {
    id: number;
    name: string;
    owner_name?: string;
  }
  
  export enum PlatformListStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED',
  }
  
  export interface PlatformListState {
    data: IPlatform[];
    status: PlatformListStatus;
    error: string | null;
  }
  