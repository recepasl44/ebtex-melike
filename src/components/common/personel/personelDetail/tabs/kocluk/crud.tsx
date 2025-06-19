
import { useEffect, useState } from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm"
import { useCoachingShow } from "../../../../../hooks/employee/coaching/useShow"
import { useCoachingAdd } from "../../../../../hooks/employee/coaching/useAdd"
import { useCoachingUpdate } from "../../../../../hooks/employee/coaching/useUpdate"
import { Coaching } from "../../../../../../types/employee/coaching/list"

type FormValues = {
  tarih: string
  baslangic_saati: string
  bitis_saati: string
  ad_soyad: string
  kisi_basi_ucret: string
  ogrenci_sayisi: number | ""
  kar_yuzdesi: number | ""
}

export default function PersonelCoachingCrud() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const mode = Boolean(id) ? "update" : "add"

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedCoaching?: Coaching }
  }
  const personelId = state?.personelId
  const selectedCoaching = state?.selectedCoaching

  const { coaching, getCoaching, error: detailError } = useCoachingShow()
  const { addNewCoaching, error: addError } = useCoachingAdd()
  const { updateExistingCoaching, error: updateError } = useCoachingUpdate()

  const [initialValues, setInitialValues] = useState<FormValues>({
    tarih: "",
    baslangic_saati: "",
    bitis_saati: "",
    ad_soyad: "",
    kisi_basi_ucret: "",
    ogrenci_sayisi: "",
    kar_yuzdesi: "",
  })

  // Düzenleme modunda var olan kaydı çek
  useEffect(() => {
    if (mode === "update" && id) {
      getCoaching(Number(id))
    }
  }, [mode, id, getCoaching])

  // Çekilen veriyi initialValues’a yaz
  useEffect(() => {
    const src = mode === "update" ? coaching || selectedCoaching : null
    if (src) {
      setInitialValues({
        tarih: src.tarih,
        baslangic_saati: (src as any).baslangic_saati || "",
        bitis_saati: (src as any).bitis_saati || "",
        ad_soyad: src.ad_soyad || "",
        kisi_basi_ucret: src.kisi_basi_ucreti?.toString() || "",
        ogrenci_sayisi: src.ogrenci_sayisi || "",
        kar_yuzdesi: parseFloat(src.kar_yuzdesi) || "",
      })
    }
  }, [mode, coaching, selectedCoaching])

  // Form alanları
  const getFields = (): FieldDefinition[] => [
    { name: "tarih", label: "Tarih", type: "date", required: true },
    { name: "baslangic_saati", label: "Başlangıç Saati", type: "time", required: true },
    { name: "bitis_saati", label: "Bitiş Saati", type: "time", required: true },
    { name: "ad_soyad", label: "Ad Soyad", type: "text", required: true },
    { name: "kisi_basi_ucret", label: "Kişi Başı Ücret", type: "currency", required: true },
    { name: "ogrenci_sayisi", label: "Öğrenci Sayısı", type: "number", required: true },
    { name: "kar_yuzdesi", label: "Kar Yüzdesi", type: "number", required: true },
  ]

  // Kaydet / Güncelle işlemi
  async function handleSubmit(vals: FormValues) {
    if (!personelId) return

    const kb = Number(vals.kisi_basi_ucret)
    const os = Number(vals.ogrenci_sayisi)
    const toplam = kb * os

    const payload = {
      personel_id: personelId,
      tarih: vals.tarih,
      baslangic_saati: vals.baslangic_saati,
      bitis_saati: vals.bitis_saati,
      ad_soyad: vals.ad_soyad,
      kisi_basi_ucret: kb,
      ogrenci_sayisi: os,
      ucret: kb,
      toplam_ucret: toplam,
      kar_yuzdesi: Number(vals.kar_yuzdesi),
    }

    if (mode === "add") {
      await addNewCoaching(payload)
    } else {
      await updateExistingCoaching({
        coachingId: Number(id),
        payload,
      })
    }
    navigate(-1)
  }

  const isLoading = !!detailError
  const error = detailError || addError || updateError

  return (
    <ReusableModalForm<FormValues>
      show
      title={mode === "add" ? "Koçluk Ekle" : "Koçluk Güncelle"}
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
