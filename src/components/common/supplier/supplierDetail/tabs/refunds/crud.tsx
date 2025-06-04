// F:\xintra_react_ts\src\components\common\supplier\supplierDetail\tabs\refund\crud.tsx

import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm"
import { useSupplierRefundsDetail } from "../../../../../hooks/supplierRefunds/useDetail"
import { useSupplierRefundsAdd } from "../../../../../hooks/supplierRefunds/useAdd"
import { useSupplierRefundsUpdate } from "../../../../../hooks/supplierRefunds/useUpdate"

// Borçları getirmek için
import { useSupplierDebtsList } from "../../../../../hooks/supplierDebts/useList"
// Faturaları getirmek için
import { useSupplierInvoicesList } from "../../../../../hooks/supplierInvoices/useList"

interface RefundFormValues {
  refund_type: string  // "invoice" or "debt"
  invoice_id?: number | null
  debt_id?: number | null
  amount: string
  refund_date: string
  description?: string
}

export default function SupplierRefundCrud() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id?: string }>()
  const mode = id ? "update" : "add"

  const { supplierId } = (location.state as { supplierId?: number }) || {}

  // Refund detail hooks
  const { supplierRefund, error: detailError, status: detailStatus, getSupplierRefund } = useSupplierRefundsDetail()
  const { addNewSupplierRefund, error: addError, status: addStatus } = useSupplierRefundsAdd()
  const { updateExistingSupplierRefund, error: updateError, status: updateStatus } = useSupplierRefundsUpdate()

  // Borç Listesi
  const { supplierDebtsData: allDebts } = useSupplierDebtsList({
    enabled: true,
    supplierId: supplierId || 0, 
    page: 1,
    pageSize: 9999, // get all debts (if pagination needed)
  })
  // Fatura Listesi
  const { supplierInvoicesData: allInvoices } = useSupplierInvoicesList({
    enabled: true,
    supplierId: supplierId || 0,
    page: 1,
    pageSize: 9999,
  })

  const [initialValues, setInitialValues] = useState<RefundFormValues>({
    refund_type: "debt",
    invoice_id: null,
    debt_id: null,
    amount: "",
    refund_date: "",
    description: "",
  })

  useEffect(() => {
    if (mode === "update" && id && supplierId) {
      getSupplierRefund({
        supplierId,
        supplierRefundId: Number(id),
      })
    }
  }, [mode, id, supplierId, getSupplierRefund])

  useEffect(() => {
    if (mode === "update" && supplierRefund) {
      setInitialValues({
        refund_type: supplierRefund.refund_type || "debt",
        invoice_id: supplierRefund.invoice_id ?? null,
        debt_id: supplierRefund.debt_id ?? null,
        amount: supplierRefund.amount || "",
        refund_date: supplierRefund.refund_date || "",
        description: supplierRefund.description || "",
      })
    }
  }, [mode, supplierRefund])

  // Borç listesinden select option
  const debtOptions = (allDebts || []).map((d) => ({
    label: `Borç #${d.id} - ${d.description || ""} (${d.amount} ₺)`,
    value: d.id,
  }))

  // Fatura listesinden select option
  const invoiceOptions = (allInvoices || []).map((inv) => ({
    label: `Fatura #${inv.id} - ${inv.fatura_adi || ""} (${inv.payable_amount} ₺)`,
    value: inv.id,
  }))

  // Dinamik field: eğer refund_type="debt" => debt_id'yi göster
  //                refund_type="invoice" => invoice_id'yi göster
  // Bunu "function" field approach ile yapıyoruz
  function getFields(values: RefundFormValues): FieldDefinition[] {
    // Ortak alanlar
    const commonFields: FieldDefinition[] = [
      {
        name: "refund_type",
        label: "İade Türü",
        type: "select",
        required: true,
        options: [
          { label: "Borç", value: "debt" },
          { label: "Fatura", value: "invoice" },
        ],
      },
      {
        name: "refund_date",
        label: "Tarih",
        type: "date",
        required: true,
      },
      {
        name: "amount",
        label: "Tutar",
        type: "currency",
        required: true,
      },
      {
        name: "description",
        label: "Açıklama",
        type: "textarea",
      },
    ]

    // Koşullu alanlar
    if (values.refund_type === "debt") {
      // Debt select
      commonFields.splice(1, 0, {
        name: "debt_id",
        label: "Borç Seç",
        type: "select",
        required: true,
        options: debtOptions,
      })
    } else {
      // invoice
      commonFields.splice(1, 0, {
        name: "invoice_id",
        label: "Fatura Seç",
        type: "select",
        required: true,
        options: invoiceOptions,
      })
    }

    return commonFields
  }

  async function handleSubmit(vals: RefundFormValues) {
    if (!supplierId) {
      alert("supplierId yok")
      return
    }
    if (mode === "add") {
      await addNewSupplierRefund({
        supplier_id: supplierId,
        refund_type: vals.refund_type,
        invoice_id: vals.refund_type === "invoice" ? vals.invoice_id : null,
        debt_id: vals.refund_type === "debt" ? vals.debt_id : null,
        amount: vals.amount,
        refund_date: vals.refund_date,
        description: vals.description,
      } as any)
    } else {
      if (!id) return
      await updateExistingSupplierRefund({
        supplierId,
        supplierRefundId: Number(id),
        payload: {
          refund_type: vals.refund_type,
          invoice_id: vals.refund_type === "invoice" ? vals.invoice_id : null,
          debt_id: vals.refund_type === "debt" ? vals.debt_id : null,
          amount: vals.amount,
          refund_date: vals.refund_date,
          description: vals.description,
        },
      } as any)
    }
    navigate(-1)
  }

  const loading =
    (mode === "add" && addStatus === "LOADING") ||
    (mode === "update" && (updateStatus === "LOADING" || detailStatus === "LOADING"))
  const error = mode === "add" ? addError : updateError || detailError

  return (
    <ReusableModalForm<RefundFormValues>
      show={true}
      title={mode === "add" ? "İade Ekle" : "İade Güncelle"}
      fields={getFields}         // <--- function
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
      cancelButtonLabel="İptal"
      isLoading={loading}
      error={error || null}
      onClose={() => navigate(-1)}
      autoGoBackOnModalClose
      mode="single"
    />
  )
}
