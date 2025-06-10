import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable, { ColumnDefinition } from '../ReusableTable';
import { useOtherIncomeTable } from '../../hooks/otherIncome/useOtherIncomeList';
import { OtherIncomeData } from '../../../types/otherIncome/list';
import { useOtherIncomeDelete } from '../../hooks/otherIncome/useOtherIncomeDelete';

export default function OtherIncomeTable() {
  const navigate = useNavigate();
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
  } = useOtherIncomeTable({ enabled: true });

  const columns: ColumnDefinition<OtherIncomeData>[] = useMemo(
    () => [
      {
        key: 'customer',
        label: 'Müşteri Adı',
        render: (row) => row.customer?.name || '-',
      },
      { key: 'amount', label: 'Toplam' },
      {
        key: 'paid',
        label: 'Ödenen',
        render: () => '-',
      },
      {
        key: 'remaining',
        label: 'Kalan',
        render: () => '-',
      },
      {
        key: 'phone',
        label: 'Telefon',
        render: (row) => row.customer?.phone || '-',
      },
      {
        key: 'address',
        label: 'Adres',
        render: (row) => (row.customer as any)?.address || '-',
      },
      {
        key: 'actions',
        label: 'İşlemler',
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
        exportFileName="other-income"
      />
    </div>
  );
}
