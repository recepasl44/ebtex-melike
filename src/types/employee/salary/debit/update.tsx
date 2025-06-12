import { Debit } from "./list";
import DebitListStatus from "../../../../enums/employee/salary/debit/list";

export interface DebitUpdatePayload {
  debitId: number;
  payload: {
    aylik_ucret: string;
    odeme_sekli: string;
    maas_sayisi: number;
    baslangic_tarihi: string;
  };
}

export interface DebitUpdateState {
  data: Debit | null;
  status: DebitListStatus;
  error: string | null;
}
