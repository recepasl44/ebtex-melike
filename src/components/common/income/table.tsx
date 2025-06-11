import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable, { ColumnDefinition, FilterDefinition } from '../ReusableTable';
import { useIncomeTable } from '../../hooks/income/useList';
import { IncomeData } from '../../../types/income/list';
import { Button } from 'react-bootstrap';
import Pageheader from '../../page-header/pageheader';

export default function IncomeListPage() {
  const navigate = useNavigate();

  const [enabled] = useState<boolean>(false);
  const [filter, setFilter] = useState<'daily' | 'monthly' | 'period'>('period');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
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
        value: { startDate, endDate },
        onChange: (val: { startDate: string; endDate: string }) => {
          setStartDate(val.startDate);
          setEndDate(val.endDate);
        },
      },
    ];
  }, [filter, startDate, endDate]);

  const incomeParams = useMemo(() => {
    return {
      enabled: false,
      filter,
      pageSize,
      page,
      startDate,
      endDate,
    };
  }, [filter, pageSize, page, startDate, endDate, enabled]);

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
