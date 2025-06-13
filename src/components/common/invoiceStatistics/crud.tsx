import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useInvoiceStatistics, InvoiceStatisticsItem } from "../../hooks/invoice/useInvoiceStatistics";
import { InvoiceStatisticsStudent } from "../../../types/invoice/invoiceStatistics";

interface StudentModalProps {
  student: InvoiceStatisticsStudent;
  onHide: () => void;
}

function StudentInvoicesModal({ student, onHide }: StudentModalProps) {
  const services = useMemo(() => {
    const set = new Set<string>();
    student.invoices.forEach((i) => set.add(i.service_name));
    return Array.from(set);
  }, [student]);

  const rows = useMemo(() => {
    const map: Record<string, any> = {};
    student.invoices.forEach((inv) => {
      if (!map[inv.issue_date]) map[inv.issue_date] = { issue_date: inv.issue_date };
      map[inv.issue_date][inv.service_name] = inv.amount;
    });
    return Object.values(map);
  }, [student]);

  const columns: ColumnDefinition<any>[] = useMemo(() => {
    const base: ColumnDefinition<any>[] = [
      { key: "issue_date", label: "Tarih", render: (r) => r.issue_date },
    ];
    services.forEach((s) => {
      base.push({
        key: s,
        label: s,
        render: (r) => (r[s] ? `${Number(r[s]).toLocaleString()} ₺` : "-")
      });
    });
    return base;
  }, [services]);

  const footer = useMemo(() => {
    const totals: Record<string, number> = {};
    services.forEach((s) => {
      totals[s] = student.invoices
        .filter((i) => i.service_name === s)
        .reduce((sum, i) => sum + i.amount, 0);
    });
    return (
      <div className="d-flex justify-content-end fw-bold me-3 gap-3">
        {services.map((s) => (
          <span key={s}>{s}: {totals[s].toLocaleString()} ₺</span>
        ))}
      </div>
    );
  }, [services, student]);

  return (
    <ReusableTable<any>
      showModal={true}
      modalTitle={student.full_name}
      columns={columns}
      data={rows}
      showExportButtons
      tableMode="single"
      customFooter={footer}
      onCloseModal={onHide}
    />
  );
}

export default function InvoiceStatisticsDetail({
  show,
  onHide,
}: { show: boolean; onHide: () => void }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const seasonId = params.get("season_id");
  const branchId = params.get("branch_id");
  const month = params.get("month");

  const { data, loading, error } = useInvoiceStatistics({
    enabled: true,
    season_id: seasonId ? Number(seasonId) : undefined,
    branch_id: branchId ? Number(branchId) : undefined,
    months: month ? [Number(month)] : undefined,
  });

  const item: InvoiceStatisticsItem | null = data.length ? data[0] : null;
  const [selectedStudent, setSelectedStudent] = useState<InvoiceStatisticsStudent | null>(null);

  const columns: ColumnDefinition<InvoiceStatisticsStudent>[] = useMemo(
    () => [
      { key: "branch_name", label: "Şube", render: (r) => r.branch_name },
      { key: "tc_no", label: "T.C. Kimlik No", render: (r) => r.tc_no },
      { key: "full_name", label: "Adı Soyadı", render: (r) => r.full_name },
      { key: "level_name", label: "Sınıf Seviyesi", render: (r) => r.level_name },
      { key: "class_branch", label: "Sınıf/Şube", render: (r) => r.class_branch },
      { key: "parent_name", label: "Veli Adı Soyadı", render: (r) => r.parent_name },
      { key: "parent_relation", label: "Veli Yakınlığı", render: (r) => r.parent_relation },
      { key: "parent_phone", label: "Veli Telefon", render: (r) => r.parent_phone },
      {
        key: "total_amount",
        label: "Fatura Tutarı",
        render: (r) => `${r.total_amount.toLocaleString()} ₺`,
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (r) => (
          <button
            className="btn btn-icon btn-sm btn-info-light rounded-pill"
            onClick={() => setSelectedStudent(r)}
          >
            <i className="ti ti-eye" />
          </button>
        ),
      },
    ],
    []
  );

  const totalAmount = useMemo(() => {
    return item?.students?.reduce((sum, s) => sum + (s.total_amount || 0), 0) || 0;
  }, [item]);

  const footer = (
    <div className="d-flex justify-content-end fw-bold me-3">
      Toplam: {totalAmount.toLocaleString()} ₺
    </div>
  );

  return (
    <>
      <ReusableTable<InvoiceStatisticsStudent>
        showModal={true}
        modalTitle="Fatura Detayı"
        columns={columns}
        data={item?.students || []}
        loading={loading}
        error={error}
        tableMode="single"
        showExportButtons
        customFooter={footer}
        onCloseModal={() => {
          onHide();
          navigate(-1);
        }}
      />
      {selectedStudent && (
        <StudentInvoicesModal
          student={selectedStudent}
          onHide={() => setSelectedStudent(null)}
        />
      )}
    </>
  );
}
