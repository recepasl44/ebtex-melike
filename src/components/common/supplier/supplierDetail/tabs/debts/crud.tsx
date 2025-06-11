import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm"
import { useSupplierDebtsDetail } from "../../../../../hooks/supplierDebts/useDetail"
import { useSupplierDebtsAdd } from "../../../../../hooks/supplierDebts/useAdd"
import { useSupplierDebtsUpdate } from "../../../../../hooks/supplierDebts/useUpdate"

// import the categories list hook
import { useCategoriesList } from "../../../../../hooks/expences/expenseCategories/useCategoriesList"
import { useSeasonsList } from "../../../../../hooks/season/useSeasonsList"
import { usePaymentMethodsList } from "../../../../../hooks/paymentMethods/useList"

interface DebtFormValues {
  due_date: string
  amount: string
  description?: string
  expense_category_id?: number | null
  payment_method_id?: number | null
  seasson_id?: number | null
}

export default function SupplierDebtCrud() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id?: string }>()
  const mode = id ? "update" : "add"

  // supplierId from location.state
  const { supplierId } = (location.state as { supplierId?: number }) || {}

  const { supplierDebt, error: detailError, getSupplierDebt, status: detailStatus } =
    useSupplierDebtsDetail()
  const { addNewSupplierDebt, error: addError, status: addStatus } =
    useSupplierDebtsAdd()
  const { updateExistingSupplierDebt, error: updateError, status: updateStatus } =
    useSupplierDebtsUpdate()

  // expense categories hook
  const { categoriesData } = useCategoriesList({ enabled: true })
  const { seasonsData } = useSeasonsList({ enabled: true, page: 1, paginate: 999 })
  const { paymentMethodsData } = usePaymentMethodsList({ enabled: true })

  const [initialValues, setInitialValues] = useState<DebtFormValues>({
    due_date: "",
    amount: "",
    description: "",
    expense_category_id: null,
    payment_method_id: null,
    seasson_id: null,
  })

  // 1) get detail if update
  useEffect(() => {
    if (mode === "update" && id && supplierId) {
      getSupplierDebt({ supplierId, supplierDebtId: +id })
    }
  }, [mode, id, supplierId, getSupplierDebt])

  // 2) detail response -> initialValues
  useEffect(() => {
    if (mode === "update" && supplierDebt) {
      setInitialValues({
        due_date: supplierDebt.due_date || "",
        amount: supplierDebt.amount || "",
        description: supplierDebt.description || "",
        expense_category_id: supplierDebt.expense_category_id || null,
        payment_method_id: supplierDebt.payment_method_id || null,
        seasson_id: supplierDebt.seasson_id || null,
      })
    }
  }, [mode, supplierDebt])

  // 3) build fields
  //    Not: expense_category_id => "Gider Kalemi" select
  const categoriesOptions = categoriesData.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }))
  const seasonsOptions = seasonsData.map((s) => ({ label: s.name, value: s.id }))
  const paymentMethodOptions = paymentMethodsData.map((pm) => ({ label: pm.name, value: pm.id }))

  const fields: FieldDefinition[] = [
    {
      name: "due_date",
      label: "Vade Tarihi",
      type: "date",
      required: true,
    },
    {
      name: "amount",
      label: "Tutar",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Açıklama",
      type: "textarea",
    },
    {
      name: "expense_category_id",
      label: "Gider Kalemi",
      type: "select",
      options: categoriesOptions,
      required: false,
    },
    {
      name: "payment_method_id",
      label: "Ödeme Şekli",
      type: "select",
      options: paymentMethodOptions,
      required: false,
    },
    {
      name: "seasson_id",
      label: "Sezon",
      type: "select",
      options: seasonsOptions,
      required: false,
    },
  ]

  // 4) onSubmit
  async function handleSubmit(values: DebtFormValues) {
    try {
      if (!supplierId) {
        alert("supplierId yok")
        return
      }
      if (mode === "add") {
        await addNewSupplierDebt({
          supplier_id: supplierId,
          amount: values.amount,
          due_date: values.due_date,
          description: values.description,
          expense_category_id: values.expense_category_id,
          payment_method_id: values.payment_method_id,
          seasson_id: values.seasson_id,
        } as any)
      } else {
        if (!id) return
        await updateExistingSupplierDebt({
          supplierId,
          debtId: Number(id),
          payload: {
            amount: values.amount,
            due_date: values.due_date,
            description: values.description,
            expense_category_id: values.expense_category_id,
            payment_method_id: values.payment_method_id,
            seasson_id: values.seasson_id,
          },
        } as any)
      }
      navigate(-1)
    } catch (err) {
      console.error(err)
    }
  }

  const loading =
    (mode === "add" && addStatus === "LOADING") ||
    (mode === "update" && (updateStatus === "LOADING" || detailStatus === "LOADING"))

  const error = mode === "add" ? addError : updateError || detailError

  return (
    <ReusableModalForm<DebtFormValues>
      show={true}
      title={mode === "add" ? "Ekle" : "Güncelle"}
      fields={fields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Kaydet"}
      cancelButtonLabel="Vazgeç"
      isLoading={loading}
      error={error || null}
      onClose={() => navigate(-1)}
      autoGoBackOnModalClose={true}
      mode="double"
    />
  )
}
