import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable, { ColumnDefinition } from '../ReusableTable';
import Pageheader from '../../page-header/pageheader';
import { useOtherIncomeTable } from '../../hooks/otherIncome/useOtherIncomeList';
import { OtherIncomeData } from '../../../types/otherIncome/list';
import { useOtherIncomeDelete } from '../../hooks/otherIncome/useOtherIncomeDelete';

import odemeAl from '../../../assets/images/media/ödeme-al.svg';
import odemeAlHover from '../../../assets/images/media/ödeme-al-hover.svg';
import { Button } from 'react-bootstrap';
import { OtherIncomePaymentModal } from './crud';
import OtherIncomeCrud from './crud';

export default function OtherIncomeTable() {
  const navigate = useNavigate();
  const { remove } = useOtherIncomeDelete();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

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
        render: () => '-', // Dinamik değilse backend'e göre güncellenebilir
      },
      {
        key: 'remaining',
        label: 'Kalan',
        render: () => '-', // Aynı şekilde
      },
      {
        key: 'phone',
        label: 'Telefon',
        render: (row) => row.customer?.phone || '-',
      },
      {
        key: 'address',
        label: 'Adres',
        render: (row) => row.customer?.address || '-',
      },
      {
        key: 'actions',
        label: 'İşlemler',
        render: (row) => (
          <>
            {/* Detay */}
            <Button
              variant="primary-light"
              onClick={() => navigate(`/other-income/detail/${row.id}`)}
              className="btn btn-icon btn-sm rounded-pill me-1"
              title="Detay"
            >
              <i className="ti ti-eye" />
            </Button>

            {/* Ödeme Al */}
            <Button
              onClick={() => setShowPaymentModal(true)}
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

            {/* Sil */}
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
        onAdd={() => setShowCreateModal(true)} // ✅ Ekle butonu tetikleme
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

      {/* Modal: Yeni kayıt ekleme */}
      {showCreateModal && (
        <OtherIncomeCrud
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onRefresh={() => {
            setShowCreateModal(false);
            // refresh için query trigger gerekirse eklenebilir
          }}
        />
      )}

      {/* Modal: Ödeme alma */}
      {showPaymentModal && (
        <OtherIncomePaymentModal
          show={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}
