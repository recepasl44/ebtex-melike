import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useRentList, RentItem } from "../../hooks/rent/useRentList";

export default function RentTable() {
  const navigate = useNavigate();

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

  const columns: ColumnDefinition<RentItem>[] = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "rent_date", label: "Tarih" },
      { key: "total_rent", label: "Toplam" },
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
          </>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="container mt-3">
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
