import { useMemo } from 'react';
import ReusableTable, { ColumnDefinition } from '../ReusableTable';
import { useDebtsTable } from '../../hooks/debts/useList';
import { DebtData } from '../../../types/suppliers/debt/list';

export default function DailyTransactionsPaymentsTable() {
  const {
    debtsData,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
  } = useDebtsTable();

  const columns: ColumnDefinition<DebtData>[] = useMemo(
    () => [
      { key: 'seasson_name', label: 'Sezon', render: r => r.seasson_name || '-' },
      { key: 'branch_name', label: 'Şube', render: r => r.branch_name || '-' },
      { key: 'due_date', label: 'Tarih', render: r => r.due_date || '-' },
      { key: 'supplier_id', label: 'Tedarikçi', render: r => String(r.supplier_id) },
      {
        key: 'amount',
        label: 'Ödenen',
        render: r => `${Number(r.amount).toLocaleString()} ₺`,
      },
      {
        key: 'payment_method_name',
        label: 'Ödeme Şekli',
        render: r => r.payment_method_name || '-',
      },
      { key: 'id', label: 'Makbuz No', render: r => String(r.id) },
      { key: 'description', label: 'Açıklama', render: r => r.description || '-' },
    ],
    []
  );

  return (
    <ReusableTable<DebtData>
      pageTitle="Ödemeler"
      columns={columns}
      data={debtsData}
      loading={loading}
      error={error}
      tableMode="single"
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={(newPage) => setPage(newPage)}
      onPageSizeChange={(newSize) => {
        setPageSize(newSize);
        setPage(1);
      }}
      showExportButtons
      exportFileName="daily_transactions_payments"
    />
  );
}
