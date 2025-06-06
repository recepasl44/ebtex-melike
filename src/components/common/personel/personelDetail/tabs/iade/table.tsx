import { useEffect, useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { useRefundShow } from "../../../../../hooks/employee/refund/useRefundShow";
import { useRefundDelete } from "../../../../../hooks/employee/refund/useRefundDelete";
import { Refund } from "../../../../../../types/employee/refund/list";

interface IadeTabProps {
  personelId: number;
  enabled: boolean;
}

export default function IadeTab({ personelId, enabled }: IadeTabProps) {
  const navigate = useNavigate();
  const [data, setData] = useState<Refund[]>([]);
  const {  getRefund, loading, error } = useRefundShow();
  const { deleteExistingRefund, error: deleteError } = useRefundDelete();

  useEffect(() => {
    if (!enabled) return;
    (async () => {
      const res = await getRefund(personelId);
      const arr = Array.isArray(res) ? res : res ? [res] : [];
      setData(arr);
    })();
  }, [enabled, personelId]);

  const columns: ColumnDefinition<Refund>[] = useMemo(() => [
    {
      key: "tarih",
      label: "Tarih",
      render: row => row.tarih || "-",
    },
    {
      key: "miktar",
      label: "Miktar",
      render: row => row.miktar ? `${Number(row.miktar).toLocaleString()} ₺` : "0,00 ₺",
    },
    {
      key: "odeme_sekli",
      label: "Ödeme Şekli",
      render: row => row.odeme_sekli || "-",
    },
    {
      key: "aciklama",
      label: "Açıklama",
      render: row => row.aciklama || "-",
    },
    {
      key: "actions",
      label: "İşlemler",
      render: (row, openDeleteModal) => (
        <>
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              navigate(`/personelIadeCrud/${row.id}`, {
                state: {
                  personelId,
                  selectedIade: data.find(d => d.id === row.id),
                },
              })
            }
          >
            <i className="ti ti-pencil" />
          </Button>{" "}
          <Button
            variant="danger"
            size="sm"
            onClick={() => openDeleteModal?.(row)}
          >
            <i className="ti ti-trash" />
          </Button>
        </>
      ),
    },
  ], [navigate, personelId, data]);

  function handleDeleteRow(row: Refund) {
    if (!row.id) return;
    deleteExistingRefund(row.id);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>İadeler</h6>
        <Button
          variant="success"
          onClick={() =>
            navigate("/personelIadeCrud", { state: { personelId } })
          }
        >
          Ekle
        </Button>
      </div>

      <ReusableTable<Refund>
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
        exportFileName="iadeler"
        showExportButtons
        onDeleteRow={handleDeleteRow}
      />
    </div>
);
}
