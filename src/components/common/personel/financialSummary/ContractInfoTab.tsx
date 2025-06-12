import { useState, useMemo } from "react";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../../ReusableTable";
import { ContractInfo } from "./dummyData";
import { usePersonnelTable } from "../../../hooks/employee/personel/useList";

export default function ContractInfoTab() {
  const [filtersState, setFiltersState] = useState({
    okulSeviyesi: "",
    sozlesmeTuru: "",
    meslek: "",
    adSoyad: "",
  });

  const { personnelData, loading } = usePersonnelTable({ enabled: true });

  const contractInfoData = useMemo<ContractInfo[]>(
    () =>
      personnelData.map((p) => ({
        okulSeviyesi: p.works_for || "-",
        meslek: p.pozisyon || "-",
        adSoyad: `${p.ad} ${p.soyad}`,
        sozlesmeTuru: p.gorev || "-",
        haftalikIsGunu: 0,
        haftalikDersSayisi: 0,
        aySayisi: 0,
        maas: parseFloat(p.base_salary ?? "0"),
        dersUcreti: 0,
        soruCozumUcreti: 0,
        gunlukUcret: 0,
        ozelDersUcreti: 0,
        koclukUcreti: 0,
      })),
    [personnelData]
  );

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "okulSeviyesi",
        label: "Okul Seviyesi",
        type: "select",
        options: Array.from(new Set(contractInfoData.map((d) => d.okulSeviyesi))).map((o) => ({ value: o, label: o })),
        value: filtersState.okulSeviyesi,
        onChange: (val: string) =>
          setFiltersState((p) => ({ ...p, okulSeviyesi: val })),
      },
      {
        key: "sozlesmeTuru",
        label: "Sözleşme Türü",
        type: "select",
        options: Array.from(new Set(contractInfoData.map((d) => d.sozlesmeTuru))).map((o) => ({ value: o, label: o })),
        value: filtersState.sozlesmeTuru,
        onChange: (val: string) =>
          setFiltersState((p) => ({ ...p, sozlesmeTuru: val })),
      },
      {
        key: "meslek",
        label: "Meslek / Branş",
        type: "select",
        options: Array.from(new Set(contractInfoData.map((d) => d.meslek))).map((o) => ({ value: o, label: o })),
        value: filtersState.meslek,
        onChange: (val: string) => setFiltersState((p) => ({ ...p, meslek: val })),
      },
      {
        key: "adSoyad",
        label: "Ad Soyad",
        type: "select",
        options: Array.from(new Set(contractInfoData.map((d) => d.adSoyad))).map((o) => ({ value: o, label: o })),
        value: filtersState.adSoyad,
        onChange: (val: string) => setFiltersState((p) => ({ ...p, adSoyad: val })),
      },
    ],
    [filtersState, contractInfoData]
  );

  const filteredData = useMemo(() => {
    return contractInfoData.filter((d) => {
      return (
        (!filtersState.okulSeviyesi || d.okulSeviyesi === filtersState.okulSeviyesi) &&
        (!filtersState.sozlesmeTuru || d.sozlesmeTuru === filtersState.sozlesmeTuru) &&
        (!filtersState.meslek || d.meslek === filtersState.meslek) &&
        (!filtersState.adSoyad || d.adSoyad === filtersState.adSoyad)
      );
    });
  }, [filtersState, contractInfoData]);

  const columns: ColumnDefinition<ContractInfo>[] = useMemo(
    () => [
      { key: "okulSeviyesi", label: "Okul Seviyesi" },
      { key: "meslek", label: "Meslek / Branş" },
      { key: "adSoyad", label: "Adı Soyadı" },
      { key: "sozlesmeTuru", label: "Sözleşme Türü" },
      { key: "haftalikIsGunu", label: "Haftalık İş Günü" },
      { key: "haftalikDersSayisi", label: "Haftalık Ders Sayısı" },
      { key: "aySayisi", label: "Ay Sayısı" },
      {
        key: "maas",
        label: "Maaş",
        render: (r) => `${r.maas.toLocaleString()} ₺`,
      },
      {
        key: "dersUcreti",
        label: "Ders Ücreti (₺)",
        render: (r) => `${r.dersUcreti.toLocaleString()} ₺`,
      },
      {
        key: "soruCozumUcreti",
        label: "Soru Çözüm Ders Ücreti",
        render: (r) => `${r.soruCozumUcreti.toLocaleString()} ₺`,
      },
      {
        key: "gunlukUcret",
        label: "Günlük Ücret (₺)",
        render: (r) => `${r.gunlukUcret.toLocaleString()} ₺`,
      },
      {
        key: "ozelDersUcreti",
        label: "Özel Ders Ücreti",
        render: (r) => `${r.ozelDersUcreti.toLocaleString()} ₺`,
      },
      {
        key: "koclukUcreti",
        label: "Koçluk Ders Ücreti",
        render: (r) => `${r.koclukUcreti.toLocaleString()} ₺`,
      },
    ],
    []
  );

  return (
    <div className="container-fluid mt-3">
      <ReusableTable<ContractInfo>
        columns={columns}
        data={filteredData}
        loading={loading}
        error={null}
        filters={filters}
        showModal={false}
        currentPage={1}
        totalPages={1}
        totalItems={filteredData.length}
        pageSize={filteredData.length}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        exportFileName="contract-info"
      />
    </div>
  );
}
