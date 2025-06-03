import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { useWeeklyLessonCountShow } from "../../../../../hooks/employee/weekly_lesson_count/useWeeklyLessonCountShow";
import { useWeeklyLessonCountDelete } from "../../../../../hooks/employee/weekly_lesson_count/useWeeklyLessonCountDelete";
import { WeeklyLessonCount } from "../../../../../../types/employee/weekly_lesson_count/list";

interface WeeklyLessonTabProps {
  personelId: number;
  enabled: boolean;
}

export default function WeeklyLessonCountTab({
  personelId,
  enabled,
}: WeeklyLessonTabProps) {
  const navigate = useNavigate();
  const [record, setRecord] = useState<WeeklyLessonCount | null>(null);

  const { getWeeklyLessonCount, loading, error } =
    useWeeklyLessonCountShow();

  const { deleteExistingWeeklyLessonCount, error: deleteError } =
    useWeeklyLessonCountDelete();

  useEffect(() => {
    if (!enabled) return;

    (async () => {
      const res = await getWeeklyLessonCount(personelId);
      setRecord(res || null);
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
                    selectedWeekly: row,
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
    [navigate, personelId]
  );

  const handleDeleteRow = (row: WeeklyLessonCount) => {
    if (!row.id) return;
    deleteExistingWeeklyLessonCount(row.id);
  };

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
        data={record ? [record] : []}
        loading={loading}
        error={error || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={record ? 1 : 0}
        pageSize={1}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        exportFileName="haftalik-ders"
        showExportButtons
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}
