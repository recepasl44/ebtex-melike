import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm"
import { useSpecialTutorLessonShow } from "../../../../../hooks/employee/special_tutor_lesson/useSpecialTutorLessonShow"
import { useSpecialTutorLessonAdd } from "../../../../../hooks/employee/special_tutor_lesson/useSpecialTutorLessonAdd"
import { useSpecialTutorLessonUpdate } from "../../../../../hooks/employee/special_tutor_lesson/useSpecialTutorLessonUpdate"
import { SpecialTutorLesson } from "../../../../../../types/employee/special_tutor_lesson/list"

type FormValues = {
  tarih: string
  baslangic_saat: string
  bitis_saat: string
  ogrenci: string | number;
  ucret: number
  kar_yuzde: string
}

export default function PersonelSpecialCrud() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const mode = id ? "update" : "add"

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedLesson?: SpecialTutorLesson }
  }
  const personelId = state?.personelId
  const selected = state?.selectedLesson

  const {
    specialTutorLesson,
    getSpecialTutorLesson,
    loading: detailLoading,
    error: detailError,
  } = useSpecialTutorLessonShow()
  const {
    addNewSpecialTutorLesson,
    loading: addLoading,
    error: addError,
  } = useSpecialTutorLessonAdd()
  const {
    updateExistingSpecialTutorLesson,
    loading: updateLoading,
    error: updateError,
  } = useSpecialTutorLessonUpdate()

  const [initialValues, setInitialValues] = useState<FormValues>({
    tarih: "",
    baslangic_saat: "",
    bitis_saat: "",
    ogrenci: "",
    ucret: 0,
    kar_yuzde: "",
  })

  useEffect(() => {
    if (mode === "update" && id) getSpecialTutorLesson(+id)
  }, [mode, id])

  useEffect(() => {
    const src = selected || specialTutorLesson!
    if ((mode === "update") && src) {
      setInitialValues({
        tarih: src.tarih || "",
        baslangic_saat: src.baslangic_saati || "",
        bitis_saat: src.bitis_saati || "",
        ogrenci: src.ogrenci_yuzdesi ||"",
        ucret: src.ucret || 0,
        kar_yuzde: src.kar_yuzdesi?.toString() ?? "0",
      })
    }
  }, [mode, selected, specialTutorLesson])

  const getFields = (): FieldDefinition[] => [
    { name: "tarih", label: "Tarih", type: "date", required: true },
    { name: "baslangic_saat", label: "Başlangıç Saati", type: "time", required: true },
    { name: "bitis_saat", label: "Bitiş Saati", type: "time", required: true },
    { name: "ogrenci", label: "Ad Soyad (Öğrenci)", type: "text", required: true },
    { name: "ucret", label: "Ücret", type: "currency", required: true },
    { name: "kar_yuzde", label: "Kar Yüzdesi", type: "number", required: true },
  ]

  async function handleSubmit(vals: FormValues) {
    if (!personelId) return
    const payload = {
      personel_id: personelId,
      tarih: vals.tarih,
      baslangic_saati: vals.baslangic_saat,
      bitis_saati: vals.bitis_saat,
      ad_soyad: vals.ogrenci,
      ucret: vals.ucret,
      kar_yuzdesi: Number(vals.kar_yuzde),
    }
    if (mode === "add") {
      await addNewSpecialTutorLesson(payload as any)
    } else if (id) {
      await updateExistingSpecialTutorLesson({
        specialTutorLessonId: +id,
        payload,
      } as any)
    }
    navigate(-1)
  }

  const isLoading = addLoading || updateLoading || detailLoading
  const error = addError || updateError || detailError

  return (
    <ReusableModalForm<FormValues>
      show
      title={mode === "add" ? "Özel Ders Ekle" : "Özel Ders Güncelle"}
      fields={getFields()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
      cancelButtonLabel="İptal"
      isLoading={isLoading}
      error={error || null}
      onClose={() => navigate(-1)}
      autoGoBackOnModalClose
      mode="double"
    />
  )
}
