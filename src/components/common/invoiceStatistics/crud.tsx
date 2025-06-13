import { useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { InvoiceStatisticsItem } from "../../hooks/invoice/useInvoiceStatistics";
import { InvoiceStatisticsStudent } from "../../../types/invoice/invoiceStatistics";
import { formatCurrency, formatDate } from "../../../utils/formatters";

interface Props {
  show: boolean;
  onHide: () => void;
  item: InvoiceStatisticsItem;
}

export default function InvoiceStatisticsCrud({ show, onHide, item }: Props) {
  const [selectedStudent, setSelectedStudent] = useState<InvoiceStatisticsStudent | null>(null);

  const studentColumns: ColumnDefinition<InvoiceStatisticsStudent>[] = useMemo(
    () => [
      { key: "branch_name", label: "Şube", render: (r) => r.branch_name },
      { key: "tc_no", label: "T.C. Kimlik No", render: (r) => r.tc_no },
      { key: "full_name", label: "Adı Soyadı", render: (r) => r.full_name },
      { key: "level_name", label: "Sınıf Seviyesi", render: (r) => r.level_name },
      { key: "class_branch", label: "Sınıf/Şube", render: (r) => r.class_branch },
      { key: "parent_name", label: "Veli Adı Soyadı", render: (r) => r.parent_name },
      { key: "parent_relation", label: "Veli Yakınlığı", render: (r) => r.parent_relation },
      { key: "parent_phone", label: "Veli Telefon", render: (r) => r.parent_phone },
      { key: "total_amount", label: "Fatura Tutarı", render: (r) => formatCurrency(r.total_amount) },
      {
        key: "actions",
        label: "İşlemler",
        render: (r) => (
          <Button
            variant="primary-light"
            size="sm"
            className="btn-icon rounded-pill"
            onClick={() => setSelectedStudent(r)}
          >
            <i className="ti ti-eye" />
          </Button>
        ),
      },
    ],
    []
  );

  const invoiceColumns: ColumnDefinition<any>[] = useMemo(
    () => [
      { key: "issue_date", label: "Tarih", render: (r) => formatDate(r.issue_date) },
      { key: "service_name", label: "Hizmet", render: (r) => r.service_name },
      { key: "amount", label: "Tutar", render: (r) => formatCurrency(r.amount) },
    ],
    []
  );

  const total = useMemo(
    () => (item.students || []).reduce((sum, s) => sum + (s.total_amount || 0), 0),
    [item]
  );

  const footer = (
    <div className="d-flex justify-content-end fw-bold me-3">Toplam: {formatCurrency(total)}</div>
  );

  return (
    <>
      <ReusableTable<InvoiceStatisticsStudent>
        modalTitle="Fatura Detayları"
        showModal={show}
        onCloseModal={onHide}
        columns={studentColumns}
        data={item.students || []}
        tableMode="single"
        showExportButtons={true}
        customFooter={footer}
      />
      {selectedStudent && (
        <ReusableTable<any>
          modalTitle={selectedStudent.full_name}
          showModal={true}
          onCloseModal={() => setSelectedStudent(null)}
          columns={invoiceColumns}
          data={selectedStudent.invoices || []}
          tableMode="single"
          showExportButtons={true}
        />
      )}
    </>
  );
}
