import InvoiceListStatus from "../../enums/invoice/list";
import { Invoice } from "./list";

export interface InvoiceDetail extends Invoice {
    details: Invoice[];
}

export interface InvoiceDetailState {
    data: InvoiceDetail | null;
    status: InvoiceListStatus;
    error: string | null;
}
