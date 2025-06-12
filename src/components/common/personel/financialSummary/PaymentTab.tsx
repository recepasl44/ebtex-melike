import { useState, useMemo } from "react";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../../ReusableTable";
import { PaymentInfo } from "./dummyData";
import { usePaymentList } from "../../../hooks/employee/salary/payment/usePaymentList";
import { usePersonnelTable } from "../../../hooks/employee/personel/useList";

export default function PaymentTab() {
  const [filtersState, setFiltersState] = useState({ ay: "", donem: "" });

  const { payments, loading } = usePaymentList({ enabled: true });
  const { personnelData } = usePersonnelTable({ enabled: true });

  const paymentData: PaymentInfo[] = useMemo(
    () =>
      payments.map((p) => {
        const person = personnelData.find((pr) => pr.id === p.personel_id);
        const d = new Date(p.odeme_tarihi || "");
        return {
          okulSeviyesi: person?.works_for || "-",
          meslek: person?.pozisyon || "-",
          adSoyad: person ? `${person.ad} ${person.soyad}` : "-",
          sozlesmeTuru: "-",
          toplamUcret: parseFloat(p.miktar ?? "0"),
          ay: d.toLocaleString("tr", { month: "long" }),
          donem: String(d.getFullYear()),
        } as PaymentInfo;
      }),
    [payments, personnelData]
  );

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "ay",
        label: "Ay",
        type: "select",
        options: Array.from(new Set(paymentData.map((d) => d.ay))).map((o) => ({
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
        options: Array.from(new Set(paymentData.map((d) => d.donem))).map((o) => ({
          value: o,
          label: o,
        })),
        value: filtersState.donem,
        onChange: (val: string) => setFiltersState((p) => ({ ...p, donem: val })),
      },
    ],
    [filtersState, paymentData]
  );

  const filteredData = useMemo(() => {
    return paymentData.filter((d) => {
      return (
        (!filtersState.ay || d.ay === filtersState.ay) &&
        (!filtersState.donem || d.donem === filtersState.donem)
      );
    });
  }, [filtersState, paymentData]);

  const columns: ColumnDefinition<PaymentInfo>[] = useMemo(
    () => [
      { key: "okulSeviyesi", label: "Okul Seviyesi" },
      { key: "meslek", label: "Meslek / Branş" },
      { key: "adSoyad", label: "Adı Soyadı" },
      { key: "sozlesmeTuru", label: "Sözleşme Türü" },
      {
        key: "toplamUcret",
        label: "Toplam Ücret",
        render: (r) => `${r.toplamUcret.toLocaleString()} ₺`,
      },
    ],
    []
  );

  return (
    <div className="container-fluid mt-3">
      <ReusableTable<PaymentInfo>
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
        exportFileName="payment-info"
      />
    </div>
  );
}
