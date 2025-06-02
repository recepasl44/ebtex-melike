import InvoiceListStatus from "../../enums/invoice/list";
import { Invoice } from "./list";

export type InvoiceDeletePayload = number;

export interface InvoiceDeleteState {
    data: Invoice | null;
    status: InvoiceListStatus;
    error: string | null;
}
