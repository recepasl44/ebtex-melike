import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable"

import { useSupplierPaymentsList } from "../../../../../hooks/supplierPayments/useList"
import { useSupplierPaymentsDelete } from "../../../../../hooks/supplierPayments/useDelete"
import { SupplierPaymentData } from "../../../../../../types/supplierPayments/list"

interface SupplierPaymentsTabProps {
  supplierId: number
  enabled: boolean
}

export default function SupplierPaymentsTab({ supplierId, enabled }: SupplierPaymentsTabProps) {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search] = useState("") // if needed

  const { supplierPaymentsData, loading, error } =
    useSupplierPaymentsList({
      enabled,
      supplierId,
      page,
      pageSize,
      search,
    })

  const { deleteExistingSupplierPayment, error: deleteError } = useSupplierPaymentsDelete()

  const columns: ColumnDefinition<SupplierPaymentData>[] = useMemo(() => {
    return [
      {
        key: "payment_date",
        label: "Tarih",
        render: (row) => row.payment_date || "-",
      },
      {
        key: "is_paid",
        label: "Ödeme Durumu",
        render: (row) => row.is_paid ? "Ödeme Yapıldı" : "Vade Tarihi Var",
      },
      {
        key: "amount",
        label: "Tutar",
        render: (row) =>
          row.amount ? `${Number(row.amount).toLocaleString()} ₺` : "0,00 ₺",
      },
      {
        key: "description",
        label: "Açıklama",
        render: (row) => row.description || "-",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <button
              onClick={() =>
                navigate(`/supplierPaymentCrud/${row.id}`, {
                  state: { supplierId },
                })
              }
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
    ]
  }, [navigate, supplierId])

  function handleDeleteRow(row: SupplierPaymentData) {
    if (!row.id) return
    deleteExistingSupplierPayment({ supplierId, supplierPaymentId: row.id })
  }

  return (


    <ReusableTable<SupplierPaymentData>
      pageTitle="Ödemeler"
      onAdd={() => navigate("/supplierPaymentCrud")}
      columns={columns}
      data={supplierPaymentsData || []}
      loading={loading}
      error={error || deleteError}
      pageSize={pageSize}
      onPageChange={(newPage) => setPage(newPage)}
      onPageSizeChange={(newSize) => {
        setPageSize(newSize)
        setPage(1)
      }}
      exportFileName="payments"
      showExportButtons
      onDeleteRow={handleDeleteRow}
    />

  )
}
