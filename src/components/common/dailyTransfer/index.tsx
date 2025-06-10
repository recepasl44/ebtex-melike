import { useMemo } from 'react';
import ReusableTable, { ColumnDefinition } from '../ReusableTable';
import { useTransfersTable } from '../../hooks/transfers/useList';
import { TransferData } from '../../../types/transfers/list';

interface DailyTransferRow extends TransferData {
  seasson_name?: string | null;
  branch_name?: string | null;
  date?: string;
  received_amount?: string | null;
  given_amount?: string | null;
  payment_method_name?: string | null;
  bank_name?: string | null;
}

export default function DailyTransferTable() {
  const {
    transfersData,
    loading,
    error,
    page,
    paginate,
    totalPages,
    totalItems,
    setPage,
    setPaginate,
  } = useTransfersTable({ enabled: true });

  const columns: ColumnDefinition<DailyTransferRow>[] = useMemo(
    () => [
      { key: 'seasson_name', label: 'Sezon', render: r => r.seasson_name || '-' },
      { key: 'branch_name', label: 'Şube', render: r => r.branch_name || '-' },
      { key: 'date', label: 'Tarih', render: r => r.date || r.created_at || '-' },
      {
        key: 'received_amount',
        label: 'Alınan Tutar',
        render: r =>
          r.received_amount ? `${Number(r.received_amount).toLocaleString()} ₺` : '-'
      },
      {
        key: 'given_amount',
        label: 'Verilen Tutar',
        render: r =>
          r.given_amount ? `${Number(r.given_amount).toLocaleString()} ₺` : '-'
      },
      { key: 'transaction_type', label: 'İşlem Türü', render: r => r.transaction_type || '-' },
      { key: 'payment_method_name', label: 'Ödeme Şekli', render: r => r.payment_method_name || '-' },
      { key: 'bank_name', label: 'Banka Hesap Adı', render: r => r.bank_name || r.bank_account || '-' },
      { key: 'description', label: 'Açıklama', render: r => r.description || '-' },
    ],
    []
  );

  return (
    <ReusableTable<DailyTransferRow>
      pageTitle="Transfer"
      columns={columns}
      data={transfersData as unknown as DailyTransferRow[]}
      loading={loading}
      error={error}
      tableMode="single"
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={paginate}
      onPageChange={(newPage) => setPage(newPage)}
      onPageSizeChange={(newSize) => {
        setPaginate(newSize);
        setPage(1);
      }}
      showExportButtons
      exportFileName="daily-transfer"
    />
  );
}
