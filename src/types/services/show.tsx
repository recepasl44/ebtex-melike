import { IService } from "./list";
import { ServicesListStatus } from "../../enums/service/list";

export interface ServiceDetailState {
  data: IService | null;
  status: ServicesListStatus;
  error: string | null;
}
