import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../ReusableTable";
import { useTransfersTable } from "../../hooks/transfers/useList";
import { TransferData } from "../../../types/transfers/list";

export default function TransfersTable() {
  const navigate = useNavigate();


  const [searchTerm, setSearchTerm] = useState("");


  const {
    transfersData,
    loading,
    error,
    page,
    paginate,
    totalPages,
    totalItems,
    setPage,
    setPaginate,
  } = useTransfersTable({ enabled: true, search: searchTerm });


  const columns: ColumnDefinition<TransferData>[] = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "transaction_type", label: "Transaction Type" },
      { key: "sender_branch_id", label: "Sender Branch" },
      { key: "receiver_branch_id", label: "Receiver Branch" },
      {
        key: "amount",
        label: "Amount",
        render: (row) => `₺${Number(row.amount).toLocaleString()}`,
      },
      { key: "bank_account", label: "Bank Account" },
      { key: "description", label: "Description" },
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
              onClick={() => navigate(`/transfers/${row.id}`)}
              className="btn btn-icon btn-sm btn-primary-light rounded-pill"
            >
              <i className="ti ti-eye" />
            </button>
            <button
              onClick={() => navigate(`/transfers/crud/${row.id}`)}
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
              onClick={() => {

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


  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "search",
        label: "Search",
        type: "text",
        value: searchTerm,
        onChange: (val: string) => {
          setSearchTerm(val);
          setPage(1);
        },
      },
    ],
    [searchTerm, setPage]
  );

  return (
    <div className="container mt-3">
      <ReusableTable<TransferData>
        pageTitle="Transfer Listesi"
        onAdd={() => navigate("/transfers/crud")}
        columns={columns}
        data={transfersData}
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
        filters={filters}
        exportFileName="transfers"
      />
    </div>
  );
}
