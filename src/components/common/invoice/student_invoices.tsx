import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useInvoiceList } from "../../hooks/invoice/useList";
import { Invoice } from "../../../types/invoice/list";

export default function StudentInvoiceModal() {
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
        label: "Hizmet kalemi",
        render: (r) => r.gider_kalemi || "-",
      },
      { key: "invoice_type_code", label: "Tip", render: (r) => r.invoice_type_code },
    ],
    []
  );

  return (
    <Modal show onHide={() => navigate(-1)} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Öğrenci Faturaları</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReusableTable<Invoice>
          columns={columns}
          data={invoiceData || []}
          loading={loading}
          error={error}
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
      </Modal.Body>
    </Modal>
  );
}
