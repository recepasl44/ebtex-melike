
import { useEffect, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm"
import { useSupplierInvoicesDetail } from "../../../../../hooks/supplierInvoices/useDetail"
import { useSupplierInvoicesAdd } from "../../../../../hooks/supplierInvoices/useAdd"
import { useSupplierInvoicesUpdate } from "../../../../../hooks/supplierInvoices/useUpdate"
import { useNextSerial } from "../../../../../hooks/supplierInvoices/useNextSerial"
import { useCategoriesList } from "../../../../../hooks/expences/expenseCategories/useCategoriesList"


interface InvoiceFormValues {
  fis_seri_no: string
  invoice_type_code: string
  issue_date: string
  expense_category_id: number | null
  payable_amount: string
  description?: string
  pdf_file?: File | null
  removeOldPdf?: boolean
}

export default function InvoiceCrudPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id?: string }>()
  const mode = id ? "update" : "add"

  // location.state içinden supplierId’yi alıyoruz (table.tsx’ten navigate ile gelmiş)
  const { supplierId } = (location.state as { supplierId?: number }) || {}

  // Hook'lar
  const { supplierInvoice, getSupplierInvoice, status: detailStatus, error: detailError } =
    useSupplierInvoicesDetail()
  const { addNewSupplierInvoice, status: addStatus, error: addError } = useSupplierInvoicesAdd()
  const { updateExistingSupplierInvoice, status: updateStatus, error: updateError } =
    useSupplierInvoicesUpdate()
  const { serialNo, fetchNextSerial } = useNextSerial()
  const { categoriesData } = useCategoriesList({ enabled: true })

  const [initialValues, setInitialValues] = useState<InvoiceFormValues>({
    fis_seri_no: "",
    invoice_type_code: "Satış",
    issue_date: "",
    expense_category_id: null,
    payable_amount: "",
    description: "",
    pdf_file: null,
    removeOldPdf: false,
  })

  useEffect(() => {
    if (mode === "update" && id && supplierId) {
      getSupplierInvoice({
        supplierId,
        supplierInvoiceId: Number(id),
      })
    }
  }, [mode, id, supplierId, getSupplierInvoice])

  useEffect(() => {
    if (mode === "update" && supplierInvoice) {
      setInitialValues({
        fis_seri_no: supplierInvoice.fis_seri_no || "",
        invoice_type_code: supplierInvoice.invoice_type_code || "Satış",
        issue_date: supplierInvoice.issue_date || "",
        expense_category_id: supplierInvoice.expense_category_id || null,
        payable_amount: supplierInvoice.payable_amount || "",
        description: supplierInvoice.description || "",
        pdf_file: null,
        removeOldPdf: false,
      })
    }
  }, [mode, supplierInvoice])

  useEffect(() => {
    if (mode === "add") {
      fetchNextSerial()
    }
  }, [mode, fetchNextSerial])

  useEffect(() => {
    if (mode === "add" && serialNo) {
      setInitialValues((prev) => ({ ...prev, fis_seri_no: serialNo }))
    }
  }, [mode, serialNo])


  const categoryOptions = categoriesData.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }))

 const getFields = (_values: InvoiceFormValues): FieldDefinition[] => {
    const baseFields: FieldDefinition[] = [
      {
      name: "fis_seri_no",
      label: "Fiş Seri No",
      type: "text",
      required: true,
 
    },
    {
      name: "invoice_type_code",
      label: "Fatura Tipi",
      type: "select",
      required: true,
      options: [
        { label: "Satış", value: "Satış" },
        { label: "Alış", value: "Alış" },
      ],
    },
    {
      name: "issue_date",
      label: "Fiş Tarihi",
      type: "date",
      required: true,
    },
    {
      name: "expense_category_id",
      label: "Gider Kalemi",
      type: "select",
      options: categoryOptions,
      required: false,
    },
    {
      name: "payable_amount",
      label: "Miktar",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Açıklama",
      type: "textarea",
      required: false,
    },
    // Sadece update modunda removeOldPdf checkbox
    ...(mode === "update"
      ? [
          {
            name: "removeOldPdf",
            label: "Mevcut PDF’yi Sil",
            type: "checkbox",
          } as FieldDefinition,
        ]
      : []),
    {
      name: "pdf_file",
      label: "PDF Dosyası",
      type: "file",
      required: false,
    },
  ]

  return baseFields;
};

  // 2) onSubmit
  async function handleSubmit(values: InvoiceFormValues) {
    try {
      if (!supplierId) {
        alert("supplierId yok veya location.state içinde gelmedi.")
        return
      }

   
      const formData = new FormData()
      formData.append("fis_seri_no", values.fis_seri_no)
      formData.append("invoice_type_code", values.invoice_type_code)
      formData.append("issue_date", values.issue_date)
      if (values.expense_category_id) {
        formData.append("expense_category_id", String(values.expense_category_id))
      }
      formData.append("payable_amount", values.payable_amount)
      if (values.description) {
        formData.append("description", values.description)
      }
      if (values.pdf_file) {
        formData.append("pdf_file", values.pdf_file)
      }
      if (values.removeOldPdf) {
        formData.append("removeOldPdf", "1")
      }

      if (mode === "add") {
        await addNewSupplierInvoice({
          supplier_id: supplierId,
          ...values,
        } as any)
      } else {
        // update
        if (!id) return
        await updateExistingSupplierInvoice({
          supplierId,
          supplierInvoiceId: Number(id),
          payload: formData,
        } as any)
      }

      navigate(-1)
    } catch (err) {
      console.error(err)
    }
  }

  // 3) loading & error
  const loading =
    (mode === "add" && addStatus === "LOADING") ||
    (mode === "update" && (updateStatus === "LOADING" || detailStatus === "LOADING"))
  const error =
    mode === "add"
      ? addError
      : mode === "update"
      ? updateError || detailError
      : null

  return (
    <ReusableModalForm<InvoiceFormValues>
      show={true}
      title={mode === "add" ? "Yeni Fatura Ekle" : "Fatura Güncelle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={loading}
      error={error || null}
      onClose={() => navigate(-1)}
      autoGoBackOnModalClose={true}
      mode="single" // or "double" 
    />
  )
}
