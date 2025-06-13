import SeasonListStatus from '../../enums/seasons/list'; // Season durum enum'unuz


export interface Season {
  id: number;
  name: string;
}

export interface SeasonListMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
}


export interface SeasonListResponse {
  data: Season[];
  meta: SeasonListMeta;
  links?: any;
}


export interface SeasonListState {
  data: Season[] | null;
  meta: SeasonListMeta | null;
  status: SeasonListStatus;
  error: string | null;
}
