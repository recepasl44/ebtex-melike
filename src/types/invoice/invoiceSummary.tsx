export interface InvoiceSummary {
    id: number;
    branch_name: string;
    contract_no: number;
    first_name: string;
    last_name: string;
    class_name: string;
    ad_soyad: string;
    tutar: string;
    invoices_count: number;
    invoices_total: string;
    printed_invoices_count: number;
    printed_invoices_total: string;
    invoiced_services: any;
    not_invoiced_services: string;
    invoiced_installments: any;
    not_invoiced_installments: string;
}

export interface InvoiceSummaryListArgs {
    enabled?: boolean;
    page?: number;
    per_page?: number;
    first_name?: string;
    name?: string;
    branch_id?: number;
    level_id?: number;
    invoice_filter?: string;
    [key: string]: any;
}

export interface InvoiceSummaryListResponse {
    data: InvoiceSummary[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}
