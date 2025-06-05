// src/types/employee/special_tutor_lesson/update.ts

import { SpecialTutorLesson } from "./list";
import SpecialTutorLessonListStatus from "../../../enums/employee/special_tutor_lesson/list";

export interface SpecialTutorLessonUpdatePayload {
  specialTutorLessonId: number;
  payload: {
    personel_id:     number;
    tarih:           string;
    baslangic_saati: string;
    bitis_saati:     string;
    ad_soyad:        string;
    ucret:           number;   // match your form number
    kar_yuzdesi:     number;   // or string if your API wants a string
  };
}

export interface SpecialTutorLessonUpdateResponse {
  data: SpecialTutorLesson | null;
  status: SpecialTutorLessonListStatus;
  error:  string | null;
}
