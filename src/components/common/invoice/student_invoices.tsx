import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useInvoiceList } from "../../hooks/invoice/useList";
import { Invoice } from "../../../types/invoice/list";

export default function StudentInvoiceTable() {
  const { studentId } = useParams<{ studentId: string }>();

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const queryParams = useMemo(
    () => ({
      enabled: true,
      page,
      per_page: pageSize,
      student_id: studentId ? Number(studentId) : undefined,
    }),
    [studentId, page, pageSize]
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
      {
        key: "gider_kalemi",
        label: "Hizmet Kalemi",
        render: (r) => r.gider_kalemi || "-",
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
      showModal={true}
      onCloseModal={() => navigate("/invoice")}
      modalTitle="Faturalar"
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