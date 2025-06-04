import { IService } from "./list";
import { ServicesListStatus } from "../../enums/service/list";

export interface ServicesUpdatePayload {
  service_id: number;
  payload: {
    branche_id?: number;
    level_id?: number;
    course_id?: number;
    program_id?: number;
    type_id?: number;
    start_installment_date?: string;
    end_installment_date?: string;
    name?: string;
    price?: string;
    is_main?: number;
    max_installments?: number;
    max_discounts?: number;
    accept_discount?: number;
    vat_rate?: string;
  };
}

export interface ServicesUpdateState {
  data: IService | null;
  status: ServicesListStatus;
  error: string | null;
}
