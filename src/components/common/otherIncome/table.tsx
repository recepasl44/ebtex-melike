import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable, { ColumnDefinition, FilterDefinition } from '../ReusableTable';
import { useOtherIncomeTable } from '../../hooks/otherIncome/useOtherIncomeList';
import { OtherIncomeData } from '../../../types/otherIncome/list';
import { useOtherIncomeDelete } from '../../hooks/otherIncome/useOtherIncomeDelete';

export default function OtherIncomeTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { remove } = useOtherIncomeDelete();

  const {
    otherIncomeData,
    loading,
    error,
    page,
    paginate,
    totalPages,
    totalItems,
    setPage,
    setPaginate,
  } = useOtherIncomeTable({ enabled: true, search });

  const columns: ColumnDefinition<OtherIncomeData>[] = useMemo(
    () => [
      { key: 'season', label: 'Season' },
      { key: 'date', label: 'Date' },
      {
        key: 'customer',
        label: 'Customer',
        render: (row) => row.customer?.name || '-',
      },
      { key: 'income_item', label: 'Item' },
      { key: 'payment_method', label: 'Method' },
      { key: 'amount', label: 'Amount' },
      { key: 'description', label: 'Description' },
      {
        key: 'actions',
        label: 'Actions',
        render: (row) => (
          <>
            <button
              onClick={() => navigate(`/other-income/crud/${row.id}`)}
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
              onClick={() => remove(Number(row.id))}
            >
              <i className="ti ti-trash" />
            </button>
          </>
        ),
      },
    ],
    [navigate, remove]
  );

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: 'search',
        label: 'Search',
        type: 'text',
        value: search,
        onChange: (val: string) => {
          setSearch(val);
          setPage(1);
        },
      },
    ],
    [search, setPage]
  );

  return (
    <div className="container-fluid mt-3">
      <ReusableTable<OtherIncomeData>
        pageTitle="Other Income List"
        onAdd={() => navigate('/other-income/crud')}
        columns={columns}
        data={otherIncomeData}
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
        filters={filters}
        exportFileName="other-income"
      />
    </div>
  );
}
