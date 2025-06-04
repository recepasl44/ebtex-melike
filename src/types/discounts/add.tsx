import { DiscountData } from "./list";

export interface DiscountAddPayload {
  name: string;
  type: number;
  discount_type: number;
  service_id: number;
  amount: string;
}

export interface DiscountAddState {
  data: DiscountData | null;
  status: string;
  error: string | null;
}
