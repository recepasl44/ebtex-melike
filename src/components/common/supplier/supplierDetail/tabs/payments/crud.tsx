import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm"
import { useSupplierPaymentsDetail } from "../../../../../hooks/supplierPayments/useDetail"
import { useSupplierPaymentsAdd } from "../../../../../hooks/supplierPayments/useAdd"
import { useSupplierPaymentsUpdate } from "../../../../../hooks/supplierPayments/useUpdate"

interface PaymentFormValues {
  payment_date: string
  description?: string
  is_paid: boolean
  due_date?: string
  pdf_file?: File | null
  amount: string
}

export default function SupplierPaymentCrud() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id?: string }>()
  const mode = id ? "update" : "add"

  const { supplierId } = (location.state as { supplierId?: number }) || {}

  const {
    supplierPayment,
    error: detailError,
    status: detailStatus,
    getSupplierPayment,
  } = useSupplierPaymentsDetail()
  const { addNewSupplierPayment, error: addError, status: addStatus } =
    useSupplierPaymentsAdd()
  const { updateExistingSupplierPayment, error: updateError, status: updateStatus } =
    useSupplierPaymentsUpdate()

  const [initialValues, setInitialValues] = useState<PaymentFormValues>({
    payment_date: "",
    description: "",
    is_paid: true,
    due_date: "",
    pdf_file: undefined,
    amount: "",
  })

  useEffect(() => {
    if (mode === "update" && id && supplierId) {
      getSupplierPayment({ supplierId, supplierPaymentId: +id })
    }
  }, [mode, id, supplierId, getSupplierPayment])

  useEffect(() => {
    if (mode === "update" && supplierPayment) {
      setInitialValues({
        payment_date: supplierPayment.payment_date || "",
        description: supplierPayment.description || "",
        is_paid: supplierPayment.is_paid ? true : false,
        due_date: supplierPayment.due_date || "",
        pdf_file: undefined,
        amount: supplierPayment.amount || "",
      })
    }
  }, [mode, supplierPayment])

  // 1) Dinamik field fonksiyonu
  function getFields(values: PaymentFormValues): FieldDefinition[] {
    const baseFields: FieldDefinition[] = [
      {
        name: "payment_date",
        label: "Tarih",
        type: "date",
        required: true,
      },
      {
        name: "is_paid",
        label: "Ödeme Yapıldı",
        type: "checkbox",
        required: false,
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

    if (!values.is_paid) {
      baseFields.splice(2, 0, {
        name: "due_date",
        label: "Vade Tarihi",
        type: "date",
        required: true,
      })
    } else {

      baseFields.splice(2, 0, {
        name: "pdf_file",
        label: "Dekont/PDF",
        type: "file",
      })
    }

    return baseFields
  }

  async function handleSubmit(vals: PaymentFormValues) {
    if (!supplierId) {
      alert("supplierId yok")
      return
    }

    if (mode === "add") {
      await addNewSupplierPayment({
        supplier_id: supplierId,
        amount: vals.amount,
        payment_date: vals.payment_date,
        description: vals.description,
        is_paid: vals.is_paid ? 1 : 0,
        due_date: vals.is_paid ? null : vals.due_date,
        pdf_file: vals.is_paid ? vals.pdf_file : null,
      } as any)
    } else {
      if (!id) return
      await updateExistingSupplierPayment({
        supplierId,
        supplierPaymentId: Number(id),
        payload: {
          amount: vals.amount,
          payment_date: vals.payment_date,
          description: vals.description,
          is_paid: vals.is_paid ? 1 : 0,
          due_date: vals.is_paid ? null : vals.due_date,
          pdf_file: vals.is_paid ? vals.pdf_file : null,
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
    <ReusableModalForm<PaymentFormValues>
      show={true}
      title={mode === "add" ? "Ödeme Ekle" : "Ödeme Güncelle"}
      fields={getFields} // <-- function
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
      cancelButtonLabel="İptal"
      isLoading={loading}
      error={error || null}
      onClose={() => navigate(-1)}
      autoGoBackOnModalClose
      mode="double"
    />
  )
}
