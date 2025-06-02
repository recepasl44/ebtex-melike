import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable, { ColumnDefinition, FilterDefinition } from '../ReusableTable';
import { useIncomeTable } from '../../hooks/income/useList';
import { IncomeData } from '../../../types/income/list';
import { Button } from 'react-bootstrap';

export default function IncomeListPage() {
  const navigate = useNavigate();

  const [enabled] = useState<boolean>(false);
  const [filter, setFilter] = useState<'daily' | 'monthly' | 'period'>('period');
  const [date, setDate] = useState<string>('');
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [startDate, setStartDate] = useState<string>('2021-04-06');
  const [endDate, setEndDate] = useState<string>('2025-04-06');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const filters = useMemo(() => {
    const basicFilters: FilterDefinition[] = [
      {
        key: 'search',
        label: 'Arama',
        value: searchTerm,
        onChange: setSearchTerm,
      },
      {
        key: 'filter',
        label: 'Filtre',
        value: filter,
        onChange: setFilter,
        options: [
          { value: 'daily', label: 'Günlük' },
          { value: 'monthly', label: 'Aylık' },
          { value: 'period', label: 'Periyot' },
        ],
      },
    ];

    if (filter === 'daily') {
      basicFilters.push({
        key: 'date',
        label: 'Tarih',
        value: date,
        onChange: setDate,
        type: 'date',
      });
    }
    if (filter === 'monthly') {
      basicFilters.push({
        key: 'month',
        label: 'Ay',
        value: month,
        onChange: (value) => setMonth(Number(value)),
        type: 'number',
      });
      basicFilters.push({
        key: 'year',
        label: 'Yıl',
        value: year,
        onChange: (value) => setYear(Number(value)),
        type: 'number',
      });
    }
    if (filter === 'period') {
      basicFilters.push({
        key: 'startDate',
        label: 'Başlangıç Tarihi',
        value: startDate,
        onChange: setStartDate,
        type: 'date',
      });
      basicFilters.push({
        key: 'endDate',
        label: 'Bitiş Tarihi',
        value: endDate,
        onChange: setEndDate,
        type: 'date',
      });
    }

    return basicFilters;
  }, [filter, searchTerm, date, month, year, startDate, endDate]);

  const incomeParams = useMemo(() => {
    return {
      enabled: false,
      filter,
      pageSize,
      page,
      date: filter === 'daily' ? date : undefined,
      month: filter === 'monthly' ? month : undefined,
      year: filter === 'monthly' ? year : undefined,
      startDate: filter === 'period' ? startDate : undefined,
      endDate: filter === 'period' ? endDate : undefined,
      searchTerm,
    };
  }, [filter, pageSize, page, date, month, year, startDate, endDate, searchTerm, enabled]);

  const { incomesData, loading, error, totalPages, totalItems, setPage: updatePage, setPageSize: setIncomePageSize } = useIncomeTable(incomeParams);

  const columns: ColumnDefinition<IncomeData>[] = useMemo(() => [
    {
      key: 'service_id',
      label: 'Servis ID',
    },
    {
      key: 'service_name',
      label: 'Servis Adı',
    },
    {
      key: 'total_income',
      label: 'Toplam Gelir',
    },
    {
      key: 'payment_date',
      label: 'Ödeme Tarihi',
      render: (row) => row.payment_date || '-',
    },
    {
      key: 'actions',
      label: 'İşlemler',
      render: (row) => (
        <>
          <Button variant="primary" size="sm" onClick={() => navigate(`/income/${row.service_id}`)}>
            Detaylar
          </Button>
        </>
      ),
    },
  ], [navigate]);

  return (
    <div className="">
      <div className="">
        <h4>Gelir Listesi</h4>
        <Button variant="success" onClick={() => navigate('/income-create')}>
          Gelir Ekle
        </Button>
      </div>
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
