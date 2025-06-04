import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { usePaymentShow } from "../../../../../hooks/employee/salary/payment/usePaymentShow";
import { usePaymentDelete } from "../../../../../hooks/employee/salary/payment/usePaymentDelete";
import { Payment } from "../../../../../../types/employee/salary/payment/list";

interface SalaryPaymentTabProps {
  personelId: number;
  enabled: boolean;
}

export default function SalaryPaymentTab({ personelId, enabled }: SalaryPaymentTabProps) {
  const navigate = useNavigate();
  const [data, setData] = useState<Payment[]>([]);

  const {  getPayment, loading, error } = usePaymentShow();
  const { deleteExistingPayment, error: deleteError } = usePaymentDelete();

  useEffect(() => {
    if (!enabled) return;

    (async () => {
      const result = await getPayment(personelId);
      const arr = Array.isArray(result) ? result : result ? [result] : [];
      setData(arr);
    })();
  }, [enabled, personelId]);

  const columns: ColumnDefinition<Payment>[] = useMemo(() => [
    {
      key: "miktar",
      label: "Miktar",
      render: (row : any) =>
        row.miktar ? `${Number(row.miktar).toLocaleString()} ₺` : "0,00 ₺",
    },
    {
      key: "odeme_sekli",
      label: "Ödeme Şekli",
      render: (row) => row.odeme_sekli || "-",
    },
    {
      key: "aciklama",
      label: "Açıklama",
      render: (row) => row.aciklama || "-",
    },
    {
      key: "actions",
      label: "İşlemler",
      render: (row : any, openDeleteModal : any) => (
        <>
          <Button
            size="sm"
            variant="primary"
            onClick={() =>
              navigate(`/personelSalaryPaymentCrud/${row.id}`, {
                state: {
                  personelId,
                  selectedPayment: data.find((p) => p.id === row.id),
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
  ], [navigate, personelId, data]);

  function handleDeleteRow(row: Payment) {
    if (!row.id) return;
    deleteExistingPayment(row.id);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>Maaş Ödemeleri</h6>
        <Button
          variant="success"
          onClick={() => navigate("/personelSalaryPaymentCrud", { state: { personelId } })}
        >
          Ekle
        </Button>
      </div>

      <ReusableTable<Payment>
        columns={columns}
        data={data}
        loading={loading}
        error={error || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={data.length}
        pageSize={data.length}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        exportFileName="maas-odemeleri"
        showExportButtons
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}
