// F:\xintra_react_ts\src\components\common\supplier\supplierDetail\tabs\debts\table.tsx
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable"

import { useSupplierDebtsList } from "../../../../../hooks/supplierDebts/useList"
import { useSupplierDebtsDelete } from "../../../../../hooks/supplierDebts/seDelete"
import { SupplierDebtData } from "../../../../../../types/supplierDebts/list"

interface SupplierDebtsTabProps {
  supplierId: number
  enabled: boolean
}

export default function SupplierDebtsTab({ supplierId, enabled }: SupplierDebtsTabProps) {
  const navigate = useNavigate()
  const [search] = useState("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const {
    supplierDebtsData: debtsData,
    loading,
    error,
    current_page,
    totalPages,
    totalItems,
    refetch,
  } = useSupplierDebtsList({
    enabled,
    supplierId,
    search,
    page,
    pageSize,
  })

  const { deleteExistingSupplierDebt, error: deleteError } = useSupplierDebtsDelete()

  const totals = useMemo(() => {
    const totalAmount = (debtsData || []).reduce(
      (sum, r) => sum + parseFloat(r.amount || '0'),
      0
    )
    const totalPaid = (debtsData || []).reduce(
      (sum, r) => sum + parseFloat(r.paid_amount || '0'),
      0
    )
    return { totalAmount, totalPaid }
  }, [debtsData])

  const columns: ColumnDefinition<SupplierDebtData>[] = useMemo(() => {
    return [
      {
        key: "due_date",
        label: "Vade Tarihi",
        render: (row) => row.due_date || "-",
      },
      {
        key: "expense_category_name",
        label: "Gider Kalemi",
        render: (row) => row.expense_category_name || "-",
      },
      {
        key: "description",
        label: "Açıklama",
        render: (row) => row.description || "-",
      },
      {
        key: "amount",
        label: "Ödenecek Tutar",
        render: (row) =>
          row.amount ? `${Number(row.amount).toLocaleString()} ₺` : "0,00 ₺",
      },
      {
        key: "paid_amount",
        label: "Ödenen Tutar",
        render: (row) =>
          row.paid_amount ? `${Number(row.paid_amount).toLocaleString()} ₺` : "0,00 ₺",
      },
      {
        key: "payment_method_name",
        label: "Ödeme Şekli",
        render: (row) => row.payment_method_name || "-",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <button
              onClick={() =>
                navigate(`/supplierDebtCrud/${row.id}`, {
                  state: { supplierId, fromPage: window.location.pathname },
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

  function handleDeleteRow(row: SupplierDebtData) {
    if (!row.id) return
    deleteExistingSupplierDebt({ supplierId, supplierDebtId: row.id }).then(() => {
      refetch()
    })
  }

  return (
    <>
      <ReusableTable<SupplierDebtData>
        // pageTitle="Borç Listesi"
        onAdd={() => navigate(`/supplierDebtCrud`)}
        columns={columns}
        data={debtsData}
        loading={loading}
        tableMode="single"
        error={error || deleteError}
        currentPage={current_page ?? 1}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize)
          setPage(1)
        }}
        exportFileName="debts"
        showExportButtons={true}
        onDeleteRow={handleDeleteRow}
      />

      <div className="d-flex justify-content-end mt-2 fw-bold">
        <span className="me-3">Toplam: {totals.totalAmount.toLocaleString()} ₺</span>
        <span>Ödenen: {totals.totalPaid.toLocaleString()} ₺</span>
      </div>
    </>
  )
}
