import {AppoipmenthListStatus} from '../../enums/appoipments/list'
import  {data} from './list';
export interface AppoipmentById
{
 id : number;
}
export interface QuestionsAddState {
    data: data | null;
    status: AppoipmenthListStatus;
    error: string | null;
  }
export interface AppoipmentResponse{
  
    data : data[];
   
  }