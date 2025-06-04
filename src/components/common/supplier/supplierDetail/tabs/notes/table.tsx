import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable"

import { useSupplierNotesList } from "../../../../../hooks/supplierNotes/useList"
import { useSupplierNotesDelete } from "../../../../../hooks/supplierNotes/useDelete"
import { SupplierNoteData } from "../../../../../../types/supplierNotes/list"

interface SupplierNotesTabProps {
  supplierId: number
  enabled: boolean
}

export default function SupplierNotesTab({ supplierId, enabled }: SupplierNotesTabProps) {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search] = useState("")

  const { supplierNotesData, loading, error, current_page, totalPages, totalItems } =
    useSupplierNotesList({
      enabled,
      supplierId,
      page,
      pageSize,
      search,
    })

  const { deleteExistingSupplierNote, error: deleteError } = useSupplierNotesDelete()

  const columns: ColumnDefinition<SupplierNoteData>[] = useMemo(() => {
    return [
      {
        key: "note",
        label: "Not",
        render: (row) => row.note || "-",
      },
      {
        key: "created_at",
        label: "Oluşturulma Tarihi",
        render: (row) => row.created_at || "-",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <button
              onClick={() =>
                navigate(`/supplierNoteCrud/${row.id}`, {
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

  function handleDeleteRow(row: SupplierNoteData) {
    if (!row.id) return
    deleteExistingSupplierNote({ supplierId, supplierNoteId: row.id })
  }

  return (


    <ReusableTable<SupplierNoteData>
      onAdd={() => navigate("/supplierNoteCrud")}
      pageTitle="Notlar"
      columns={columns}
      data={supplierNotesData || []}
      loading={loading}
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
      exportFileName="notes"
      showExportButtons
      onDeleteRow={handleDeleteRow}
    />

  )
}
