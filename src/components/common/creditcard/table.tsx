import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useCreditCardTable } from "../../hooks/creditCard/useCreditCardList";
import { ICreditCard } from "../../../types/creditCard/list";

export default function CreditCardTable() {
  const navigate = useNavigate();

  const {
    creditCardData,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
  } = useCreditCardTable({ enabled: true });

  const columns: ColumnDefinition<ICreditCard>[] = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "card_holder_name", label: "Kart Sahibi" },
      { key: "card_number", label: "Kart No" },
      { key: "expire_month", label: "Ay" },
      { key: "expire_year", label: "Yıl" },
      { key: "amount", label: "Tutar" },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <>
            <button
              onClick={() => navigate(`/creditcardcrud/${row.id}`)}
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
      <ReusableTable<ICreditCard>
        pageTitle="Kredi Kartları"
        onAdd={() => navigate("/creditcardcrud")}
        columns={columns}
        data={creditCardData}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
        tableMode="single"
        exportFileName="creditcards"
      />
    </div>
  );
}
