export interface Invoice {
    id: number;
    supplier_id: number | null;
    issue_date: string;
    invoice_type_code: string;
    tax_total: string;
    payable_amount: string;
    pdf_content: string | null;
    fis_seri_no: string;
    platform_id: number;
    created_at: string;
    updated_at: string;
    gider_kalemi: string | null;
    fatura_adi: string | null;
    makbuz_no: string | null;
    register_no: string | null;
    pdf_path: string | null;
    student_id: number | null;
    enrollment_id: number | null;
    installment_id: number | null;
    invoice_number: string | null;
    document_currency_code: string | null;
}

export interface InvoiceListLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface InvoiceListArgs {
    enabled?: boolean;
    [key: string]: any;
}

export interface ListInvoiceResponse {
    current_page: number;
    data: Invoice[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: InvoiceListLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
