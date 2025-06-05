import { AgreementsListStatus } from '../../enums/agreements/list';

export interface AgreementsAddPayload {
  id?: number;
  student_id: number;
  agreement_type: number;
  enrollments: { id: string }[];
}

export interface AgreementsAddResponse {
  data: any;
  success: boolean;
  message: string;
  pdf_url: string;
}

export interface AgreementsAddState {
  data: AgreementsAddResponse | null;
  status: AgreementsListStatus;
  error: string | null;
}
