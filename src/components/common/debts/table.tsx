// F:\xintra_react_ts\src\components\common\debts\table.tsx

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../ReusableTable";
import { useDebtsTable } from "../../hooks/debts/useList";
import { DebtData } from "../../../types/suppliers/debt/list";


export default function DebtsTable() {
  const navigate = useNavigate();

  const {
    debtsData,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
    searchTerm,
    setSearchTerm,
  } = useDebtsTable();

  const columns: ColumnDefinition<DebtData>[] = useMemo(
    () => [
      {
        key: "id",
        label: "ID",
      },
      {
        key: "supplier_id",
        label: "Supplier",
        render: (row) => row.supplier_id,
      },
      {
        key: "branch_name",
        label: "Branch",
        render: (row) => row.branch_name || "-",
      },
      {
        key: "seasson_name",
        label: "Season",
        render: (row) => row.seasson_name || "-",
      },
      {
        key: "expense_category_name",
        label: "Expense Category",
        render: (row) => row.expense_category_name || "-",
      },
      {
        key: "payment_method_id",
        label: "Payment Method",
        render: (row) =>
          row.payment_method_id !== null ? row.payment_method_id : "-",
      },
      {
        key: "amount",
        label: "Amount",
        render: (row) => `₺${Number(row.amount).toLocaleString()}`,
      },
      {
        key: "due_date",
        label: "Due Date",
        render: (row) => row.due_date,
      },
      {
        key: "description",
        label: "Description",
        render: (row) => row.description,
      },
      {
        key: "created_at",
        label: "Created At",
        render: (row) => new Date(row.created_at).toLocaleString(),
      },
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <>
            <button
              onClick={() => navigate(`/debts/${row.id}`)}
              className="btn btn-icon btn-sm btn-primary-light rounded-pill"
            >
              <i className="ti ti-eye" />
            </button>
            <button
              onClick={() => navigate(`/debts/edit/${row.id}`)}
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
            >
              <i className="ti ti-pencil" />
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
  const filter: FilterDefinition[] = useMemo(
    () => [
      {
        key: "name",
        label: "name",
        value: searchTerm,
        onChange: setSearchTerm,
      },
      {
        key: "test",
        label: "test",
        value: "1",
        onChange: (_selectedValue: string) => { },
        options: [{ value: "id", label: "ID" }],
      },
    ],
    [searchTerm, setSearchTerm]
  );

  return (

    <ReusableTable<DebtData>
      pageTitle="Borçlar Listesi"
      onAdd={() => navigate("/debts/create")}
      tableMode="single"
      showModal={false}
      columns={columns}
      data={debtsData}
      loading={loading}
      error={error}
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      exportFileName="courses"
      showExportButtons={true}
      filters={filter}
      pageSize={pageSize}
      onPageChange={(newPage) => setPage(newPage)}
      onPageSizeChange={(newSize) => {
        setPageSize(newSize);
        setPage(1);
      }}
    />

  );
}
