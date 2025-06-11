import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useRentList, RentItem } from "../../hooks/rent/useRentList";
import { useRentDelete } from "../../hooks/rent/useRentDelete";
import Spkcardscomponent from "../../../@spk-reusable-components/reusable-dashboards/spk-cards.tsx";

export default function RentTable() {
  const navigate = useNavigate();
  const { removeRent } = useRentDelete();

  const {
    rentData,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
  } = useRentList({ enabled: true });

  const totalRent = useMemo(
    () => rentData.reduce((sum, r) => sum + Number(r.total_rent || 0), 0),
    [rentData]
  );
  const totalPaid = useMemo(
    () => rentData.reduce((sum, r) => sum + Number((r as any).paid_amount || 0), 0),
    [rentData]
  );
  const totalRemaining = useMemo(
    () => rentData.reduce((sum, r) => sum + Number((r as any).remaining_amount || (Number(r.total_rent || 0) - Number((r as any).paid_amount || 0))), 0),
    [rentData]
  );

  const cards = useMemo(
    () => [
      {
        id: 1,
        title: "Kira Toplamı",
        count: totalRent.toLocaleString(),
        iconClass: "ti ti-wallet",
        backgroundColor: "primary",
      },
      {
        id: 2,
        title: "Ödenen",
        count: totalPaid.toLocaleString(),
        iconClass: "ti ti-check",
        backgroundColor: "primary1",
      },
      {
        id: 3,
        title: "Kalan",
        count: totalRemaining.toLocaleString(),
        iconClass: "ti ti-calendar-minus",
        backgroundColor: "primary2",
      },
    ],
    [totalRent, totalPaid, totalRemaining]
  );

  const columns: ColumnDefinition<RentItem>[] = useMemo(
    () => [
      { key: "id", label: "Sıra No" },
      { key: "rent_date", label: "Kiranın Adı" },
      { key: "total_rent", label: "Ödenecek Tutar" },
      {
        key: "paid_amount",
        label: "Ödenen Tutar",
        render: (r) => (r.paid_amount ? r.paid_amount : "-")
      },
      {
        key: "remaining_amount",
        label: "Kalan Tutar",
        render: (r) =>
          r.remaining_amount
            ? r.remaining_amount
            : r.total_rent
              ? String(Number(r.total_rent) - Number(r.paid_amount || 0))
              : "-",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <>
            <button
              onClick={() => navigate(`/rentdetail/${row.id}`)}
              className="btn btn-icon btn-sm btn-primary-light rounded-pill"
            >
              <i className="ti ti-eye" />
            </button>
            <button
              onClick={() => navigate(`/rentcrud/${row.id}`)}
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              onClick={() => removeRent(Number(row.id))}
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
            >
              <i className="ti ti-trash" />
            </button>
          </>
        ),
      },
    ],
    [navigate, removeRent]
  );

  return (
    <div className="container mt-3">
      <div className="row mb-3">
        {cards.map((card) => (
          <div className="col-md-4" key={card.id}>
            <Spkcardscomponent
              textbefore={false}
              textafter={false}
              cardClass="overflow-hidden main-content-card"
              headingClass="d-block mb-1"
              mainClass="d-flex align-items-start justify-content-between mb-2"
              Icon={true}
              card={card}
              badgeClass="md rounded-pill"
              dataClass="mb-0"
            />
          </div>
        ))}
      </div>
      <ReusableTable<RentItem>
        pageTitle="Kira Listesi"
        onAdd={() => navigate("/rentcrud")}
        columns={columns}
        data={rentData}
        loading={loading}
        error={error}
        tableMode="single"
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
        exportFileName="rents"
      />
    </div>
  );
}
