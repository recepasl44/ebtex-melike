import { ServicetypesData } from "./list";
import { ServicetypesListStatus } from "../../enums/serviceTypes/list";

export interface ServicetypesAddPayload {
  name?: string;
}

export interface ServicetypesAddState {
  data: ServicetypesData | null;
  status: ServicetypesListStatus;
  error: string | null;
}
