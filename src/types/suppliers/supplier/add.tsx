import type { Supplier } from "./list";
import SupplierListStatus from "../../../enums/suppliers/list";

export interface SupplierAddPayload {
    register_no: string
    name: string
    mail?: string
    phone?: string
    address?: string
    fax?: string
    iban?: string
    taxNumber?: string
    taxOffice?: string
    status?: number
}

export interface SupplierAddState {
  data: Supplier | null;
  status: SupplierListStatus;
  error: string | null;
}
