import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm"
import { useSupplierPaymentsDetail } from "../../../../../hooks/supplierPayments/useDetail"
import { useSupplierPaymentsAdd } from "../../../../../hooks/supplierPayments/useAdd"
import { useSupplierPaymentsUpdate } from "../../../../../hooks/supplierPayments/useUpdate"
import { useSeasonsList } from "../../../../../hooks/season/useSeasonsList"
import { usePaymentMethodsList } from "../../../../../hooks/paymentMethods/useList"

interface PaymentFormValues {
  payment_date: string
  description?: string
  is_paid: boolean
  due_date?: string
  pdf_file?: File | null
  amount: string
  season_id?: number | null
  payment_method_id?: number | null
  receipt_no?: string
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
  const { seasonsData } = useSeasonsList({ enabled: true, page: 1, paginate: 999 })
  const { paymentMethodsData } = usePaymentMethodsList({ enabled: true })

  const [initialValues, setInitialValues] = useState<PaymentFormValues>({
    payment_date: "",
    description: "",
    is_paid: true,
    due_date: "",
    pdf_file: undefined,
    amount: "",
    season_id: null,
    payment_method_id: null,
    receipt_no: "Otomatik",
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
        season_id: supplierPayment.season_id || null,
        payment_method_id: supplierPayment.payment_method_id || null,
        receipt_no: String(supplierPayment.id || ""),
      })
    }
  }, [mode, supplierPayment])

  // 1) Dinamik field fonksiyonu
  function getFields(values: PaymentFormValues): FieldDefinition[] {
    const seasonsOptions = seasonsData.map((s) => ({ label: s.name, value: s.id }))
    const paymentMethodOptions = paymentMethodsData.map((pm) => ({ label: pm.name, value: pm.id }))

    const baseFields: FieldDefinition[] = [
      {
        name: "season_id",
        label: "Sezon",
        type: "select",
        options: seasonsOptions,
      },
      {
        name: "payment_method_id",
        label: "Ödeme Şekli",
        type: "select",
        options: paymentMethodOptions,
      },
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
        label: "Ödenen Tutar",
        type: "currency",
        required: true,
      },
      {
        name: "description",
        label: "Açıklama",
        type: "textarea",
      },
      {
        name: "receipt_no",
        label: "Makbuz No",
        renderForm: () => (
          <input
            type="text"
            className="form-control"
            value={mode === "update" ? String(supplierPayment?.id || "") : "Otomatik"}
            readOnly
          />
        ),
      },
    ]

    if (!values.is_paid) {
      baseFields.splice(4, 0, {
        name: "due_date",
        label: "Vade Tarihi",
        type: "date",
        required: true,
      })
    } else {
      baseFields.splice(4, 0, {
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
        season_id: vals.season_id ?? null,
        payment_method_id: vals.payment_method_id ?? null,
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
          season_id: vals.season_id ?? null,
          payment_method_id: vals.payment_method_id ?? null,
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
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={loading}
      error={error || null}
      onClose={() => navigate(-1)}
      autoGoBackOnModalClose
      mode="double"
    />
  )
}
