import { useMemo } from "react";
import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { useBudgetEstimate } from "../../../hooks/accounting/budget_estimate/useBudgetEstimate";
import { BudgetItem } from "../../../../types/accounting/budget_estimate/list";

const BudgetEstimate = () => {
  const { items, info, loading, error } = useBudgetEstimate({ enabled: true });

  const columns: ColumnDefinition<BudgetItem>[] = useMemo(
    () => [
      { key: "gider_kalemi", label: "Gider Kalemi" },
      { key: "gider_turu", label: "Gider Türü" },
      { key: "toplam_gider", label: "Toplam Gider (₺)" },
    ],
    []
  );

  return (
    <div className="container-fluid mt-3">
      <ReusableTable<BudgetItem>
        pageTitle="Tahmini Maliyetler"
        columns={columns}
        data={items}
        loading={loading}
        error={error}
        tableMode="single"
        showExportButtons={false}
      />
      {info && (
        <div className="mt-3">
          <h5>Öğrenci Sayısı: {info.student_count}</h5>
          <h5>Toplam Tahmini Gider: ₺{info.total_expense}</h5>
          <h5>Tahmini Öğrenci Başına Maliyet: ₺{info.per_student}</h5>
        </div>
      )}
    </div>
  );
};

export default BudgetEstimate;
