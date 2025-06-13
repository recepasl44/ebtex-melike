import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useInvoiceSummaryList } from "../../hooks/invoice/useInvoiceSummary";
import { InvoiceSummary } from "../../../types/invoice/invoiceSummary";
import invoiceIcon from "../../../assets/images/media/fatura.svg";
import invoiceHoverIcon from "../../../assets/images/media/fatura-hover.svg";
import batchIcon from "../../../assets/images/media/toplu-fatura.svg";
import batchHoverIcon from "../../../assets/images/media/toplu-fatura-hover.svg";

import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useLevelsTable } from "../../hooks/levels/useList";
import { useListStudents } from "../../hooks/student/useList";


type QueryParams = {
    enabled?: boolean;
    page?: number;
    per_page?: number;
    student_id?: number;
    branch_id?: number;
    level_id?: number;
    invoice_filter?: string;
};

export default function InvoiceSummaryTable() {
    const navigate = useNavigate();
    const location = useLocation();
    const [studentText, setStudentText] = useState("");
    const [studentId, setStudentId] = useState<number | undefined>(undefined);
    const [branch, setBranch] = useState("");
    const [level, setLevel] = useState("");
    const [invoiceFilter, setInvoiceFilter] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(25);

    const [filtersEnabled, setFiltersEnabled] = useState({
        search: false,
        branch: false,
        level: false,
        invoice_filter: false,
    });

    const { data: studentOptions } = useListStudents({
        enabled: filtersEnabled.search,
        first_name: studentText,
        page: 1,
        pageSize: 100,
    });

    const { branchData } = useBranchTable({ enabled: filtersEnabled.branch });
    const { levelsData } = useLevelsTable({ enabled: filtersEnabled.level });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("student_id")) {
            const id = Number(params.get("student_id"));
            setStudentId(id);
            // find matching student to display label
            const match = studentOptions?.find((s) => s.id === id);
            if (match) setStudentText(`${match.first_name} ${match.last_name}`);
        }
        if (params.get("branch_id")) setBranch(params.get("branch_id")!);
        if (params.get("level_id")) setLevel(params.get("level_id")!);
        if (params.get("invoice_filter")) setInvoiceFilter(params.get("invoice_filter")!);
        if (params.get("page")) setPage(Number(params.get("page")));
        if (params.get("per_page")) setPerPage(Number(params.get("per_page")));
    }, [location.search, studentOptions]);

    const handleFilterChange = (key: keyof typeof filtersEnabled, value: string) => {
        setFiltersEnabled((prev) => ({ ...prev, [key]: true }));
        switch (key) {
            case "search":
                setStudentText(value);
                break;
            case "branch":
                setBranch(value);
                break;
            case "level":
                setLevel(value);
                break;
            case "invoice_filter":
                setInvoiceFilter(value);
                break;
        }
    };

    const filters = useMemo(
        () => [
            {
                key: "student_id",
                label: "Öğrenci Adı",
                type: "autocomplete" as const,
                value: studentText,
                options: (studentOptions || []).map((s) => ({
                    value: String(s.id),
                    label: `${s.first_name} ${s.last_name}`,
                })),
                onInputChange: (text: string) => handleFilterChange("search", text),
                onChange: (val: string) => {
                    handleFilterChange("search", val);
                    setStudentId(Number(val));
                },
            },
            {
                key: "branch_id",
                label: "Şube",
                type: "select" as const,
                value: branch,
                options: (branchData || []).map((b) => ({
                    value: String(b.id),
                    label: b.name,
                })),
                onClick: () => setFiltersEnabled((p) => ({ ...p, branch: true })),
                onChange: (val: string) => handleFilterChange("branch", val),
            },
            {
                key: "level_id",
                label: "Sınıf Seviyesi",
                type: "select" as const,
                value: level,
                options: (levelsData || []).map((l) => ({
                    value: String(l.id),
                    label: l.name,
                })),
                onClick: () => setFiltersEnabled((p) => ({ ...p, level: true })),
                onChange: (val: string) => handleFilterChange("level", val),
            },
            {
                key: "invoice_filter",
                label: "Fatura Filtre",
                type: "select" as const,
                value: invoiceFilter,
                options: [
                    { value: "", label: "Hepsi" },
                    { value: "invoiced", label: "Faturası Kesilmiş" },
                    { value: "not_invoiced", label: "Faturası Kesilmemiş" },
                    { value: "service_invoiced", label: "Hizmet Faturası Kesilmiş" },
                    { value: "service_not_invoiced", label: "Hizmet Faturası Kesilmemiş" },
                    { value: "installment_invoiced", label: "Taksit Faturası Kesilmiş" },
                    { value: "installment_not_invoiced", label: "Taksit Faturası Kesilmemiş" },
                ],
                onChange: (val: string) => handleFilterChange("invoice_filter", val),
            },
        ],
        [studentOptions, branchData, levelsData, studentText, branch, level, invoiceFilter]
    );

    const queryParams: QueryParams = useMemo(
        () => ({
            enabled: true,
            page,
            per_page: perPage,
            student_id: studentId,
            branch_id: branch ? Number(branch) : undefined,
            level_id: level ? Number(level) : undefined,
            invoice_filter: invoiceFilter || undefined,
        }),
        [studentId, branch, level, invoiceFilter, page, perPage]
    );

    const { summaryData, loading, error, totalPages, totalItems } =
        useInvoiceSummaryList(queryParams);

    const columns: ColumnDefinition<InvoiceSummary>[] = useMemo(
        () => [
            { key: "branch_name", label: "Şube", render: (r) => r.branch_name },
            { key: "contract_no", label: "Söz No", render: (r) => r.contract_no },
            { key: "ad_soyad", label: "Adı Soyadı", render: (r) => r.ad_soyad },
            { key: "class_name", label: "Sınıf", render: (r) => r.class_name },
            {
                key: "invoices_count",
                label: "Fatura Sayısı",
                render: (r) => r.invoices_count,
            },
            {
                key: "invoices_total",
                label: "Fatura Tutarı",
                render: (r) =>
                    `${parseFloat(r.invoices_total).toLocaleString()} ₺`,
            },
            {
                key: "printed_invoices_count",
                label: "Kesilen Fatura",
                render: (r) => r.printed_invoices_count,
            },
            {
                key: "printed_invoices_total",
                label: "Kesilen Tutarı",
                render: (r) =>
                    `${parseFloat(r.printed_invoices_total).toLocaleString()} ₺`,
            },
            {
                key: "actions",
                label: "İşlemler",
                render: (r) => (
                        <>
                        <button
                            onClick={() => navigate(`/studentinvoices/${r.id}`)}
                            className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                            title="Faturalar"
                        >
                            <i className="ti ti-eye" />
                        </button>
                        <button
                            onClick={() => navigate(`/invoicedetail/${r.id}`)}
                            className="btn btn-icon btn-sm btn-info-light rounded-pill"
                            title="Fatura Oluştur"
                        >
                            <img
                                src={invoiceIcon}
                                alt="Fatura"
                                style={{ width: 24, height: 24 }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.src = invoiceHoverIcon)
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.src = invoiceIcon)
                                }
                            />
                        </button>
                        <button
                            onClick={() => navigate(`/createinvoice/${r.id}`)}
                            className="btn btn-icon btn-sm btn-success-light rounded-pill"
                            title="Toplu Fatura Oluştur"
                        >
                            <img
                                src={batchIcon}
                                alt="Toplu Fatura"
                                style={{ width: 24, height: 24 }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.src = batchHoverIcon)
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.src = batchIcon)
                                }
                            />
                        </button>
                    </>

                ),
            },
        ],
        [navigate]
    );

    return (
        <ReusableTable<InvoiceSummary>
            columns={columns}
            data={summaryData}
            loading={loading}
            error={error}
            filters={filters}
            showModal={false}
            showExportButtons={true}
            tableMode="single"
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={perPage}
            currentPage={page}
            onPageChange={setPage}
            onPageSizeChange={setPerPage}
        />
    );
}
