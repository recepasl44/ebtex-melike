import BranchListStatus from "../../enums/branch/list";
export interface Branch {
  id?: number;
  name: string;
  created_by?: number;
  type: string | null;
}

export interface BranchListMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
}

export interface BranchListResponse {
  data: Branch[];
  meta: BranchListMeta;
  links?: any;
}

export interface BranchListState {
  data: Branch[] | null;
  meta: BranchListMeta | null;
  status: BranchListStatus;
  error: string | null;
}

export interface BranchListArg {
  enabled?: boolean;
  [key: string]: any;
}
