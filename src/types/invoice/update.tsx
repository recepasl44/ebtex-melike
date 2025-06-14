import InvoiceListStatus from "../../enums/invoice/list";
import { InvoiceAddPayload } from "./add";
import { Invoice } from "./list";

export interface InvoiceUpdatePayload {
    invoiceId: number;
    payload: InvoiceAddPayload;
}

export interface InvoiceUpdateState {
    data: Invoice | null;
    status: InvoiceListStatus;
    error: string | null;
}
