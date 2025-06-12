import SupplierListStatus from "../../../enums/suppliers/list";

export interface SupplierDeleteState {
  data: number | null;
  status: SupplierListStatus;
  error: string | null;
}
