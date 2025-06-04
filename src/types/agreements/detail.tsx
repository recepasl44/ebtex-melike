import { AgreementsListStatus } from '../../enums/agreements/list';

export interface AgreementDetailItem {
  id: number;
  name?: string;
  [key: string]: any;
}

export interface AgreementsDetailState {
  data: AgreementDetailItem | null;
  status: AgreementsListStatus;
  error: string | null;
}
