// src/components/common/personel/personelDetail/tabs/kesinti/table.tsx
import { useMemo, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import odemeAl from "../../../../../../assets/images/media/ödeme-al.svg";
import odemeAlHover from "../../../../../../assets/images/media/ödeme-al-hover.svg";
import { KesintiPaymentModal } from "./crud";
import darkcontrol from "../../../../../../utils/darkmodecontroller";
import { useInterruptionList } from "../../../../../hooks/employee/interruption/useList";
import { useInterruptionDelete } from "../../../../../hooks/employee/interruption/useInterruptionDelete";
import { Interruption } from "../../../../../../types/employee/interruption/list";
import PersonnelModal from "./personnelModal";

interface KesintiTabProps {
  personelId?: number;
  enabled?: boolean;
}

export default function KesintiTab({ personelId, enabled = true }: KesintiTabProps) {
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

  const [showModal, setShowModal] = useState(derivedId === undefined || derivedId === 0);

  useEffect(() => {
    setShowModal(derivedId === undefined || derivedId === 0);
  }, [derivedId]);

  const actualId = derivedId ?? 0;
  const [showPayment, setShowPayment] = useState(false);
  const [selected, setSelected] = useState<Interruption | null>(null);
  const { interruptions: data, loading, error } = useInterruptionList({
    enabled: !!derivedId,
    personel_id: actualId,
  });
  const { deleteExistingInterruption, error: deleteError } = useInterruptionDelete();

  const columns: ColumnDefinition<Interruption>[] = useMemo(() => [
    {
      key: "vade",
      label: "Dönem",
      render: row => row.vade || "-",
    },
    {
      key: "miktar",
      label: "Kesinti Tutarı (₺)",
      render: row =>
        row.miktar ? `${Number(row.miktar).toLocaleString()} ₺` : "0,00 ₺",
    },
    {
      key: "created_at",
      label: "Tarih",
      render: row => row.created_at || "-",
    },
    {
      key: "odeme_sekli",
      label: "Ödeme Şekli",
      render: row => row.odeme_sekli || "-",
    },
    {
      key: "alinan",
      label: "Alınan Tutar",
      render: row =>
        row.alinan ? `${Number(row.alinan).toLocaleString()} ₺` : "0,00 ₺",
    },
    {
      key: "kalan",
      label: "Kalan Tutar",
      render: row =>
        `${(Number(row.miktar || 0) - Number(row.alinan || 0)).toLocaleString()} ₺`,
    },
    {
      key: "banka_hesap_adi",
      label: "Banka Hesap Adı",
      render: row => row.banka_hesap_adi || "-",
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
          <button
            onClick={() =>
              navigate(`/personelKesintiCrud/${row.id}?personelId=${actualId}`, {
                state: {
                  personelId: actualId,
                  selectedKesinti: data.find(d => d.id === row.id),
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
          <Button
            onClick={() => {
              setSelected(row);
              setShowPayment(true);
            }}
            style={{ padding: 0 }}
            variant=""
          >
            <img
              src={odemeAl}
              alt="Ödeme Al"
              width={24}
              height={24}
              onMouseEnter={e => {
                (e.currentTarget as HTMLImageElement).src = odemeAlHover;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLImageElement).src = odemeAl;
              }} />
          </Button>
        </>
      ),
    },
  ], [navigate, actualId, data]);

  function handleDeleteRow(row: Interruption) {
    if (!row.id) return;
    deleteExistingInterruption(row.id);
  }

  const textColor = darkcontrol.dataThemeMode === "dark" ? "#fff" : "#000";
  const totalKesinti = data.reduce((acc, r) => acc + Number(r.miktar || 0), 0);
  const totalAlinan = data.reduce((acc, r) => acc + Number(r.alinan || 0), 0);
  const totalKalan = totalKesinti - totalAlinan;

  const footer = (
    <div className="d-flex justify-content-end fw-bold me-3" style={{ color: textColor }}>
      Toplam Kesinti: {totalKesinti.toLocaleString()} ₺ | Toplam Alınan: {totalAlinan.toLocaleString()} ₺ | Toplam Kalan: {totalKalan.toLocaleString()} ₺
    </div>
  );

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

      <ReusableTable<Interruption>
        columns={columns}
        onAdd={() =>
          navigate(`/personelKesintiCrud?personelId=${actualId}`, {
            state: { personelId: actualId },
          })
        }
        data={data}
        loading={loading}
        tableMode="single"
        error={error || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={data.length}
        pageSize={data.length}
        onPageChange={() => { }}
        onPageSizeChange={() => { }}
        exportFileName="kesintiler"
        showExportButtons
        onDeleteRow={handleDeleteRow}
        customFooter={footer}
      />

      {showPayment && selected && (
        <KesintiPaymentModal
          show={showPayment}
          onClose={() => setShowPayment(false)}
          onSubmit={() => setShowPayment(false)}
        />
      )}
    </div>
  );
}
