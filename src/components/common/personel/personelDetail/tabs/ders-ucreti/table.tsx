import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable"
import { useTuitionFeesShow } from "../../../../../hooks/employee/tuition_fees/useTuitionFeesShow"
import { useTuitionFeesDelete } from "../../../../../hooks/employee/tuition_fees/useTuitionFeesDelete"
import { TuitionFees } from "../../../../../../types/employee/tuition_fees/list"

interface TuitionFeesTabProps {
  personelId: number
  enabled: boolean
}

export default function TuitionFeesTab({
  personelId,
  enabled,
}: TuitionFeesTabProps) {
  const navigate = useNavigate()
  const [fees, setFees] = useState<TuitionFees[]>([])

  const {

    getTuitionFees,
    loading,
    error,
  } = useTuitionFeesShow()

  const { deleteExistingTuitionFees, error: deleteError } =
    useTuitionFeesDelete()

  // fetch on mount / enabled
  useEffect(() => {
    if (!enabled) return

    ;(async () => {
      const res = await getTuitionFees(personelId)
      // the detail API returns { data: TuitionFees[] } or a single object?
      // Here we assume getTuitionFees returns the raw array or single object:
      const arr = Array.isArray(res) ? res : res ? [res] : []
      setFees(arr)
    })()
  }, [enabled, personelId, getTuitionFees])

  const columns: ColumnDefinition<TuitionFees>[] = useMemo(
    () => [
      {
        key: "tarih",
        label: "Tarih",
        render: (row) => row.tarih || "-",
      },
      {
        key: "ders_sayisi",
        label: "Ders Sayısı",
        render: (row) => String(row.ders_sayisi ?? 0),
      },
      {
        key: "ders_ucreti",
        label: "1 Ders Ücreti",
        render: (row) =>
          row.ders_ucreti
            ? `${Number(row.ders_ucreti).toLocaleString()} ₺`
            : "0,00 ₺",
      },
      {
        key: "toplam_ucret",
        label: "Toplam Ücret",
        render: (row) => {
          const tot = Number(row.ders_sayisi) * Number(row.ders_ucreti)
          return `${tot.toLocaleString()} ₺`
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
              onClick={() =>
                navigate(`/personelTuitionFeeCrud/${row.id}`, {
                  state: {
                    personelId,
                    selectedTuition: fees.find((t) => t.id === row.id),
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
    [navigate, personelId, fees]
  )

  function handleDelete(row: TuitionFees) {
    if (row.id) deleteExistingTuitionFees(row.id)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>Ders Ücreti</h6>
        <Button
          variant="success"
          onClick={() =>
            navigate("/personelTuitionFeeCrud", { state: { personelId } })
          }
        >
          Ekle
        </Button>
      </div>

      <ReusableTable<TuitionFees>
        columns={columns}
        data={fees}
        loading={loading}
        error={error || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={fees.length}
        onPageChange={() => {}}
        pageSize={fees.length}
        onPageSizeChange={() => {}}
        exportFileName="ders_ucreti"
        showExportButtons
        onDeleteRow={handleDelete}
      />
    </div>
  )
}
