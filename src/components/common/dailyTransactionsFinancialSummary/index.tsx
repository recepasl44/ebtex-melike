import React, { useMemo, useState } from 'react';
import ReusableTable, { ColumnDefinition } from '../ReusableTable';
import { useFinancialSummary } from '../../hooks/accounting/financial_summary/useFinancialSummary';

interface RowData {
  category: string;
  cash: number | string;
  creditCard: number | string;
  other: number | string;
  total: number | string;
  description?: string;
}

const DailyTransactionsFinancialSummary: React.FC = () => {
  const { summary, loading } = useFinancialSummary();

  const rows: RowData[] = useMemo(() => {
    const arr: RowData[] = [];
    if (summary) {
      arr.push({
        category: 'Kasa Nakit',
        cash: summary.liquid_assets?.cash ?? '-',
        creditCard: '-',
        other: '-',
        total: summary.liquid_assets?.cash ?? '-',
      });
      arr.push({
        category: 'Kalan Alacaklar',
        cash: summary.liquid_assets?.remaining_receivables ?? '-',
        creditCard: '-',
        other: '-',
        total: summary.liquid_assets?.remaining_receivables ?? '-',
      });

      summary.liquid_assets?.banks?.forEach((b) => {
        arr.push({
          category: b.bank_name,
          cash: '-',
          creditCard: b.amount ?? '-',
          other: '-',
          total: b.amount ?? '-',
        });
      });

      arr.push({
        category: 'Personel Ödemeleri',
        cash: '-',
        creditCard: '-',
        other: summary.liabilities?.personnel_payables ?? '-',
        total: summary.liabilities?.personnel_payables ?? '-',
      });

      arr.push({
        category: 'Tedarikçi Borçları',
        cash: '-',
        creditCard: '-',
        other: summary.liabilities?.supplier_debts ?? '-',
        total: summary.liabilities?.supplier_debts ?? '-',
      });
    }
    return arr;
  }, [summary]);

  const [search] = useState('');

  const filteredRows = useMemo(() => {
    if (!search) return rows;
    const term = search.toLocaleLowerCase('tr-TR');
    return rows.filter((r) =>
      r.category.toLocaleLowerCase('tr-TR').includes(term)
    );
  }, [rows, search]);

  const columns: ColumnDefinition<RowData>[] = useMemo(
    () => [
      { key: 'category', label: 'Kategori', render: (r) => r.category },
      { key: 'cash', label: 'Nakit', render: (r) => r.cash },
      { key: 'creditCard', label: 'Kredi Kartı', render: (r) => r.creditCard },
      { key: 'other', label: 'Diğer', render: (r) => r.other },
      { key: 'total', label: 'Toplam', render: (r) => r.total },
      { key: 'description', label: 'Açıklama', render: (r) => r.description || '-' },
    ],
    []
  );



  return (
    <div className="container mt-3">
      <ReusableTable<RowData>
        pageTitle="Finansal Özet"
        columns={columns}
        data={filteredRows}
        loading={loading}
        error={null}
        tableMode="single"
        currentPage={1}
        totalPages={1}
        totalItems={filteredRows.length}
        pageSize={filteredRows.length}
        onPageChange={() => { }}
        onPageSizeChange={() => { }}

        showModal={false}
        exportFileName="financial-summary"
      />
    </div>
  );
};

export default DailyTransactionsFinancialSummary;
