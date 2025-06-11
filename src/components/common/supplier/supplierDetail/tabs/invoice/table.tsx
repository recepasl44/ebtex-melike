import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable"
import { useSupplierInvoicesList } from "../../../../../hooks/supplierInvoices/useList"
import { SupplierInvoiceData } from "../../../../../../types/supplierInvoices/list"
import { DEFAULT_URL } from "../../../../../../helpers/url_helper"

import { useSupplierInvoicesDelete } from "../../../../../hooks/supplierInvoices/useDelete"

interface SupplierInvoiceTabProps {
  supplierId: number
  enabled: boolean
}

export default function SupplierInvoiceTab({ supplierId, enabled }: SupplierInvoiceTabProps) {
  const navigate = useNavigate()

  // Silme hook
  const { deleteExistingSupplierInvoice, error: deleteError } =
    useSupplierInvoicesDelete()

  // Filtre / arama
  const [search] = useState("")


  const [_page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Liste hook
  const {
    supplierInvoicesData,
    loading,
    error,
    current_page,
    totalPages,
    totalItems,

  } = useSupplierInvoicesList({
    enabled: enabled,
    supplierId,
    search,
  })

  // Kolonlar
  const columns: ColumnDefinition<SupplierInvoiceData>[] = useMemo(() => {
    return [
      {
        key: "issue_date",
        label: "Fatura Tarihi",
        render: (row) => row.issue_date || "-",
      },
      {
        key: "fis_seri_no",
        label: "Fatura Seri No",
        render: (row) => row.fis_seri_no || "-",
      },
      {
        key: "invoice_type_code",
        label: "Fatura Tipi",
        render: (row) => row.invoice_type_code || "-",
      },
      {
        key: "payable_amount",
        label: "Tutar",
        render: (row) => row.payable_amount || "0.00",
      },
      {
        key: "gider_kalemi",
        label: "Gider Kalemi",
        render: (row) => row.gider_kalemi || "-",
      },
      {
        key: "dokuman",
        label: "Doküman",
        render: (row) =>
          row.pdf_path ? (
            <a
              href={`${DEFAULT_URL}/${row.pdf_path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              PDF
            </a>
          ) : (
            "-"
          ),
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <button
              onClick={() =>
                navigate(`/supplierinvoicecrud/${row.id}`, {
                  state: { fromPage: window.location.pathname, supplierId },
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
  }, [navigate])

  function handleDeleteRow(row: SupplierInvoiceData) {
    if (!row.id) return
    deleteExistingSupplierInvoice({
      supplierId: supplierId,
      supplierInvoiceId: row.id
    })
  }

  return (


    <ReusableTable<SupplierInvoiceData>
      pageTitle="Fatura Listesi"
      onAdd={() => navigate(`/supplierinvoicecrud/`)}
      columns={columns}
      data={supplierInvoicesData}
      loading={loading}
      error={error || deleteError}
      currentPage={current_page ?? undefined}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={pageSize}

      tableMode="single"
      onPageChange={(newPage) => setPage(newPage)}
      onPageSizeChange={(newSize: number) => {
        setPageSize(newSize)
        setPage(1)
      }}
      exportFileName="invoices"
      showExportButtons={true}
      onDeleteRow={handleDeleteRow}
    />

  )
}
