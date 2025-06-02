import { Refund } from "./list";
import RefundListStatus from "../../../enums/employee/refund/list";

export interface RefundUpdatePayload {
  refundId: number;
  payload: {
    tarih: string;
    miktar: string;
    odeme_sekli: string;
    aciklama: string;
  };
}

export interface RefundUpdateState {
  data: Refund | null;
  status: RefundListStatus;
  error: string | null;
}
