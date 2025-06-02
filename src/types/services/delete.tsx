import { IService } from "./list";
import { ServicesListStatus } from "../../enums/service/list";

export interface ServicesDeletePayload {
  id?: number;
}

export interface ServicesDeleteState {
  data: IService | null;
  status: ServicesListStatus;
  error: string | null;
}
