import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm"
import { useSupplierNotesDetail } from "../../../../../hooks/supplierNotes/useDetail"
import { useSupplierNotesAdd } from "../../../../../hooks/supplierNotes/useAdd"
import { useSupplierNotesUpdate } from "../../../../../hooks/supplierNotes/useUpdate"

interface NoteFormValues {
  note: string
}

export default function SupplierNoteCrud() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id?: string }>()
  const mode = id ? "update" : "add"

  const { supplierId } = (location.state as { supplierId?: number }) || {}

  const {
    supplierNote,
    error: detailError,
    status: detailStatus,
    getSupplierNote,
  } = useSupplierNotesDetail()
  const { addNewSupplierNote, error: addError, status: addStatus } =
    useSupplierNotesAdd()
  const { updateExistingSupplierNote, error: updateError, status: updateStatus } =
    useSupplierNotesUpdate()

  const [initialValues, setInitialValues] = useState<NoteFormValues>({
    note: "",
  })

  // get detail if update
  useEffect(() => {
    if (mode === "update" && id && supplierId) {
      getSupplierNote({ supplierId, supplierNoteId: +id })
    }
  }, [mode, id, supplierId, getSupplierNote])

  useEffect(() => {
    if (mode === "update" && supplierNote) {
      setInitialValues({
        note: supplierNote.note || "",
      })
    }
  }, [mode, supplierNote])

  const fields: FieldDefinition[] = [
    {
      name: "note",
      label: "Not",
      type: "textarea",
      required: true,
    },
  ]

  async function handleSubmit(values: NoteFormValues) {
    if (!supplierId) {
      alert("supplierId yok")
      return
    }

    if (mode === "add") {
      await addNewSupplierNote({
        supplier_id: supplierId,
        note: values.note,
      } as any)
    } else {
      if (!id) return
      await updateExistingSupplierNote({
        supplierId,
        noteId: Number(id),
        payload: {
          note: values.note,
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
    <ReusableModalForm<NoteFormValues>
      show={true}
      title={mode === "add" ? "Not Ekle" : "Not Güncelle"}
      fields={fields}
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
