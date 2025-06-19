import { GuidanceObservation } from "./list";
import { GuidanceObservationsListStatus } from "../../enums/guidanceObservations/list";

export interface GuidanceObservationsDeletePayload {
  id?: number;
}

export interface GuidanceObservationsDeleteState {
  data: GuidanceObservation | null;
  status: GuidanceObservationsListStatus;
  error: string | null;
}
