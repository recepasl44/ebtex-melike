import { useMemo } from 'react';
import ReusableTable, { ColumnDefinition } from '../ReusableTable';
import { useEstimatedBudgetList } from '../../hooks/estimatedBudget/useEstimatedBudgetList';
import { EstimatedBudgetItem } from '../../../types/estimatedBudget/list';

export default function EstimatedBudgetTable() {
  const { data, loading, error, studentCount, total, perStudent } =
    useEstimatedBudgetList(true);

  const columns: ColumnDefinition<EstimatedBudgetItem>[] = useMemo(
    () => [
      { key: 'id', label: 'Sıra' },
      { key: 'gider_kalemi', label: 'Gider Kalemi' },
      { key: 'gider_turu', label: 'Gider Türü' },
      { key: 'toplam_gider', label: 'Toplam Gider (₺)' },
    ],
    []
  );


  return (
     <div className="container-fluid mt-3">
      <h5>Öğrenci Sayısı: {studentCount}</h5>
      <ReusableTable<EstimatedBudgetItem>
        pageTitle="Tahmini Maliyetler"
        onAdd={() => {}}
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        tableMode="single"
        showExportButtons={true}
      />
      <div className="mt-3 fw-bold">
        Toplam Tahmini Gider: ₺{total?.toLocaleString() ?? '0'}
        <br />
        Tahmini Öğrenci Başına Maliyet: ₺{perStudent?.toLocaleString() ?? '0'}
      </div>
    </div>
  );
}
