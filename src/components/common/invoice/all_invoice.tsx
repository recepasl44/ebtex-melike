import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useInvoiceList } from "../../hooks/invoice/useList";
import { Invoice } from "../../../types/invoice/list";
import { Button } from "react-bootstrap";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useLevelsTable } from "../../hooks/levels/useList";
import { useListStudents } from "../../hooks/student/useList";

type InvoiceQueryParams = {
    [key: string]: any;
    enabled?: boolean;
    page?: number;
    per_page?: number;
    search?: string;
    branch_id?: number;
    level_id?: number;
    invoice_filter?: string;
};

export default function InvoiceListPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [fullName, setFullName] = useState("");
    const [branch, setBranch] = useState("");
    const [level, setLevel] = useState("");
    const [invoiceFilter, setInvoiceFilter] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [filtersEnabled, setFiltersEnabled] = useState({
        search: false,
        branch: false,
        level: false,
        invoiceFilter: false,
    });

    const { data: studentOptions } = useListStudents({
        enabled: filtersEnabled.search,
        first_name: fullName,
        page: 1,
        pageSize: 100,
    });

    const { branchData } = useBranchTable({
        enabled: filtersEnabled.branch,
    });

    const { levelsData } = useLevelsTable({
        enabled: filtersEnabled.level,
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("search")) setFullName(params.get("search")!);
        if (params.get("branch_id")) setBranch(params.get("branch_id")!);
        if (params.get("level_id")) setLevel(params.get("level_id")!);
        if (params.get("invoice_filter")) setInvoiceFilter(params.get("invoice_filter")!);
        if (params.get("page")) setPage(Number(params.get("page")));
        if (params.get("per_page")) setPageSize(Number(params.get("per_page")));
    }, [location.search]);

    const handleFilterChange = (key: keyof typeof filtersEnabled, value: string) => {
        setFiltersEnabled(prev => ({ ...prev, [key]: true }));
        if (key === "search") setFullName(value);
        if (key === "branch") setBranch(value);
        if (key === "level") setLevel(value);
        if (key === "invoiceFilter") setInvoiceFilter(value);
    };

    const filters = useMemo(() => [
        {
            key: "search",
            label: "Öğrenci Adı",
            type: "autocomplete" as const,
            value: fullName,
            options: (studentOptions || []).map(s => ({
                value: s.first_name,
                label: `${s.first_name} ${s.last_name}`,
            })),
            onInputChange: (text: string) => handleFilterChange("search", text),
            onChange: (val: string) => handleFilterChange("search", val),
        },
        {
            key: "branch_id",
            label: "Şube",
            type: "select" as const,
            onClick: () => setFiltersEnabled(prev => ({ ...prev, branch: true })),
            value: branch,
            options: (branchData || []).map(b => ({
                value: String(b.id),
                label: b.name,
            })),
            onChange: (val: string) => handleFilterChange("branch", val),
        },
        {
            key: "level_id",
            label: "Sınıf Seviyesi",
            type: "select" as const,
            onClick: () => setFiltersEnabled(prev => ({ ...prev, level: true })),
            value: level,
            options: (levelsData || []).map(l => ({
                value: String(l.id),
                label: l.name,
            })),
            onChange: (val: string) => handleFilterChange("level", val),
        },
        {
            key: "invoice_filter",
            label: "Fatura Filtre",
            type: "select" as const,
            onClick: () => setFiltersEnabled(prev => ({ ...prev, invoiceFilter: true })),
            value: invoiceFilter,
            options: [
                { label: "Tümü", value: "" },
                { label: "Faturası Kesilmiş", value: "invoiced" },
                { label: "Faturası Kesilmemiş", value: "not_invoiced" },
                { label: "Hizmet Faturası Kesilmiş", value: "service_invoiced" },
                { label: "Hizmet Faturası Kesilmemiş", value: "service_not_invoiced" },
                { label: "Taksit Faturası Kesilmiş", value: "installment_invoiced" },
                { label: "Taksit Faturası Kesilmemiş", value: "installment_not_invoiced" },
            ],
            onChange: (val: string) => handleFilterChange("invoiceFilter", val),
        },
    ], [studentOptions, branchData, levelsData, fullName, branch, level, invoiceFilter]);

    const queryParams: InvoiceQueryParams = useMemo(() => ({
        enabled: true,
        page,
        per_page: pageSize,
        search: fullName || undefined,
        branch_id: branch ? Number(branch) : undefined,
        level_id: level ? Number(level) : undefined,
        invoice_filter: invoiceFilter || undefined,
    }), [fullName, branch, level, invoiceFilter, page, pageSize]);

    const {
        invoiceData,
        meta,
        loading,
        error,
        totalPages,
        totalItems,
    } = useInvoiceList(queryParams);

    const columns: ColumnDefinition<Invoice>[] = useMemo(() => [
        { key: "id", label: "Fatura No", render: r => r.id },
        { key: "issue_date", label: "Tarih", render: r => r.issue_date },
        {
            key: "payable_amount",
            label: "Tutar",
            render: r => `${parseFloat(r.payable_amount).toLocaleString()} ₺`,
        },
        { key: "invoice_type_code", label: "Tip", render: r => r.invoice_type_code },
        {
            key: "actions",
            label: "İşlemler",
            render: r => (
                <Button size="sm" onClick={() => navigate(`/invoices/${r.id}`)}>
                    Detay
                </Button>
            ),
        },
    ], [navigate]);

    return (
        <ReusableTable<Invoice>
            columns={columns}
            data={invoiceData || []}
            loading={loading}
            error={error}
            filters={filters}
            showModal={false}
            showExportButtons={true}
            tableMode="single"
            totalPages={meta?.last_page ?? totalPages}
            totalItems={meta?.total ?? totalItems}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
        />
    );
}
