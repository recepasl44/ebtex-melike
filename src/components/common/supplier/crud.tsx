import { FormikHelpers, FormikValues } from "formik"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm"
import { useSupplierAdd } from "../../hooks/suppliers/useSuppliersAdd"      // varsayım
import { useSupplierUpdate } from "../../hooks/suppliers/useUpdate"
import { useSupplierShow } from "../../hooks/suppliers/useSuppliersShow"

interface SupplierModalProps {
  show: boolean
  onClose: () => void
  onRefresh: () => void
}

interface ISupplierForm extends FormikValues {
  register_no: string
  name: string
  mail?: string
  phone?: string
  address?: string
  fax?: string
  iban?: string
  taxNumber?: string
  taxOffice?: string
  status?: number
}

const SupplierModal: React.FC<SupplierModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>()
  const mode = id ? "update" : "add"

  // add / update hook’ları
  const { addNewSupplier, status: addStatus, error: addError } = useSupplierAdd()
  const { updateExistingSupplier, status: updateStatus, error: updateError } = useSupplierUpdate()

  // show (detay) hook’u
  const { supplier: fetchedSupplier, status: showStatus, error: showError, getSupplier } = useSupplierShow()

  // Formik başlangıç değerleri
  const [initialValues, setInitialValues] = useState<ISupplierForm>({
    register_no: "",
    name: "",
    mail: "",
    phone: "",
    address: "",
    fax: "",
    iban: "",
    taxNumber: "",
    taxOffice: "",
    status: 1,
  })

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "register_no",
        label: "Kayıt No",
        type: "number",
        required: true,
      },
      {
        name: "name",
        label: "Firma Adı",
        type: "text",
        required: true,
      },
      {
        name: "mail",
        label: "E-Posta",
        type: "email",
      },
      {
        name: "phone",
        label: "Telefon",
        type: "phone",
      },
      {
        name: "address",
        label: "Adres",
        type: "textarea",
      },
      {
        name: "fax",
        label: "Faks",
        type: "text",
      },
      {
        name: "iban",
        label: "IBAN",
        type: "iban",
      },
      {
        name: "taxNumber",
        label: "Vergi No",
        type: "text",
      },
      {
        name: "taxOffice",
        label: "Vergi Dairesi",
        type: "text",
      },
      {
        name: "status",
        label: "Durum",
        type: "select",
        options: [
          { value: 1, label: "Aktif" },
          { value: 0, label: "Pasif" },
        ],
      },
    ]
  }

  // Eğer "update" modundaysak, varolan Supplier’ı getirelim
  useEffect(() => {
    if (mode === "update" && id) {
      getSupplier(id) // useSupplierShow içindeki thunk/işlem
    }
  }, [mode, id, getSupplier])

  // fetchedSupplier geldiğinde initialValues setle
  useEffect(() => {
    if (mode === "update" && fetchedSupplier) {
      setInitialValues({
        register_no: fetchedSupplier.register_no || "",
        name: fetchedSupplier.name || "",
        mail: fetchedSupplier.mail || "",
        phone: fetchedSupplier.phone || "",
        address: fetchedSupplier.address || "",
        fax: fetchedSupplier.fax || "",
        iban: fetchedSupplier.iban || "",
        taxNumber: fetchedSupplier.taxNumber || "",
        taxOffice: fetchedSupplier.taxOffice || "",
        status: fetchedSupplier.status ?? 1,
      })
    }
  }, [mode, fetchedSupplier])

  // Loading & error
  const loading =
    mode === "add"
      ? addStatus === "LOADING"
      : updateStatus === "LOADING" || showStatus === "LOADING"

  const error =
    mode === "add"
      ? addError
      : mode === "update"
        ? updateError || showError
        : null

  // Form submit
  async function handleSubmit(values: ISupplierForm, _helpers: FormikHelpers<ISupplierForm>) {
    try {
      if (mode === "add") {
        await addNewSupplier(values) // backend e post
      } else if (mode === "update" && id) {
        await updateExistingSupplier({
          supplierId: Number(id),
          payload: values,
        })
      }
      onRefresh()
      onClose()
    } catch (err) {
      console.error("SupplierModal handleSubmit error:", err)
    }
  }

  return (
    <ReusableModalForm
      show={show}
      title={mode === "add" ? "Tedarikçi Ekle" : "Tedarikçi Güncelle"}
      fields={getFields()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={loading}
      error={error || null}
      autoGoBackOnModalClose={true}
      onClose={onClose}
    />
  )
}

export default SupplierModal
