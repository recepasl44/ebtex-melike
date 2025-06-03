import { useMemo } from "react";
import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { useCostPlanningList } from "../../../hooks/employee/cost_planning/useCostPlanningList";

import type { PersonelCostPlanning } from "../../../../types/employee/cost_planning/list";


const PersonelCostPlanning = () => {
  const { planning, loading, error } = useCostPlanningList({ enabled: true });

  const columns: ColumnDefinition<PersonelCostPlanning>[] = useMemo(
    () => [
      { key: "okul_seviyesi", label: "Okul Seviyesi" },
      { key: "brans_gorev", label: "Branş / Görev" },
      { key: "personel_sayisi", label: "Personel Sayısı" },
      { key: "sozlesme_turu", label: "Sözleşme Türü" },
      { key: "maas", label: "Maaş (₺)" },
      { key: "haftalik_is_gunu", label: "Haftalık İş Günü" },
      { key: "gunluk_ucret", label: "Günlük Ücret (₺)" },
      { key: "ders_ucreti", label: "Ders Ücreti (₺)" },
      { key: "aylik_ders_sayisi", label: "Aylık Ders Sayısı" },
      { key: "ay_sayisi", label: "Ay Sayısı" },
      { key: "toplam_maas", label: "Toplam Maaş (₺)" },
      { key: "ssk_primi", label: "SSK Primi (₺)" },
      { key: "tazminat", label: "Tazminat (₺)" },
      { key: "genel_toplam", label: "Genel Toplam (₺)" },
    ],
    []
  );

  return (
    <div className="container-fluid mt-3">
      <ReusableTable<PersonelCostPlanning>
        pageTitle="Personel Maliyet Planlama"
        columns={columns}
        data={planning}
        loading={loading}
        error={error}
        tableMode="single"
        showExportButtons={false}
      />
    </div>
  );
};

export default PersonelCostPlanning;
