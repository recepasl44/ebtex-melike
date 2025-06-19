import { GuidanceObservation } from "./list";
import { GuidanceObservationsListStatus } from "../../enums/guidanceObservations/list";

export interface GuidanceObservationsDetailState {
  data: GuidanceObservation | null;
  status: GuidanceObservationsListStatus;
  error: string | null;
}
