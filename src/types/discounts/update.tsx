import { DiscountData } from "./list";

export interface DiscountUpdatePayload {
  discountId: number;
  payload: {
    name: string;
    type: number;
    discount_type: number;
    service_id: number;
    amount: string;
  };
}

export interface DiscountUpdateState {
  data: DiscountData | null;
  status: string;
  error: string | null;
}
