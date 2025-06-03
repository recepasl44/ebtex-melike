import SpecialTutorLessonListStatus from "../../../enums/employee/special_tutor_lesson/list";

// src/types/employee/special_tutor_lesson/add.ts
export interface SpecialTutorLessonAddPayload {
  personel_id:     number;
  tarih:           string;
  baslangic_saati: string;
  bitis_saati:     string;
  ad_soyad:        string;
  ucret?:           number;  // or string if your API expects a string—but number is more consistent
  kar_yuzdesi:     number;
}


export interface SpecialTutorLessonAddState {
  data: SpecialTutorLessonAddPayload | null;
  status: SpecialTutorLessonListStatus;
  error: string | null;
}
