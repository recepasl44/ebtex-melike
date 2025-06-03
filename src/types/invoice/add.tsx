export interface InvoiceDetailItem {
    item_name: string;
    unit_price: number;
    quantity: number;
    line_extension_amount: number;
    vat_rate: number;
}

export interface InvoiceAddPayload {
    student_id: number;
    invoice_number: string;
    serial: string;
    issue_date: string;
    invoice_type_code: string;
    document_currency_code: string;
    enrollments_id: any;
    invoice_count_status: boolean;
    invoice_count: any;
    enrollment_id?: number;
    installment_id?: number;
    payment_id?: number;
    payable_amount: number;
    details: InvoiceDetailItem[];
}

import InvoiceListStatus from "../../enums/invoice/list";
import { Invoice } from "./list";
export interface InvoiceAddState {
    data: Invoice | null;
    status: InvoiceListStatus;
    error: string | null;
}
