import { WeeklyLessonCount } from "./list";
import WeeklyLessonCountListStatus from "../../../enums/employee/weekly_lesson_count/list";

export interface WeeklyLessonCountUpdatePayload {
  weeklyLessonCountId: number;
  payload: {
    hafta_kac_gun?: number;
    gunluk_ucret?: number;
    personel_id?: number;
    tarih?: string;
    baslangic_saati?: string;
    bitis_saati?: string;
    ogrenci_sayisi?: number;
    ders_ucreti?: number;
    gelir?: number;
  };
}



export interface WeeklyLessonCountUpdateState {
  data: WeeklyLessonCount | null;
  status: WeeklyLessonCountListStatus;
  error: string | null;
}
