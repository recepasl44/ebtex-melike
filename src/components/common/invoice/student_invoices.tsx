import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useInvoiceList } from "../../hooks/invoice/useList";
import { Invoice } from "../../../types/invoice/list";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useLevelsTable } from "../../hooks/levels/useList";

export default function StudentInvoiceTable() {
  const { studentId } = useParams<{ studentId: string }>();

  const [branch, setBranch] = useState("");
  const [level, setLevel] = useState("");
  const [invoiceFilter, setInvoiceFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { branchData } = useBranchTable({ enabled: true });
  const { levelsData } = useLevelsTable({ enabled: true });

  const filters = useMemo(
    () => [
      {
        key: "branch_id",
        label: "Şube",
        type: "select" as const,
        value: branch,
        options: (branchData || []).map((b) => ({
          value: String(b.id),
          label: b.name,
        })),
        onChange: (val: string) => setBranch(val),
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
        onChange: (val: string) => setLevel(val),
      },
      {
        key: "invoice_filter",
        label: "Fatura Filtre",
        type: "select" as const,
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
        onChange: (val: string) => setInvoiceFilter(val),
      },
    ],
    [branchData, levelsData, branch, level, invoiceFilter]
  );

  const queryParams = useMemo(
    () => ({
      enabled: true,
      page,
      per_page: pageSize,
      student_id: studentId ? Number(studentId) : undefined,
      branch_id: branch ? Number(branch) : undefined,
      level_id: level ? Number(level) : undefined,
      invoice_filter: invoiceFilter || undefined,
    }),
    [studentId, branch, level, invoiceFilter, page, pageSize]
  );

  const { invoiceData, meta, loading, error, totalPages, totalItems } =
    useInvoiceList(queryParams);

  const columns: ColumnDefinition<Invoice>[] = useMemo(
    () => [
      { key: "id", label: "Fatura No", render: (r) => r.id },
      { key: "issue_date", label: "Tarih", render: (r) => r.issue_date },
      {
        key: "payable_amount",
        label: "Tutar",
        render: (r) => `${parseFloat(r.payable_amount).toLocaleString()} ₺`,
      },
      { key: "invoice_type_code", label: "Tip", render: (r) => r.invoice_type_code },
    ],
    []
  );

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