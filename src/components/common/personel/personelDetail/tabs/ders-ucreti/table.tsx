import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Modal, Table } from "react-bootstrap"
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../../../../ReusableTable"
import FilterGroup from "../../../pollingManagement/class-course/component/organisms/SearchFilters"
import { useTuitionFeesList } from "../../../../../hooks/employee/tuition_fees/useTuitionFeesList"
import { useTuitionFeesDelete } from "../../../../../hooks/employee/tuition_fees/useTuitionFeesDelete"
import { useLevelsTable } from "../../../../../hooks/levels/useList"
import { useLessonList } from "../../../../../hooks/lessons/useList"
import { usePersonnelTable } from "../../../../../hooks/employee/personel/useList"
import { TuitionFees } from "../../../../../../types/employee/tuition_fees/list"

interface TuitionFeesTabProps {
  personelId: number
  enabled: boolean
}

export default function TuitionFeesTab({ personelId, enabled }: TuitionFeesTabProps) {
  const navigate = useNavigate()

  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: '',
  })
  const [level, setLevel] = useState('')
  const [teacher, setTeacher] = useState('')
  const [lesson, setLesson] = useState('')
  const [page, setPage] = useState(1)
  const [paginate, setPaginate] = useState(10)
  const [detailRow, setDetailRow] = useState<TuitionFees | null>(null)

  const { fees = [], loading, error } = useTuitionFeesList({
    enabled,
    page,
    per_page: paginate,
    start_date: dateRange.startDate || undefined,
    end_date: dateRange.endDate || undefined,
    level_id: level || undefined,
    lesson_id: lesson || undefined,
    personel_id: teacher || personelId,
  })

  const { deleteExistingTuitionFees, error: deleteError } = useTuitionFeesDelete()

  const { levelsData = [] } = useLevelsTable({ enabled: true })
  const { lessonsData = [] } = useLessonList({ enabled: true })
  const { personnelData: teachers = [] } = usePersonnelTable({ enabled: true })

  const columns: ColumnDefinition<TuitionFees>[] = useMemo(
    () => [
      {
        key: "teacher",
        label: "Eğitmen Adı",
        render: (row) =>
          row.personel ? `${row.personel.ad} ${row.personel.soyad}` : "-",
      },
      {
        key: "lesson_name",
        label: "Ürün/Ders Adı",
        render: (row) =>
          (row as any).lesson_name || (row as any).lesson?.name || "-",
      },
      {
        key: "ders_sayisi",
        label: "Toplam Ders Saati",
        render: (row) => String(row.ders_sayisi ?? 0),
      },
      {
        key: "ders_ucreti",
        label: "Ders Ücreti (₺)",
        render: (row) =>
          row.ders_ucreti
            ? `${Number(row.ders_ucreti).toLocaleString()} ₺`
            : "0,00 ₺",
      },
      {
        key: "toplam_ucret",
        label: "Ders Ücretleri Toplamı (₺)",
        render: (row) => {
          const tot = Number(row.ders_sayisi) * Number(row.ders_ucreti)
          return `${tot.toLocaleString()} ₺`
        },
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setDetailRow(row)}
              className="me-1"
            >
              Detay
            </Button>
            <Button
              size="sm"
              variant="info"
              onClick={() =>
                navigate(`/personelTuitionFeeCrud/${row.id}`, {
                  state: {
                    personelId,
                    selectedTuition: row,
                  },
                })
              }
              className="me-1"
            >
              <i className="ti ti-pencil" />
            </Button>
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
    [navigate, personelId]
  )

  function handleDelete(row: TuitionFees) {
    if (row.id) deleteExistingTuitionFees(row.id)
  }

  const totalFee = useMemo(
    () =>
      fees.reduce(
        (sum, r) => sum + Number(r.ders_sayisi) * Number(r.ders_ucreti),
        0
      ),
    [fees]
  )

  const footer = (
    <div className="text-end fw-bold me-2">
      Toplam: {totalFee.toLocaleString()} ₺
    </div>
  )

  const filters: FilterDefinition[] = [
    {
      key: 'dateRange',
      label: 'Tarih Aralığı',
      type: 'doubledate',
      value: dateRange,
      onChange: (v) => setDateRange(v ?? { startDate: '', endDate: '' }),
    },
    {
      key: 'level',
      label: 'Sınıf Seviyesi',
      type: 'select',
      value: level,
      onChange: setLevel,
      options: levelsData.map((l: any) => ({ value: l.id, label: l.name })),
    },
    {
      key: 'teacher',
      label: 'Eğitmen Adı Soyadı',
      type: 'select',
      value: teacher,
      onChange: setTeacher,
      options: teachers.map((t: any) => ({
        value: t.id,
        label: `${t.ad} ${t.soyad}`,
      })),
    },
    {
      key: 'lesson',
      label: 'Ürün/Ders Adı',
      type: 'select',
      value: lesson,
      onChange: setLesson,
      options: lessonsData.map((d: any) => ({ value: d.id, label: d.name })),
    },
  ]

  return (
    <>
      <FilterGroup filters={filters} navigate={navigate} columnsPerRow={4} />
      <ReusableTable<TuitionFees>
        tableMode="single"
        onAdd={() =>
          navigate("/personelTuitionFeeCrud", { state: { personelId } })
        }
        columns={columns}
        data={fees}
        loading={loading}
        error={error || deleteError}
        currentPage={page}
        totalPages={1}
        totalItems={fees.length}
        onPageChange={(p) => setPage(p)}
        pageSize={paginate}
        onPageSizeChange={(s) => {
          setPaginate(s)
          setPage(1)
        }}
        exportFileName="ders_ucreti"
        showExportButtons
        onDeleteRow={handleDelete}
        customFooter={footer}
      />

      {detailRow && (
        <Modal
          show={true}
          onHide={() => setDetailRow(null)}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Detay</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table bordered size="sm" className="mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tarih</th>
                  <th>Ders Saati</th>
                  <th>Ders Ücreti (₺)</th>
                  <th>Günlük Toplam (₺)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{detailRow.tarih}</td>
                  <td>{detailRow.ders_sayisi}</td>
                  <td>
                    {detailRow.ders_ucreti
                      ? `${Number(detailRow.ders_ucreti).toLocaleString()} ₺`
                      : '0,00 ₺'}
                  </td>
                  <td>
                    {(
                      Number(detailRow.ders_sayisi) *
                      Number(detailRow.ders_ucreti)
                    ).toLocaleString()}{' '}
                    ₺
                  </td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}
