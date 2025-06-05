import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable"

import { useSupplierRefundsList } from "../../../../../hooks/supplierRefunds/useList"
import { useSupplierRefundsDelete } from "../../../../../hooks/supplierRefunds/useDelete"

import { SupplierRefundData } from "../../../../../../types/supplierRefunds/list"

interface SupplierRefundTabProps {
  supplierId: number
  enabled: boolean
}

export default function SupplierRefundTab({ supplierId, enabled }: SupplierRefundTabProps) {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search] = useState("") // optional if you do searching

  const { supplierRefundsData: refunds, loading, error } =
    useSupplierRefundsList({
      enabled,
      supplierId,
      page,
      pageSize,
      search,
    })

  const { deleteExistingSupplierRefund, error: deleteError } = useSupplierRefundsDelete()

  const columns: ColumnDefinition<SupplierRefundData>[] = useMemo(() => {
    return [
      {
        key: "refund_date",
        label: "Tarih",
        render: (row) => row.refund_date || "-",
      },
      {
        key: "refund_type",
        label: "Tür",
        render: (row) => row.refund_type || "-", // "invoice" or "debt"
      },
      {
        key: "description",
        label: "Açıklama",
        render: (row) => row.description || "-",
      },
      {
        key: "amount",
        label: "Tutar",
        render: (row) => row.amount ? `${Number(row.amount).toLocaleString()} ₺` : "0,00 ₺",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <button
              onClick={() =>
                navigate(`/supplierRefundCrud/${row.id}`, {
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

  function handleDeleteRow(row: SupplierRefundData) {
    if (!row.id) return
    deleteExistingSupplierRefund({
      supplierId,
      supplierRefundId: row.id,
    })
  }

  return (


    <ReusableTable<SupplierRefundData>
      pageTitle="İadeler"
      onAdd={() => navigate("/supplierRefundCrud")}
      columns={columns}
      data={refunds || []}
      loading={loading}
      error={error || deleteError}

      pageSize={pageSize}
      onPageChange={(newPage) => setPage(newPage)}
      onPageSizeChange={(newSize) => {
        setPageSize(newSize)
        setPage(1)
      }}
      exportFileName="refunds"
      showExportButtons
      onDeleteRow={handleDeleteRow}
    />

  )
}
