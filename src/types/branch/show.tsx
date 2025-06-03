import { Branch } from './list';
import BranchListStatus  from '../../enums/branch/list';
export interface BranchShowState {
  data: Branch | null;
  status: BranchListStatus;
  error: string | null;
}
