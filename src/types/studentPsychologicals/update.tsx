import { StudentPsychologicalData } from "./list";
import StudentPsychologicalsListStatus from "../../enums/studentPsychologicals/list";

export interface StudentPsychologicalUpdatePayload {
  psychologicalId: number;
  payload: {
    psychological_support?: string;
    emotional_reactions?: string;
    activity_participation?: number;
    communication_skills?: number;
    student_id?: number;
  };
}

export interface StudentPsychologicalUpdateState {
  data: StudentPsychologicalData | null;
  status: StudentPsychologicalsListStatus;
  error: string | null;
}
