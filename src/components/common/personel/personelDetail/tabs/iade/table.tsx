import { useMemo, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  useNavigate,
  useLocation,
  useSearchParams,
  useParams,
} from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { useRefundDelete } from "../../../../../hooks/employee/refund/useRefundDelete";
import { useIadeList } from "../../../../../hooks/employee/iade/useIadeList";
import { Refund } from "../../../../../../types/employee/refund/list";
import PersonnelModal from "./personnelModal";

interface IadeTabProps {
  personelId?: number;
  enabled?: boolean;
}

export default function IadeTab({ personelId }: IadeTabProps) {
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

  const { refunds: data, loading, error } = useIadeList({
    enabled: !!derivedId,
    personel_id: actualId,
  });
  const { deleteExistingRefund, error: deleteError } = useRefundDelete();

  const columns: ColumnDefinition<Refund>[] = useMemo(
    () => [
      {
        key: "tarih",
        label: "Tarih",
        render: (row) => row.tarih || "-",
      },
      {
        key: "odeme_sekli",
        label: "Ödeme Şekli",
        render: (row) => row.odeme_sekli || "-",
      },
      {
        key: "miktar",
        label: "Alınan Tutar (₺)",
        render: (row) =>
          row.miktar ? `${Number(row.miktar).toLocaleString()} ₺` : "0,00 ₺",
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
                navigate(`/personelIadeCrud/${row.id}?personelId=${actualId}`, {
                  state: {
                    personelId: actualId,
                    selectedIade: data.find((d) => d.id === row.id),
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
    ], [navigate, actualId, data]);

  const totalMiktar = useMemo(
    () => data.reduce((acc, cur) => acc + Number((cur as any).miktar || 0), 0),
    [data]
  );

  const footer = (
    <div className="text-end fw-bold">
      Toplam: {totalMiktar.toLocaleString()} ₺
    </div>
  );

  function handleDeleteRow(row: Refund) {
    if (!row.id) return;
    deleteExistingRefund(row.id);
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
      <div className="d-flex justify-content-between align-items-center mb-3"></div>

      <ReusableTable<Refund>
        onAdd={() =>
          navigate(`/personelIadeCrud?personelId=${actualId}`, {
            state: { personelId: actualId },
          })
        }
        columns={columns}
        data={data}
        tableMode="single"
        loading={loading}
        error={error || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={data.length}
        pageSize={data.length}
        onPageChange={() => { }}
        onPageSizeChange={() => { }}
        exportFileName="iadeler"
        showExportButtons
        onDeleteRow={handleDeleteRow}
        customFooter={footer}
      />
    </div>
  );
}
