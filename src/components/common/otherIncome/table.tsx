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
import GetPaidModal from './getPaid';
import AddOtherIncomeModal from './AddOtherIncomeModal';

export default function OtherIncomeTable() {
  const navigate = useNavigate();
  const { remove } = useOtherIncomeDelete();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

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
      {
        key: 'amount',
        label: 'Toplam',
        render: (row) => `${Number(row.amount).toLocaleString()} ₺`,
      },
      {
        key: 'paid',
        label: 'Ödenen',
        render: (row) => `${Number(row.paid ?? 0).toLocaleString()} ₺`,
      },
      {
        key: 'remaining',
        label: 'Kalan',
        render: (row) =>
          `${(Number(row.amount) - Number(row.paid ?? 0)).toLocaleString()} ₺`,
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
            {/* Düzenle */}
            <Button
              variant="info-light"
              className="btn btn-icon btn-sm rounded-pill me-1"
              onClick={() => navigate(`/other-income/crud/${row.id}`)}
              title="Düzenle"
            >
              <i className="ti ti-pencil" />
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
        onAdd={() => setShowAddModal(true)}
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
        showExportButtons
      />

      {/* Modal: Ekle */}
      {showAddModal && (
        <AddOtherIncomeModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Modal: Ödeme Al */}
      {showPaymentModal && (
        <GetPaidModal
          show={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}
