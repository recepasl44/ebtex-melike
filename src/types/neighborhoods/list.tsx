
export interface INeighborhood {
    id: number;
    name: string;

  }
  
  export enum NeighborhoodListStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED',
  }
  
  export interface NeighborhoodListState {
    data: INeighborhood[];
    status: NeighborhoodListStatus;
    error: string | null;
  }
  