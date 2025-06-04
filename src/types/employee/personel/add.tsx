import PersonelListStatus from "../../../enums/employee/personel/list";
import { Personel } from "./list";

export interface PersonelAddPayload {
  ad: string;
  soyad: string;
  tc_kimlik_no: string;
  telefon: string;
  email: string;
  adres: string;
  pozisyon: string;
  dogum_tarihi: string;
  mesleki_yas: string;
  ikametgah_adresi: string;
  gorev: string;
  brans: string;
  profil_foto: string;
  works_for: string;
  base_salary: string;
  aggrements_date: { startDate: string; endDate: string };
  not_paid_date: [];
}

export interface PersonelAddState {
  data: Personel | null;
  status: PersonelListStatus;
  error: string | null;
}
