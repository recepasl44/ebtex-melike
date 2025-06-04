import { DebitListStatus } from "../../../../enums/employee/salary/debit/list";
import { Debit } from "./list";

export interface DebitAddPayload {
  personel_id: number;
  aylik_ucret: string;
  odeme_sekli: string;
  maas_sayisi: number;
  baslangic_tarihi: string;
}

export interface DebitAddState {
  data: Debit | null;
  status: DebitListStatus;
  error: string | null;
}
