import { GuidanceObservation } from "./list";
import { GuidanceObservationsListStatus } from "../../enums/guidanceObservations/list";

export interface GuidanceObservationsAddPayload {
  student_id: number;
  lesson_id: number;
  teacher_id?: number | null;
  title: string;
  description: string;
  status?: number;
  observation_date?: string;
}

export interface GuidanceObservationsAddState {
  data: GuidanceObservation | null;
  status: GuidanceObservationsListStatus;
  error: string | null;
}
