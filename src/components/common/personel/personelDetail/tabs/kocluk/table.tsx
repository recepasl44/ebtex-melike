
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../../../../ReusableTable"
import { useCoachingList } from "../../../../../hooks/employee/coaching/useList"

interface CoachingTabProps {
  personelId: number
  enabled: boolean
}

export default function CoachingTab({ personelId, enabled }: CoachingTabProps) {
  const navigate = useNavigate()

  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string } | null>(null)
  const [classLevel, setClassLevel] = useState("")
  const [trainerName, setTrainerName] = useState("")

  const { coachings, loading, error } = useCoachingList({
    enabled,
    personel_id: personelId,
    start_date: dateRange?.startDate,
    end_date: dateRange?.endDate,
    class_level: classLevel,
    trainer_name: trainerName,
  })

  interface AggRow {
    ad_soyad: string
    totalSessions: number
    totalStudents: number
    totalFee: number
  }

  const aggData: AggRow[] = useMemo(() => {
    const map = new Map<string, AggRow>()
    ;(coachings || []).forEach(c => {
      const key = c.ad_soyad || "-"
      if (!map.has(key)) {
        map.set(key, { ad_soyad: key, totalSessions: 0, totalStudents: 0, totalFee: 0 })
      }
      const item = map.get(key)!
      item.totalSessions += 1
      item.totalStudents += Number(c.ogrenci_sayisi) || 0
      item.totalFee += Number(c.toplam_ucret) || 0
    })
    return Array.from(map.values())
  }, [coachings])

  const totalFeeSum = useMemo(
    () => aggData.reduce((sum, r) => sum + r.totalFee, 0),
    [aggData]
  )

  const columns: ColumnDefinition<AggRow>[] = useMemo(
    () => [
      { key: "ad_soyad", label: "Eğitmen Adı" },
      {
        key: "totalSessions",
        label: "Toplam Seans Sayısı",
        render: r => r.totalSessions.toString(),
      },
      {
        key: "totalStudents",
        label: "Toplam Öğrenci Sayısı",
        render: r => r.totalStudents.toString(),
      },
      {
        key: "totalFee",
        label: "Toplam Koçluk Ücreti (₺)",
        render: r => `${r.totalFee.toLocaleString()} ₺`,
      },
      {
        key: "actions",
        label: "İşlemler",
        render: r => (
          <Button
            size="sm"
            variant="info"
            onClick={() =>
              navigate("/personelCoachingCrud", {
                state: { personelId, instructorName: r.ad_soyad },
              })
            }
          >
            Detay
          </Button>
        ),
      },
    ],
    [navigate, personelId]
  )

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "dateRange",
        label: "Tarih Aralığı",
        type: "doubledate",
        value: dateRange as any,
        onChange: val => setDateRange(val),
      },
      {
        key: "classLevel",
        label: "Sınıf Seviyesi",
        type: "text",
        value: classLevel,
        onChange: val => setClassLevel(val),
      },
      {
        key: "trainerName",
        label: "Eğitmen Adı Soyadı",
        type: "text",
        value: trainerName,
        onChange: val => setTrainerName(val),
      },
    ],
    [dateRange, classLevel, trainerName]
  )

  return (
    <div>
      <ReusableTable<AggRow>
        columns={columns}
        data={aggData}
        filters={filters}
        loading={loading}
        error={error}
        currentPage={1}
        totalPages={1}
        totalItems={aggData.length}
        pageSize={aggData.length}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        exportFileName="kocluk"
        customFooter={
          <div className="text-end fw-bold p-2">
            Toplam: {totalFeeSum.toLocaleString()} ₺
          </div>
        }
      />
    </div>
  )
}
