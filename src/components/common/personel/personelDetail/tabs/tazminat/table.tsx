import { useMemo, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { Compensation } from "../../../../../../types/employee/compensation/list";
import { useCompensationDelete } from "../../../../../hooks/employee/compensation/useDelete";
import { useCompensationList } from "../../../../../hooks/employee/compensation/useList";
import PersonnelModal from "./personnelModal";

interface CompensationTabProps {
  personelId?: number;
  enabled?: boolean;
}

export default function CompensationTab({
  personelId,
  enabled = true,
}: CompensationTabProps) {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { personelId?: number } };
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id?: string }>();

  const paramId = searchParams.get("personel_id");
  const derivedId =
    location.state?.personelId ??
    (paramId ? Number(paramId) : undefined) ??
    personelId ??
    (id ? Number(id) : undefined);

  const [showModal, setShowModal] = useState(
    derivedId === undefined || derivedId === 0
  );

  useEffect(() => {
    setShowModal(derivedId === undefined || derivedId === 0);
  }, [derivedId]);

  const actualId = derivedId ?? 0;

  const { compensations: data, loading, error } = useCompensationList({
    enabled: !!derivedId,
    personel_id: actualId,
  });
  const { deleteExistingCompensation, error: deleteError } =
    useCompensationDelete();
  const columns: ColumnDefinition<Compensation>[] = useMemo(
    () => [
      {
        key: "tarih",
        label: "Tarih",
        render: (row) =>
          ((row as any).tarih || row.created_at)?.split("T")[0] || "-",
      },
      {
        key: "tazminat_turu",
        label: "Tazminat Türü",
        render: (row) => row.tazminat_turu || "-",
      },
      {
        key: "odeme_sekli",
        label: "Ödeme Şekli",
        render: (row) => row.odeme_sekli || "-",
      },
      {
        key: "miktar",
        label: "Ödenen Tutar (₺)",
        render: (row) =>
          row.miktar ? `${Number(row.miktar).toLocaleString()} ₺` : "0,00 ₺",
      },
      {
        key: "banka_hesap_adi",
        label: "Banka Hesap Adı",
        render: (row) => row.banka_hesap_adi || "-",
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
                navigate(`/personelCompensationCrud/${row.id}?personelId=${actualId}`, {
                  state: {
                    personelId: row.personel_id,
                    selectedCompensation: data.find((d) => d.id === row.id),
                  },
                })
              }
              className="btn btn-icon btn-sm btn-info-light rounded-pill me-1"
              title="Düzenle"
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              onClick={() => openDeleteModal?.(row)}
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
              title="Sil"
            >
              <i className="ti ti-trash" />
            </button>
          </>
        ),
      },
    ],
    [navigate, actualId, data]
  );

  function handleDeleteRow(row: Compensation) {
    if (!row.id) return;
    deleteExistingCompensation(row.id);
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

      <ReusableTable<Compensation>
        columns={columns}
        data={data}
        onAdd={() =>
          navigate(`/personelCompensationCrud?personelId=${actualId}`, {
            state: { personelId: actualId },
          })
        }
        tableMode="single"
        loading={loading}
        error={error || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={data.length}
        pageSize={data.length}
        onPageChange={() => { }}
        onPageSizeChange={() => { }}
        exportFileName="tazminat"
        showExportButtons
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}
