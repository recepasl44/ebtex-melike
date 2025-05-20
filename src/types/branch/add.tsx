import type { Branch } from './list';
import BranchListStatus from '../../enums/branch/list';

export interface BranchAddPayload {
  name: string;
  created_by?: number;
  type?: string | null;
}

export interface BranchAddState {
  data: Branch | null;
  status: BranchListStatus;
  error: string | null;
}
