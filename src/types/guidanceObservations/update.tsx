import { GuidanceObservation } from "./list";
import { GuidanceObservationsListStatus } from "../../enums/guidanceObservations/list";

export interface GuidanceObservationsUpdatePayload {
  guidanceObservationId: number;
  payload: {
    student_id: number;
    lesson_id: number;
    teacher_id?: number | null;
    title: string;
    description: string;
    observation_date?: string;
    status?: number;
  };
}

export interface GuidanceObservationsUpdateState {
  data: GuidanceObservation | null;
  status: GuidanceObservationsListStatus;
  error: string | null;
}
