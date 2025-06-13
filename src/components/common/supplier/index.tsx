import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useSuppliersTable } from "../../hooks/suppliers/useSuppliersList";
import { Supplier } from "../../../types/suppliers/supplier/list";

import { useSupplierDelete } from "../../hooks/suppliers/useSuppliersDelete";
import Pageheader from "../../page-header/pageheader";

export default function SupplierListPage() {
  const navigate = useNavigate();
  const { removeSupplier, error: deleteError } = useSupplierDelete();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [deleteWarning, setDeleteWarning] = useState<string | null>(null);

  const handleDeleteOpen = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setDeleteWarning(null);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSupplier) return;
    if (Number(selectedSupplier.remaining_debt) === 0) {
      await removeSupplier(selectedSupplier.id);
      setShowDeleteModal(false);
    } else {
      setDeleteWarning(
        "Ödenecek tutar 0 TL olmadığı için yönetici onayı olmadan silinemez."
      );
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedSupplier(null);
  };

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
  });

  const columns: ColumnDefinition<Supplier>[] = useMemo(
    () => [
      {
        key: "name",
        label: "Firma Adı",
        render: (row) => row.name || "-",
      },
      {
        key: "phone",
        label: "Telefon",
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
        label: "Ödenecek Tutar",
        type: "currency",
      },
      {
        key: "total_payments",
        label: "Ödenen Tutar",
        type: "currency",
      },
      {
        key: "remaining_debt",
        label: "Kalan Tutar",
        type: "currency",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
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
              onClick={() => handleDeleteOpen(row)}
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

    <>
      <Pageheader title="Finans ve Muhasebe" currentpage="Tedarikçiler" />
      <ReusableTable<Supplier>
        // pageTitle="Tedarikçiler"
        onAdd={() => navigate("/suppliercrud")}
        columns={columns}
        tableMode="single"
        showExportButtons={true}
        data={suppliersData}
        loading={loading}
        error={errorMsg}
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

      <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Onay</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Silmek istediğinizden emin misiniz?
          {deleteWarning && (
            <div className="alert alert-warning mt-2">{deleteWarning}</div>
          )}
          {deleteError && (
            <div className="alert alert-danger mt-2">{deleteError}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleDeleteCancel}>
            Vazgeç
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Sil
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
