import { DiscountData } from "./list";

export interface DiscountDeleteState {
  data: DiscountData | null;
  status: string;
  error: string | null;
}
