
import { useEffect, useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { usePrimlerShow } from "../../../../../hooks/employee/prim/usePrimlerShow";
import { usePrimlerDelete } from "../../../../../hooks/employee/prim/usePrimlerDelete";
import { Primler } from "../../../../../../types/employee/primler/list";

interface PersonelPrimTabProps {
  personelId: number;
  enabled: boolean;
}

export default function PersonelPrimTab({
  personelId,
  enabled,
}: PersonelPrimTabProps) {
  const navigate = useNavigate();
  const [data, setData] = useState<Primler[]>([]);

  const { getPrimler, loading, error } = usePrimlerShow();
  const { deleteExistingPrimler, error: deleteError } = usePrimlerDelete();

  useEffect(() => {
    if (!enabled) return;
    (async () => {
      const res = await getPrimler(personelId);
      // show endpoint dönen array’i normalize et
      const arr = Array.isArray(res) ? res : res ? [res] : [];
      setData(arr);
    })();
  }, [enabled, personelId]);

  const columns: ColumnDefinition<Primler>[] = useMemo(
    () => [
      {
        key: "vade",
        label: "Vade",
        render: (row) => row.vade || "-",
      },
      {
        key: "miktar",
        label: "Prim Miktarı",
        render: (row) =>
          row.miktar
            ? `${Number(row.miktar).toLocaleString()} ₺`
            : "0,00 ₺",
      },
      {
        key: "aciklama",
        label: "Açıklama",
        render: (row) => row.aciklama || "-",
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
                navigate(`/personelPrimlerCrud/${row.id}`, {
                  state: {
                    personelId,
                    selectedPrimler: data.find((d) => d.id === row.id),
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
    ],
    [navigate, personelId, data]
  );

  function handleDeleteRow(row: Primler) {
    if (!row.id) return;
    deleteExistingPrimler(row.id);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>Primler</h6>
        <Button
          variant="success"
          onClick={() =>
            navigate("/personelPrimlerCrud", { state: { personelId } })
          }
        >
          Ekle
        </Button>
      </div>

      <ReusableTable<Primler>
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
        exportFileName="primler"
        showExportButtons
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}
