// src/components/common/personel/personelDetail/tabs/kesinti/table.tsx
import { useEffect, useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { useInterruptionShow } from "../../../../../hooks/employee/interruption/useInterruptionShow";
import { useInterruptionDelete } from "../../../../../hooks/employee/interruption/useInterruptionDelete";
import { Interruption } from "../../../../../../types/employee/interruption/list";

interface KesintiTabProps {
  personelId: number;
  enabled: boolean;
}

export default function KesintiTab({ personelId, enabled }: KesintiTabProps) {
  const navigate = useNavigate();
  const [data, setData] = useState<Interruption[]>([]);
  const { getInterruption, loading, error } = useInterruptionShow();
  const { deleteExistingInterruption, error: deleteError } = useInterruptionDelete();

  useEffect(() => {
    if (!enabled) return;
    (async () => {
      const res = await getInterruption(personelId);
      const arr = Array.isArray(res) ? res : res ? [res] : [];
      setData(arr);
    })();
  }, [enabled, personelId]);

  const columns: ColumnDefinition<Interruption>[] = useMemo(() => [
    {
      key: "vade",
      label: "Vade",
      render: row => row.vade || "-",
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
              navigate(`/personelKesintiCrud/${row.id}`, {
                state: {
                  personelId,
                  selectedKesinti: data.find(d => d.id === row.id),
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

  function handleDeleteRow(row: Interruption) {
    if (!row.id) return;
    deleteExistingInterruption(row.id);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>Kesintiler</h6>
        <Button
          variant="success"
          onClick={() =>
            navigate("/personelKesintiCrud", { state: { personelId } })
          }
        >
          Ekle
        </Button>
      </div>

      <ReusableTable<Interruption>
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
        exportFileName="kesintiler"
        showExportButtons
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}
