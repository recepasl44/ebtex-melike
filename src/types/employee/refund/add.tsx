import RefundListStatus from "../../../enums/employee/refund/list";
import { Refund } from "./list";

export interface RefundAddPayload {
  tarih: string;
  personel_id : number;
  miktar: string;
  odeme_sekli: string;
  banka_hesap_adi: string;
  aciklama: string;
}

export interface RefundAddState {
  data: Refund | null;
  status: RefundListStatus;
  error: string | null;
}
