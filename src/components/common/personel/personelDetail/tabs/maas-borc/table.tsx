import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { useDebtShow } from "../../../../../hooks/employee/salary/debt/useDebtShow";
import { useDebtDelete } from "../../../../../hooks/employee/salary/debt/useDebtDelete";
import { Debit } from "../../../../../../types/employee/salary/debit/list";

interface SalaryDebtTabProps {
  personelId: number;
  enabled: boolean;
}

export default function SalaryDebtTab({ personelId, enabled }: SalaryDebtTabProps) {
  const navigate = useNavigate();
  const [record, setRecord] = useState<Debit | null>(null);

  const {  getDebt, loading, error } = useDebtShow();
  const { deleteExistingDebt, error: deleteError } = useDebtDelete();

  useEffect(() => {
    if (!enabled) return;

    (async () => {
      const res = await getDebt(personelId);
      setRecord(res || null);
    })();
  }, [enabled, personelId]);

  const columns: ColumnDefinition<Debit>[] = useMemo(() => [
    {
      key: "aylik_ucret",
      label: "Aylık Ücret",
      render: (row) =>
        row.aylik_ucret
          ? `${Number(row.aylik_ucret).toLocaleString()} ₺`
          : "0,00 ₺",
    },
    {
      key: "odeme_sekli",
      label: "Ödeme Şekli",
      render: (row) => row.odeme_sekli || "-",
    },
    {
      key: "maas_sayisi",
      label: "Maaş Sayısı",
      render: (row) => row.maas_sayisi ?? "-",
    },
    {
      key: "baslangic_tarihi",
      label: "Başlangıç Tarihi",
      render: (row) => row.baslangic_tarihi?.split("T")[0] || "-",
    },
    {
      key: "actions",
      label: "İşlemler",
      render: (row, openDeleteModal) => (
        <>
          <Button
            size="sm"
            variant="primary"
            onClick={() =>
              navigate(`/personelSalaryDebtCrud/${row.id}`, {
                state: {
                  personelId,
                  selectedDebt: row,
                },
              })
            }
          >
            <i className="ti ti-pencil" />
          </Button>{" "}
          <Button
            size="sm"
            variant="danger"
            onClick={() => openDeleteModal?.(row)}
          >
            <i className="ti ti-trash" />
          </Button>
        </>
      ),
    },
  ], [navigate, personelId]);

  const handleDeleteRow = (row: Debit) => {
    if (!row.id) return;
    deleteExistingDebt(row.id);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>Maaş Borç Bilgileri</h6>
        <Button
          variant="success"
          onClick={() =>
            navigate("/personelSalaryDebtCrud", {
              state: { personelId },
            })
          }
        >
          Ekle
        </Button>
      </div>

      <ReusableTable<Debit>
        columns={columns}
        data={record ? [record] : []}
        loading={loading}
        error={error || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={record ? 1 : 0}
        pageSize={1}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        exportFileName="maas-borc"
        showExportButtons
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}
