import { Personel } from "./list";
import PersonelListStatus from "../../../enums/employee/personel/list";

export interface PersonelUpdatePayload {
  personelId: number;
  payload: {
    ad?: string;
    soyad?: string;
    tc_kimlik_no?: string;
    telefon?: string;
    email?: string;
    aggrements_date?: { startDate: string; endDate: string };
    adres?: string;
    pozisyon?: string;
    dogum_tarihi?: string;
    aktif? : number
  };
}

export interface PersonelUpdateState {
  data: Personel | null;
  status: PersonelListStatus;
  error: string | null;
}
