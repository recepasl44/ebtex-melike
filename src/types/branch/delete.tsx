import BranchDeleteStatus  from '../../enums/branch/list';
export interface BranchDeleteState {
    data: number | null; 
    status: BranchDeleteStatus;
    error: string | null;
  }
  