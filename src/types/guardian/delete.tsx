import { GuardianData } from "./list";
import GuardiansListStatus from "../../enums/guardian/list";

export interface GuardiansDeletePayload {
  id?: number;
}

export interface GuardiansDeleteState {
  data: GuardianData | null;
  status: GuardiansListStatus;
  error: string | null;
}
