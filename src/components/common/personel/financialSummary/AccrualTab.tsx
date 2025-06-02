import { useState, useMemo } from "react";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../../ReusableTable";
import { AccrualInfo } from "./dummyData";
import { useHakedisList } from "../../../hooks/employee/hakedis/useHakedisList";

export default function AccrualTab() {
  const [filtersState, setFiltersState] = useState({ ay: "", donem: "" });

  const { data: hakedis } = useHakedisList(true);

  const accrualData: AccrualInfo[] = useMemo(
    () =>
      hakedis.map((p) => ({
        okulSeviyesi: p.sube || "-",
        meslek: p.brans || "-",
        adSoyad: p.ad_soyad || "-",
        sozlesmeTuru: p.odeme_yontemi || "-",
        haftalikIsGunu: p.haftalik_gun || 0,
        maas: p.maas || 0,
        dersUcreti: p.ders_ucreti || 0,
        soruCozumUcreti: p.soru_cozum_ucreti || 0,
        soruCozumSayisi: p.ders_sayisi || 0,
        gunBazliUcret: p.egitim_ucreti || 0,
        ozelDersUcreti: p.kupon_ucreti || 0,
        koclukUcreti: 0,
        prim: 0,
        farkliUcret: p.farkli_ucret || 0,
        ay: "",
        donem: "",
      })),
    [hakedis]
  );

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "ay",
        label: "Ay",
        type: "select",
        options: Array.from(new Set(accrualData.map((d) => d.ay))).map((o) => ({
          value: o,
          label: o,
        })),
        value: filtersState.ay,
        onChange: (val: string) => setFiltersState((p) => ({ ...p, ay: val })),
      },
      {
        key: "donem",
        label: "Dönem",
        type: "select",
        options: Array.from(new Set(accrualData.map((d) => d.donem))).map((o) => ({
          value: o,
          label: o,
        })),
        value: filtersState.donem,
        onChange: (val: string) => setFiltersState((p) => ({ ...p, donem: val })),
      },
    ],
    [filtersState, accrualData]
  );

  const filteredData = useMemo(() => {
    return accrualData.filter((d) => {
      return (
        (!filtersState.ay || d.ay === filtersState.ay) &&
        (!filtersState.donem || d.donem === filtersState.donem)
      );
    });
  }, [filtersState, accrualData]);

  const columns: ColumnDefinition<AccrualInfo>[] = useMemo(
    () => [
      { key: "okulSeviyesi", label: "Okul Seviyesi" },
      { key: "meslek", label: "Meslek / Branş" },
      { key: "adSoyad", label: "Adı Soyadı" },
      { key: "sozlesmeTuru", label: "Sözleşme Türü" },
      { key: "haftalikIsGunu", label: "Haftalık İş Günü" },
      {
        key: "maas",
        label: "Maaş",
        render: (r: { maas: { toLocaleString: () => any; }; }) => `${r.maas.toLocaleString()} ₺`,
      },
      {
        key: "dersUcreti",
        label: "Ders Ücreti",
        render: (r: { dersUcreti: { toLocaleString: () => any; }; }) => `${r.dersUcreti.toLocaleString()} ₺`,
      },
      {
        key: "soruCozumUcreti",
        label: "Soru Çözüm Ders Ücreti",
        render: (r: { soruCozumUcreti: { toLocaleString: () => any; }; }) => `${r.soruCozumUcreti.toLocaleString()} ₺`,
      },
      { key: "soruCozumSayisi", label: "Soru Çözüm Ders Sayısı" },
      {
        key: "koclukUcreti",
        label: "Koçluk Ücreti",
        render: (r: { koclukUcreti: { toLocaleString: () => any; }; }) => `${r.koclukUcreti.toLocaleString()} ₺`,
      },
      {
        key: "prim",
        label: "Prim",
        render: (r: { prim: { toLocaleString: () => any; }; }) => `${r.prim.toLocaleString()} ₺`,
      },
      {
        key: "farkliUcret",
        label: "Farklı Ücret",
        render: (r: { farkliUcret: { toLocaleString: () => any; }; }) => `${r.farkliUcret.toLocaleString()} ₺`,
      },
    ],
    []
  );

  return (
    <div className="container-fluid mt-3">
      <ReusableTable<AccrualInfo>
        columns={columns}
        data={filteredData}
        loading={false}
        error={null}
        filters={filters}
        showModal={false}
        currentPage={1}
        totalPages={1}
        totalItems={filteredData.length}
        pageSize={filteredData.length}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        exportFileName="accrual-info"
      />
    </div>
  );
}