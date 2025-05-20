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

  const { supplierDebtsData: debtsData, loading, error, current_page, totalPages, totalItems } =
    useSupplierDebtsList({
      enabled,
      supplierId,
      search,
      page,
      pageSize,
    })

  const { deleteExistingSupplierDebt, error: deleteError } = useSupplierDebtsDelete()

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
        label: "Tutar",
        render: (row) =>
          row.amount ? `${Number(row.amount).toLocaleString()} ₺` : "0,00 ₺",
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
    deleteExistingSupplierDebt({ supplierId, supplierDebtId: row.id })
  }

  return (


    <ReusableTable<SupplierDebtData>
      pageTitle="Borç Listesi"
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

  )
}
