import { Branch } from './list';
import BranchListStatus  from '../../enums/branch/list';

export interface BranchUpdatePayload {
  branchId: number;
  payload: {
    name: string;
    created_by?: number;
    type?: string | null;
  };
}

export interface BranchUpdateState {
  data: Branch | null;
  status: BranchListStatus;
  error: string | null;
}
