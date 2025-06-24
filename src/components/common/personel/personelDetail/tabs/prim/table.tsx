


import { useMemo, useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import darkcontrol from "../../../../../../utils/darkmodecontroller";
import { usePrimlerList } from "../../../../../hooks/employee/prim/usePrimlerList";
import { usePrimlerDelete } from "../../../../../hooks/employee/prim/usePrimlerDelete";
import { Primler } from "../../../../../../types/employee/primler/list";
import PersonnelModal from "./personnelModal";

interface PersonelPrimTabProps {
  personelId?: number;
  enabled?: boolean;
}

export default function PersonelPrimTab({ personelId }: PersonelPrimTabProps) {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { personelId?: number } };
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id?: string }>();

  const paramId = searchParams.get("personel_id");
  const derivedId =
    personelId ??
    location.state?.personelId ??
    (paramId ? Number(paramId) : undefined) ??
    (id ? Number(id) : undefined);

  const [showModal, setShowModal] = useState(derivedId === undefined);

  useEffect(() => {
    setShowModal(derivedId === undefined);
  }, [derivedId]);

  const actualId = derivedId ?? 0;

  const { primler: primlerData, loading, error } = usePrimlerList({
    enabled: !!derivedId,
    personel_id: actualId,
  });
  const { deleteExistingPrimler, error: deleteError } = usePrimlerDelete();

  const totalAmount = useMemo(
    () => primlerData.reduce((acc, cur) => acc + Number(cur.miktar || 0), 0),
    [primlerData]
  );
  const textColor = darkcontrol.dataThemeMode === "dark" ? "#fff" : "#000";
  const footer = (
    <div className="d-flex justify-content-end fw-bold me-3" style={{ color: textColor }}>
      Toplam: {totalAmount.toLocaleString()} ₺
    </div>
  );

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

  if (showModal) {
    return (
      <PersonnelModal
        show
        onClose={() => setShowModal(false)}
        onSelect={(pid) => {
          navigate('.', { state: { personelId: pid } });
          setShowModal(false);
        }}
      />
    );
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
        customFooter={footer}
      />
    </div>
  );
}