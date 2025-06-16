import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";

interface DetailRow {
  id?: number;
  date: string;
  hours: number;
  fee: number;
}

export default function CouponDetailModal() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { details?: DetailRow[] } };

  const rows: DetailRow[] = state?.details ?? [];

  const columns: ColumnDefinition<DetailRow>[] = useMemo(
    () => [
      {
        key: "index",
        label: "Sıra No",
        render: (_r, _open, idx) => String(idx + 1),
      },
      { key: "date", label: "Tarih", render: (r) => r.date },
      { key: "hours", label: "Ders Saati", render: (r) => r.hours.toString() },
      {
        key: "fee",
        label: "Ders Ücreti (₺)",
        render: (r) => `${r.fee.toLocaleString()} ₺`,
      },
      {
        key: "total",
        label: "Günlük Toplam (₺)",
        render: (r) => `${(r.hours * r.fee).toLocaleString()} ₺`,
      },
    ],
    []
  );

  return (
    <ReusableTable<DetailRow>
      columns={columns}
      data={rows}
      tableMode="single"
      showModal={true}
      modalTitle="Detay"
      onCloseModal={() => navigate(-1)}
      exportFileName="soru_cozum_detay"
    />
  );
}
