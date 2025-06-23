// src/components/common/personel/personelDetail/tabs/kesinti/table.tsx
import { useEffect, useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import odemeAl from "../../../../../../assets/images/media/ödeme-al.svg";
import odemeAlHover from "../../../../../../assets/images/media/ödeme-al-hover.svg";
import { KesintiPaymentModal } from "./crud";
import darkcontrol from "../../../../../../utils/darkmodecontroller";
import { useInterruptionShow } from "../../../../../hooks/employee/interruption/useInterruptionShow";
import { useInterruptionDelete } from "../../../../../hooks/employee/interruption/useInterruptionDelete";
import { Interruption } from "../../../../../../types/employee/interruption/list";

interface KesintiTabProps {
  personelId?: number;
  enabled?: boolean;
}

export default function KesintiTab({ personelId, enabled = true }: KesintiTabProps) {
  const { id } = useParams<{ id?: string }>();
  const actualId = personelId ?? (id ? Number(id) : 0);
  const navigate = useNavigate();
  const [data, setData] = useState<Interruption[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selected, setSelected] = useState<Interruption | null>(null);
  const { getInterruption, loading, error } = useInterruptionShow();
  const { deleteExistingInterruption, error: deleteError } = useInterruptionDelete();

  useEffect(() => {
    if (!enabled) return;
    (async () => {
      const res = await getInterruption(actualId);
      const arr = Array.isArray(res) ? res : res ? [res] : [];
      setData(arr);
    })();
  }, [enabled, actualId]);

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
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              navigate(`/personelKesintiCrud/${row.id}`, {
                state: {
                  personelId: actualId,
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
          </Button>{" "}
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
              }}
            />
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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">

      </div>

      <ReusableTable<Interruption>
        columns={columns}
        onAdd={() =>
          navigate("/personelKesintiCrud", { state: { personelId: actualId } })
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
