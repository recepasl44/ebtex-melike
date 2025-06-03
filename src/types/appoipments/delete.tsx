import { AppoipmenthListStatus } from '../../enums/appoipments/list'
import { data } from './list';

export interface AppointmentDeleteState {
  data: data | null;
  status: AppoipmenthListStatus;
  error: string | null;
}
