
import { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable"
import { useCoachingShow } from "../../../../../hooks/employee/coaching/useShow"
import { useCoachingDelete } from "../../../../../hooks/employee/coaching/useDelete"
import { Coaching } from "../../../../../../types/employee/coaching/list"

interface CoachingTabProps {
  personelId: number
  enabled: boolean
}

export default function CoachingTab({ personelId, enabled }: CoachingTabProps) {
  const navigate = useNavigate()
  const [data, setData] = useState<Coaching[]>([])

  const {
    coaching: _singleCoaching,
    getCoaching,
    error: detailError,
  } = useCoachingShow()
  const { deleteExistingCoaching, error: deleteError } = useCoachingDelete()

  // when enabled, fetch this person's coachings
  useEffect(() => {
    if (!enabled) return
    ;(async () => {
      const res = await getCoaching(personelId)
      // show endpoint returns array under `.data` or as array directly
      const arr = Array.isArray(res) ? res : res ? [res] : []
      setData(arr)
    })()
  }, [enabled, personelId, getCoaching])

  const columns: ColumnDefinition<Coaching>[] = useMemo(
    () => [
      {
        key: "tarih",
        label: "Tarih",
        render: row => row.tarih || "-",
      },
      {
        key: "kisi_basi_ucreti",
        label: "Kişi Başı",
        render: row =>
          row.kisi_basi_ucreti
            ? `${Number(row.kisi_basi_ucreti).toLocaleString()} ₺`
            : "0,00 ₺",
      },
      {
        key: "ogrenci_sayisi",
        label: "Öğrenci Sayısı",
        render: row => row.ogrenci_sayisi?.toString() ?? "0",
      },
      {
        key: "toplam_ucret",
        label: "Toplam",
        render: (row: { toplam_ucret: any }) =>
          row.toplam_ucret
            ? `${Number(row.toplam_ucret).toLocaleString()} ₺`
            : "0,00 ₺",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={() =>
                navigate(`/personelCoachingCrud/${row.id}`, {
                  state: {
                    personelId,
                    selectedCoaching: data.find(c => c.id === row.id),
                  },
                })
              }
            >
              <i className="ti ti-pencil" />
            </Button>{" "}
            <Button
              size="sm"
              variant="danger"
              onClick={() => openDeleteModal?.(row)}
            >
              <i className="ti ti-trash" />
            </Button>
          </>
        ),
      },
    ],
    [navigate, personelId, data]
  )

  function handleDelete(row: Coaching) {
    if (row.id) deleteExistingCoaching(row.id)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>Koçluk</h6>
        <Button
          variant="success"
          onClick={() =>
            navigate("/personelCoachingCrud", { state: { personelId } })
          }
        >
          Ekle
        </Button>
      </div>

      <ReusableTable<Coaching>
        columns={columns}
        data={data}
        error={detailError || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={data.length}
        pageSize={data.length}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        exportFileName="kocluk"
        showExportButtons
        onDeleteRow={handleDelete}
      />
    </div>
  )
}
