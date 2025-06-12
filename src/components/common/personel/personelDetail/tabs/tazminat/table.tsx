import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { WeeklyLessonCount } from "../../../../../../types/employee/weekly_lesson_count/list";
import { useWeeklyLessonCountShow } from "../../../../../hooks/employee/weekly_lesson_count/useWeeklyLessonCountShow";
import { useWeeklyLessonCountDelete } from "../../../../../hooks/employee/weekly_lesson_count/useWeeklyLessonCountDelete";

interface WeeklyLessonTabProps {
  personelId: number;
  enabled: boolean;
}

export default function WeeklyLessonCountTab({
  personelId,
  enabled,
}: WeeklyLessonTabProps) {
  const navigate = useNavigate();
  const [data, setData] = useState<WeeklyLessonCount[]>([]);

  const {  getWeeklyLessonCount, loading, error } =
    useWeeklyLessonCountShow();

  const { deleteExistingWeeklyLessonCount, error: deleteError } =
    useWeeklyLessonCountDelete();

  useEffect(() => {
    if (!enabled) return;

    (async () => {
      const res = await getWeeklyLessonCount(personelId);
      const arr = Array.isArray(res) ? res : res ? [res] : [];
      setData(arr);
    })();
  }, [enabled, personelId]);

  const columns: ColumnDefinition<WeeklyLessonCount>[] = useMemo(
    () => [
      {
        key: "hafta_kac_gun",
        label: "Hafta Kaç Gün",
        render: (row) => row.hafta_kac_gun,
      },
      {
        key: "gunluk_ucret",
        label: "Günlük Ücret",
        render: (row) =>
          row.gunluk_ucret
            ? `${Number(row.gunluk_ucret).toLocaleString()} ₺`
            : "0,00 ₺",
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
                navigate(`/personelWeeklyLessonCrud/${row.id}`, {
                  state: {
                    personelId,
                    selectedWeekly: data.find((d) => d.id === row.id),
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
  );

  function handleDeleteRow(row: WeeklyLessonCount) {
    if (!row.id) return;
    deleteExistingWeeklyLessonCount(row.id);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>Haftalık Ders Bilgisi</h6>
        <Button
          variant="success"
          onClick={() =>
            navigate("/personelWeeklyLessonCrud", {
              state: { personelId },
            })
          }
        >
          Ekle
        </Button>
      </div>

      <ReusableTable<WeeklyLessonCount>
        columns={columns}
        data={data}
        loading={loading}
        error={error || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={data.length}
        pageSize={data.length}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        exportFileName="haftalik-ders"
        showExportButtons
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}
