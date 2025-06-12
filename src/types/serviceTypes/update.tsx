import { ServicetypesData } from "./list";
import { ServicetypesListStatus } from "../../enums/serviceTypes/list";

export interface ServicetypesUpdatePayload {
  servicetypeId?: number;
  payload: {
    name?: string;
  };
}

export interface ServicetypesUpdateState {
  data: ServicetypesData | null;
  status: ServicetypesListStatus;
  error: string | null;
}
