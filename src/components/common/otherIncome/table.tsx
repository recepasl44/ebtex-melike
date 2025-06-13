import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable, { ColumnDefinition } from '../ReusableTable';
import Pageheader from '../../page-header/pageheader';
import { useOtherIncomeTable } from '../../hooks/otherIncome/useOtherIncomeList';
import { OtherIncomeData } from '../../../types/otherIncome/list';
import { useOtherIncomeDelete } from '../../hooks/otherIncome/useOtherIncomeDelete';

import odemeAl from '../../../assets/images/media/ödeme-al.svg';
import odemeAlHover from '../../../assets/images/media/ödeme-al-hover.svg';
import { Button } from 'react-bootstrap';

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
            {/* Düzenle Butonu */}
            <Button
              variant="primary-light"
              onClick={() => navigate(`/other-income/crud/${row.id}`)}
              className="btn btn-icon btn-sm rounded-pill me-1"
              title="Düzenle"
            >
              <i className="ti ti-pencil" />
            </Button>

            {/* Ödeme Al Butonu (img ile) */}
            <Button
              onClick={() => alert(`Ödeme alınacak: ID ${row.id}`)}
              style={{ padding: 0, marginRight: '6px' }}
              variant=""
              title="Ödeme Al"
            >
              <img
                src={odemeAl}
                alt="Ödeme Al"
                width={24}
                height={24}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).src = odemeAlHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).src = odemeAl;
                }}
              />
            </Button>

            {/* Sil Butonu */}
            <Button
              variant="danger-light"
              onClick={() => remove(Number(row.id))}
              className="btn btn-icon btn-sm rounded-pill"
              title="Sil"
            >
              <i className="ti ti-trash" />
            </Button>
          </>
        ),
      },
    ],
    [navigate, remove]
  );

  return (
    <div className="container-fluid mt-3">
      <Pageheader title="Gelirler" currentpage="Farklı Gelirler" />
      <ReusableTable<OtherIncomeData>
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
