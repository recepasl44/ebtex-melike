import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useSuppliersTable } from "../../hooks/suppliers/useSuppliersList";
import { Supplier } from "../../../types/suppliers/supplier/list";

import { useSupplierDelete } from "../../hooks/suppliers/useSuppliersDelete";

export default function SupplierListPage() {
  const navigate = useNavigate();
  const { } = useSupplierDelete();

  const [name, setName] = useState("");

  const {
    suppliersData,
    loading,
    error: errorMsg,

    totalPages: last_page,
    totalItems: total,
    pageSize,
    page,
    setPage,
    setPageSize,
  } = useSuppliersTable({
    enabled: true,
    search: name,
  });

  const filters = useMemo(() => {
    return [
      {
        key: "search",
        label: "İsim telefon yada mail giriniz",
        value: name,
        type: "autocomplete" as const,
        onChange: (val: string) => {
          setName(val);
        },
        options: (suppliersData || []).map((item) => ({
          value: item.name,
          label: item.name,
        })),
      },
    ];
  }, [name, suppliersData]);

  const columns: ColumnDefinition<Supplier>[] = useMemo(
    () => [
      {
        key: "name",
        label: "Firma Adı",
        render: (row) => row.name || "-",
      },
      {
        key: "phone",
        label: "Şube",
        render: (row) => row.phone || "-",
      },
      {
        key: "mail",
        label: "E-Posta",
        render: (row) => row.mail || "-",
      },
      {
        key: "address",
        label: "Adres",
        render: (row) => row.address || "-",
      },
      {
        key: "total_debts",
        label: "Toplam Borç",
        type: "currency",
      },
      {
        key: "total_payments",
        label: "Ödenen",
        type: "currency",
      },
      {
        key: "remaining_debt",
        label: "Kalan Borç",
        type: "currency",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <button
              onClick={() => navigate(`/supplierdetail/${row.id}`)}
              className="btn btn-icon btn-sm btn-primary-light rounded-pill"
            >
              <i className="ti ti-eye" />
            </button>
            <button
              onClick={() => navigate(`/suppliercrud/${row.id}`)}
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

    <ReusableTable<Supplier>
      pageTitle="Firma Listesi"
      onAdd={() => navigate("/suppliercrud",)}
      columns={columns}
      tableMode="single"
      showExportButtons={true}
      data={suppliersData}
      loading={loading}
      error={errorMsg}
      filters={filters}
      currentPage={page}
      totalPages={last_page}
      totalItems={total}
      pageSize={pageSize}
      onPageChange={(newPage) => {

        setPage(newPage);
      }}
      onPageSizeChange={(newSize) => {

        setPageSize(newSize);
        setPage(1);
      }}
      exportFileName="supplier"
    />

  );
}
