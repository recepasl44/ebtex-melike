import { useState, useMemo } from 'react';
import ReusableTable, { ColumnDefinition, FilterDefinition } from '../ReusableTable';
import { useIncomeTable } from '../../hooks/income/useList';
import { IncomeData } from '../../../types/income/list';
import Pageheader from '../../page-header/pageheader';

export default function IncomeListPage() {

  const [enabled] = useState<boolean>(false);
  const [filter, setFilter] = useState<'daily' | 'monthly' | 'period'>('period');
  const [start_date, setstart_date] = useState<string>('');
  const [end_date, setend_date] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const filters = useMemo((): FilterDefinition[] => {
    return [
      {
        key: 'filter',
        label: 'Filtre',
        value: filter,
        onChange: setFilter,
        options: [
          { value: 'daily', label: 'Günlük' },
          { value: 'monthly', label: 'Aylık' },
          { value: 'period', label: 'Dönemlik' },
        ],
      },
      {
        key: 'dateRange',
        label: 'Tarih Aralığı',
        type: 'doubledate',
        value: { start_date, end_date },
        onChange: (val: { start_date: string; end_date: string }) => {
          setstart_date(val.start_date);
          setend_date(val.end_date);
        },
      },
    ];
  }, [filter, start_date, end_date]);

  const incomeParams = useMemo(() => {
    return {
      enabled: false,
      filter,
      pageSize,
      page,
      start_date,
      end_date,
    };
  }, [filter, pageSize, page, start_date, end_date, enabled]);

  const { incomesData, loading, error, totalPages, totalItems, setPage: updatePage, setPageSize: setIncomePageSize } = useIncomeTable(incomeParams);

  const columns: ColumnDefinition<IncomeData>[] = useMemo(
    () => [
      { key: 'service_type', label: 'Hizmet Türü' },
      { key: 'receivable_amount', label: 'Alacak Tutar' },
      { key: 'paid_amount', label: 'Ödenen Tutar' },
      {
        key: 'remaining_amount',
        label: 'Kalan Tutar',
        render: (row) => row.receivable_amount - row.paid_amount,
      },
    ],
    []
  );

  return (
    <div className="container-fluid mt-3">
      <Pageheader title="Gelirler" currentpage="Gelir Kayıtları" />
      <ReusableTable<IncomeData>
        columns={columns}
        tableMode='single'
        showExportButtons={true}
        data={incomesData}
        loading={loading}
        error={error}
        filters={filters}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => { setPage(newPage); updatePage(newPage); }}
        onPageSizeChange={(newSize) => { setPageSize(newSize); setIncomePageSize(newSize); setPage(1); updatePage(1); }}
        exportFileName="income"
      />
    </div>
  );
}
