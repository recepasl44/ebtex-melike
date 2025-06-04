import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
} from "../../ReusableTable";
import { useExpencesTable } from "../../../hooks/expences/main/useExpenseList";
import { IExpense } from "../../../../types/expences/main/list";

import { useExpenseDelete } from "../../../hooks/expences/main/useExpenseDelete";

export default function ExpenseListPage() {
  const navigate = useNavigate();
  const { removeExpence } = useExpenseDelete();

  const {
    expensesData,

    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
  } = useExpencesTable({ enabled: true });

  const columns: ColumnDefinition<IExpense>[] = useMemo(
    () => [
      {
        key: "seasson_name",
        label: "Sezon",
        render: (row) => (row.seasson_name ? row.seasson_name : "-"),
      },
      {
        key: "branch_name",
        label: "Şube",
        render: (row) => (row.branch_name ? row.branch_name : "-"),
      },
      {
        key: "category_name",
        label: "Gider Kalemi",
        render: (row) => (row.category_name ? row.category_name : "-"),
      },
      {
        key: "amount",
        label: "Tutar",
        render: (row) => (row.amount ? row.amount : "-"),
      },
      {
        key: "description",
        label: "Açıklama",
        render: (row) => (row.description ? row.description : "-"),
      },
      {
        key: "invoice_date",
        label: "Tarih",
        render: (row) => (row.invoice_date ? row.invoice_date : "-"),
      },
      {
        key: "status",
        label: "Durum",
        render: (row) => (row.status ? row.status : "-"),
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <button
              onClick={() => navigate(`/expensecrud/${row.id}`)}
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
              onClick={() => openDeleteModal && openDeleteModal(row)}
            >
              <i className="ti ti-trash" />
            </button>
          </>
        ),
      },
    ],
    [navigate]
  );

  return (


    <ReusableTable<IExpense>
      pageTitle="Gider Listesi"
      onAdd={() => navigate("/expensecrud")}
      columns={columns}
      data={expensesData}
      loading={loading}
      error={error}
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={(newPage) => setPage(newPage)}
      onPageSizeChange={(newSize: any) => {
        setPageSize(newSize);
        setPage(1);
      }}
      exportFileName="expences"
      showExportButtons={true}
      tableMode="multi"
      onDeleteRow={(row) => {
        removeExpence(Number(row.id));
      }}
    />

  );
}
