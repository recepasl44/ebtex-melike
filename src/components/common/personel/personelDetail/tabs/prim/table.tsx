


import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { usePrimlerList } from "../../../../../hooks/employee/prim/usePrimlerList";
import { usePrimlerDelete } from "../../../../../hooks/employee/prim/usePrimlerDelete";
import { Primler } from "../../../../../../types/employee/primler/list";

interface PersonelPrimTabProps {
  personelId?: number;
  enabled?: boolean;
}

export default function PersonelPrimTab({ personelId }: PersonelPrimTabProps) {
  const { id } = useParams<{ id?: string }>();
  const actualId = personelId ?? (id ? Number(id) : 0);
  const navigate = useNavigate();

  const { primler: primlerData, loading, error } = usePrimlerList({
    enabled: true,
    personel_id: actualId,
  });
  const { deleteExistingPrimler, error: deleteError } = usePrimlerDelete();

  const columns: ColumnDefinition<Primler>[] = useMemo(
    () => [
      {
        key: "vade",
        label: "Vade",
        render: (row) => row.vade || "-",
      },
      {
        key: "miktar",
        label: "Prim Miktarı",
        render: (row: { miktar: any; }) =>
          row.miktar
            ? `${Number(row.miktar).toLocaleString()} ₺`
            : "0,00 ₺",
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
            <button
            onClick={() =>
                navigate(`/personelPrimlerCrud/${row.id}?personelId=${actualId}`, {
                  state: {
                    personelId: actualId,
                    selectedPrimler: primlerData.find((d) => d.id === row.id),
                  },
                })
              }
              className="btn btn-icon btn-sm btn-info-light rounded-pill me-1"
              title="Düzenle"
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
              onClick={() => openDeleteModal?.(row)}
              title="Sil"
            >
              <i className="ti ti-trash" />
            </button>
          </>
        ),
      },
    ],
    [navigate, actualId, primlerData]
  );

  function handleDeleteRow(row: Primler) {
    if (!row.id) return;
    deleteExistingPrimler(row.id);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">


      </div>

      <ReusableTable<Primler>
        onAdd={() =>
          navigate(`/personelPrimlerCrud?personelId=${actualId}`, {
            state: { personelId: actualId },
          })
        }
        columns={columns}
        tableMode="single"
        data={primlerData}
        loading={loading}
        error={error || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={primlerData.length}
        pageSize={primlerData.length}
        onPageChange={() => { }}
        onPageSizeChange={() => { }}
        exportFileName="primler"
        showExportButtons
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}