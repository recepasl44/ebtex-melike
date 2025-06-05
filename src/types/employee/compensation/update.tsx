import { Compensation } from "./list";
import CompensationListStatus from "../../../enums/employee/compensation/list";

export interface CompensationUpdatePayload {
  compensationId: number;
  payload: {
    tazminat_turu: string;
    odeme_sekli: string;
    miktar: string;
    banka_hesap_adi: string;
    aciklama: string;
  };
}

export interface CompensationUpdateState {
  data: Compensation | null;
  status: CompensationListStatus;
  error: string | null;
}
