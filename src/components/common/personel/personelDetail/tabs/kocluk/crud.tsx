
import { useEffect, useState, useMemo } from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm"
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable"
import { useCoachingList } from "../../../../../hooks/employee/coaching/useList"
import { useCoachingShow } from "../../../../../hooks/employee/coaching/useShow"
import { useCoachingAdd } from "../../../../../hooks/employee/coaching/useAdd"
import { useCoachingUpdate } from "../../../../../hooks/employee/coaching/useUpdate"
import { useCoachingDelete } from "../../../../../hooks/employee/coaching/useDelete"
import { Modal, Button } from "react-bootstrap"
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
    state?: { personelId?: number; selectedCoaching?: Coaching; instructorName?: string }
  }
  const personelId = state?.personelId
  const instructorName = state?.instructorName
  const selectedCoaching = state?.selectedCoaching

  const { coaching, getCoaching, error: detailError } = useCoachingShow()
  const { addNewCoaching, error: addError } = useCoachingAdd()
  const { updateExistingCoaching, error: updateError } = useCoachingUpdate()
  const { deleteExistingCoaching } = useCoachingDelete()

  const { coachings, loading: listLoading, error: listError } = useCoachingList({
    enabled: !id && !!personelId,
    personel_id: personelId,
    instructor_name: instructorName,
  })

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
        tarih:           src.tarih,
        baslangic_saati: (src as any).baslangic_saati || "",
        bitis_saati:     (src as any).bitis_saati     || "",
        ad_soyad:        src.ad_soyad                  || "",
        kisi_basi_ucret: src.kisi_basi_ucreti?.toString() || "",
        ogrenci_sayisi:  src.ogrenci_sayisi            || "",
        kar_yuzdesi:     parseFloat(src.kar_yuzdesi)   || "",
      })
    }
  }, [mode, coaching, selectedCoaching])

  // Form alanları
  const getFields = (): FieldDefinition[] => [
    { name: "tarih",            label: "Tarih",             type: "date",     required: true },
    { name: "baslangic_saati",  label: "Başlangıç Saati",   type: "time",     required: true },
    { name: "bitis_saati",      label: "Bitiş Saati",        type: "time",     required: true },
    { name: "ad_soyad",         label: "Ad Soyad",           type: "text",     required: true },
    { name: "kisi_basi_ucret",  label: "Kişi Başı Ücret",    type: "currency", required: true },
    { name: "ogrenci_sayisi",   label: "Öğrenci Sayısı",     type: "number",   required: true },
    { name: "kar_yuzdesi",      label: "Kar Yüzdesi",        type: "number",   required: true },
  ]

  // Kaydet / Güncelle işlemi
  async function handleSubmit(vals: FormValues) {
    if (!personelId) return

    const kb      = Number(vals.kisi_basi_ucret)
    const os      = Number(vals.ogrenci_sayisi)
    const toplam  = kb * os

    const payload = {
      personel_id:      personelId,
      tarih:            vals.tarih,
      baslangic_saati:  vals.baslangic_saati,
      bitis_saati:      vals.bitis_saati,
      ad_soyad:         vals.ad_soyad,
      kisi_basi_ucret:  kb,
      ogrenci_sayisi:   os,
      ucret:            kb,
      toplam_ucret:     toplam,
      kar_yuzdesi:      Number(vals.kar_yuzdesi),
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
  const error     = detailError || addError || updateError

  if (mode === "add" || mode === "update") {
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

  const columns: ColumnDefinition<Coaching>[] = useMemo(
    () => [
      { key: "tarih", label: "Tarih", render: r => r.tarih || "-" },
      {
        key: "ad_soyad",
        label: "Öğrenci Adı Soyadı",
        render: r => r.ad_soyad || "-",
      },
      {
        key: "saat",
        label: "Başlangıç- Bitiş",
        render: r => `${(r as any).baslangic_saati || ""} - ${(r as any).bitis_saati || ""}`,
      },
      {
        key: "kisi_basi_ucreti",
        label: "Seans Ücreti (₺)",
        render: r => `${Number(r.kisi_basi_ucreti || 0).toLocaleString()} ₺`,
      },
      {
        key: "actions",
        label: "İşlemler",
        render: row => (
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={() =>
                navigate(`/personelCoachingCrud/${row.id}`, { state: { personelId, instructorName } })
              }
            >
              <i className="ti ti-pencil" />
            </Button>{" "}
            <Button
              size="sm"
              variant="danger"
              onClick={() => row.id && deleteExistingCoaching(row.id)}
            >
              <i className="ti ti-trash" />
            </Button>
          </>
        ),
      },
    ],
    [navigate, personelId, instructorName, deleteExistingCoaching]
  )

  const total = useMemo(
    () => coachings.reduce((sum, c) => sum + Number(c.kisi_basi_ucreti || 0), 0),
    [coachings]
  )

  return (
    <Modal show onHide={() => navigate(-1)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Koçluk Detayları</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReusableTable<Coaching>
          columns={columns}
          data={coachings}
          loading={listLoading}
          error={listError}
          currentPage={1}
          totalPages={1}
          totalItems={coachings.length}
          pageSize={coachings.length}
          onPageChange={() => {}}
          onPageSizeChange={() => {}}
          exportFileName="kocluk_detay"
          customFooter={
            <div className="text-end fw-bold p-2">
              Toplam: {total.toLocaleString()} ₺
            </div>
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => navigate("/personelCoachingCrud", { state: { personelId, instructorName } })}
        >
          Ekle
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
