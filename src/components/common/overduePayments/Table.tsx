import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../../../components/common/ReusableTable";
import { useOverduePayments } from "../../../components/hooks/overduePayments/useOverduePayments";
import { OverduePayment } from "../../../types/overduePayments/list";
import { OverduePaymentFilter } from "../../../enums/overduePayments/list";

export default function OverduePaymentsPage() {
  const navigate = useNavigate();

  const {
    data: overdueData,
    error,
    current_page,
    total,
    per_page,
    setPage,
    setPaginate,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
  } = useOverduePayments();

  const totalPages = Math.ceil(total / per_page);

  /* ───────────────────── columns ───────────────────── */
  const columns: ColumnDefinition<OverduePayment>[] = useMemo(
    () => [
      { key: "soz_no", label: "Sözleşme No", render: (row) => row.soz_no },
      { key: "sube", label: "Şube", render: (row) => row.sube || "-" },
      { key: "adi", label: "Ad", render: (row) => row.adi || "-" },
      { key: "soyadi", label: "Soyad", render: (row) => row.soyadi || "-" },
      { key: "vade", label: "Vade", render: (row) => row.vade },
      { key: "vade_gap", label: "Gecikme Gün Sayısı", render: (row) => row.vade_gap },
      { key: "odeme_tipi", label: "Ödeme Tipi", render: (row) => row.odeme_tipi },
      { key: "borc", label: "Borç", render: (row) => row.borc },
      { key: "taksit_sayisi", label: "Taksit Sayısı", render: (row) => row.taksit_sayisi },
      { key: "percent_of_total", label: "Yüzde", render: (row) => row.percent_of_total },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <>
            <button
              onClick={() => navigate(`/overdue-payment/${row.soz_no}`)}
              className="btn btn-icon btn-sm btn-primary-light rounded-pill"
            >
              <i className="ti ti-eye" />
            </button>
            <button
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
              onClick={() => {
                /* delete action */
              }}
            >
              <i className="ti ti-trash" />
            </button>
          </>
        ),
      },
    ],
    [navigate]
  );

  /* ───────────────────── filters ───────────────────── */
  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "search",
        label: "Öğrenci Adı",
        type: "text",
        value: searchTerm,
        onChange: (val: string) => {
          setSearchTerm(val);
          setPage(1);
        },
      },
      {
        key: "period",
        label: "Dönem",
        type: "select",
        value: filter,
        options: [
          { label: "Günlük", value: OverduePaymentFilter.DAILY },
          { label: "Aylık", value: OverduePaymentFilter.MONTHLY },
          { label: "Yıllık", value: OverduePaymentFilter.YEARLY },
        ],
        onChange: (val: string) => {
          setFilter(val as OverduePaymentFilter);
          setPage(1);
        },
      },
    ],
    [searchTerm, filter, setSearchTerm, setFilter, setPage]
  );

  /* ───────────────────── render ───────────────────── */
  return (
    <div className="container-fluid mt-3">
      <ReusableTable<OverduePayment>
        pageTitle="Geciken Ödemeler"
        tableMode="single"
        onAdd={() => navigate("/overdue-payment-add")}
        columns={columns}
        data={overdueData}
        error={error}
        currentPage={current_page}
        totalPages={totalPages}
        totalItems={total}
        pageSize={per_page}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => {
          setPaginate(newSize);
          setPage(1);
        }}
        filters={filters}
        exportFileName="overdue_payments"
      />
    </div>
  );
}
