import CompensationListStatus from "../../../enums/employee/compensation/list";
import { Compensation } from "./list";

export interface compensationAddPayload {
  personel_id : number;
  tazminat_turu: string;
  odeme_sekli: string;
  miktar: string;
  banka_hesap_adi: string;
  aciklama: string;
}

export interface compensationAddState {
  data: Compensation | null;
  status: CompensationListStatus;
  error: string | null;
}
