import { Supplier } from "./list";
import SupplierListStatus from "../../../enums/suppliers/list";

export interface SupplierShowState {
  data: Supplier | null;
  status: SupplierListStatus;
  error: string | null;
}
