import { GuardianData } from "./list";
import GuardiansListStatus from "../../enums/guardian/list";

export interface GuardianDetailState {
  data: GuardianData | null;
  status: GuardiansListStatus;
  error: string | null;
}
