import { useMemo } from 'react';
import ReusableTable, { ColumnDefinition } from '../../ReusableTable';
import { useCreditCardTable } from '../../../hooks/creditCard/useCreditCardList';
import { ICreditCard } from '../../../../types/creditCard/list';

interface DailyCreditCardRow extends ICreditCard {
  seasson_name?: string | null;
  branch_name?: string | null;
  bank_name?: string | null;
  payment_method_name?: string | null;
  transaction_date?: string;
}

export default function DailyCardManagementTable() {
  const {
    creditCardData,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
  } = useCreditCardTable({ enabled: true });

  const columns: ColumnDefinition<DailyCreditCardRow>[] = useMemo(
    () => [
      { key: 'seasson_name', label: 'Sezon', render: r => r.seasson_name || '-' },
      { key: 'branch_name', label: 'Şube', render: r => r.branch_name || '-' },
      { key: 'transaction_date', label: 'Tarih', render: r => r.transaction_date || r.created_at || '-' },
      { key: 'card_holder_name', label: 'Kredi Kartı', render: r => r.card_holder_name || '-' },
      {
        key: 'amount',
        label: 'Ödenen Tutar',
        render: r => (r.amount ? `${Number(r.amount).toLocaleString()} ₺` : '-')
      },
      { key: 'payment_method_name', label: 'Ödeme Şekli', render: r => r.payment_method_name || '-' },
      { key: 'bank_name', label: 'Banka Hesap Adı', render: r => r.bank_name || '-' },
      { key: 'description', label: 'Açıklama', render: r => r.description || '-' },
    ],
    []
  );

  return (
    <ReusableTable<DailyCreditCardRow>
      // pageTitle="Kart Yönetimi"
      columns={columns}
      data={creditCardData as DailyCreditCardRow[]}
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
      exportFileName="daily-card-management"
    />
  );
}
