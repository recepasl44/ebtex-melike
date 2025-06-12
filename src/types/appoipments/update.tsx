import {AppoipmenthListStatus} from '../../enums/appoipments/list'
import  {data} from './list';
export interface AppoipmentPayload {
    appoipmentId: number;
    payload: {
        season_id: string | number;
    branche_id: string | number;
    student_id: string | number;
    type_id: string | number; 
    meeting_date: string;
    meeting_note: string;
    created_by?: string | number; 
    meeting_by?: string | number; 
    };
}
export interface QuestionsAddState {
  data: data | null;
  status: AppoipmenthListStatus;
  error: string | null;
}
