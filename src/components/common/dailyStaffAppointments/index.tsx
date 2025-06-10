import { useMemo } from "react";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { usePersonnelTable } from "../hooks/employee/personel/useList";
import type { Personel } from "../../types/employee/personel/list";

interface StaffPaymentRow {
  odenecek: string;
  season: string;
  odenecek_tutar: number;
  nakit: number;
  banka: number;
  toplam_odenen: number;
  kalan: number;
}

export default function DailyStaffAppointmentsTable() {
  const { personnelData, loading } = usePersonnelTable({ enabled: true });

  const rows: StaffPaymentRow[] = useMemo(
    () =>
      personnelData.map((p: Personel) => {
        const season = p.aggrements_date
          ? `${p.aggrements_date.startDate} - ${p.aggrements_date.endDate}`
          : "-";
        const amount = parseFloat(p.base_salary ?? "0");
        return {
          odenecek: `${p.ad} ${p.soyad}`,
          season,
          odenecek_tutar: amount,
          nakit: 0,
          banka: 0,
          toplam_odenen: 0,
          kalan: amount,
        };
      }),
    [personnelData]
  );

  const columns: ColumnDefinition<StaffPaymentRow>[] = useMemo(
    () => [
      { key: "odenecek", label: "Ödenecek" },
      { key: "season", label: "Sezon" },
      {
        key: "odenecek_tutar",
        label: "Ödenecek Tutar",
        render: (r) => `${r.odenecek_tutar.toLocaleString()} ₺`,
      },
      { key: "nakit", label: "Nakit", render: (r) => `${r.nakit.toLocaleString()} ₺` },
      { key: "banka", label: "Banka", render: (r) => `${r.banka.toLocaleString()} ₺` },
      {
        key: "toplam_odenen",
        label: "Toplam Ödenen",
        render: (r) => `${r.toplam_odenen.toLocaleString()} ₺`,
      },
      { key: "kalan", label: "Kalan", render: (r) => `${r.kalan.toLocaleString()} ₺` },
    ],
    []
  );

  return (
    <div className="container-fluid mt-3">
      <ReusableTable<StaffPaymentRow>
        pageTitle="Personel Ödemeleri"
        columns={columns}
        data={rows}
        loading={loading}
        error={null}
        tableMode="single"
        currentPage={1}
        totalPages={1}
        totalItems={rows.length}
        pageSize={rows.length}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        showExportButtons
        exportFileName="daily-staff-payments"
      />
    </div>
  );
}
