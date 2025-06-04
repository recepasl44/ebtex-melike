import { DiscountData } from "./list";

export interface DiscountDetailState {
  data: DiscountData | null;
  status: string;
  error: string | null;
}
