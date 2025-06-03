import { ServicetypesData } from "./list";
import { ServicetypesListStatus } from "../../enums/serviceTypes/list";

export interface ServicetypesDetailState {
  data: ServicetypesData | null;
  status: ServicetypesListStatus;
  error: string | null;
}
