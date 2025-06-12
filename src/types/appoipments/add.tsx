import { AppoipmenthListStatus } from '../../enums/appoipments/list'
import { data } from './list';
export interface AppoipmentPayload {
  season_id: number; //sezon_id
  branche_id: number; //sube
  student_id: number; //ogrenci_id
  type_id?: number;  //gorusme_turu
  meeting_date: string;  //tarih
  meeting_note: string; //gorusme_notlari

}
export interface QuestionsAddState {
  data: data | null;
  status: AppoipmenthListStatus;
  error: string | null;
}
