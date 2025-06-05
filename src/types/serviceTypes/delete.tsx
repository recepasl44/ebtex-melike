import { ServicetypesData } from "./list";
import { ServicetypesListStatus } from "../../enums/serviceTypes/list";

export interface ServicetypesDeletePayload {
  id?: number;
}

export interface ServicetypesDeleteState {
  data: ServicetypesData | null;
  status: ServicetypesListStatus;
  error: string | null;
}
