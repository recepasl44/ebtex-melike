
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { useSpecialTutorLessonShow } from "../../../../../hooks/employee/special_tutor_lesson/useSpecialTutorLessonShow";
import { useSpecialTutorLessonDelete } from "../../../../../hooks/employee/special_tutor_lesson/useSpecialTutorLessonDelete";
import { SpecialTutorLesson } from "../../../../../../types/employee/special_tutor_lesson/list";

interface SpecialTabProps {
  personelId: number;
  enabled: boolean;
}

export default function SpecialTab({ personelId, enabled }: SpecialTabProps) {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<SpecialTutorLesson[]>([]);

  const {

    getSpecialTutorLesson,
    loading,
    error,
  } = useSpecialTutorLessonShow();

  const { deleteExistingSpecialTutorLesson, error: deleteError } =
    useSpecialTutorLessonDelete();

  const { } = useLocation() as {
    state?: { personelId?: number; selectedLesson?: SpecialTutorLesson };
  };

  // whenever enabled or personelId changes, fetch that person's lessons
  useEffect(() => {
    if (!enabled) return;
    (async () => {
      const res = await getSpecialTutorLesson(personelId);
      const arr = Array.isArray(res) ? res : res ? [res] : [];
      setLessons(arr);
    })();
  }, [enabled, personelId, getSpecialTutorLesson]);

  const columns: ColumnDefinition<SpecialTutorLesson>[] = useMemo(
    () => [
      {
        key: "tarih",
        label: "Tarih",
        render: (row) => row.tarih || "-",
      },
      {
        key: "baslangic_saat",
        label: "Başlangıç",
        render: (row) => row.baslangic_saati || "--:--",
      },
      {
        key: "bitis_saat",
        label: "Bitiş",
        render: (row: { bitis_saati: any; }) => row.bitis_saati || "--:--",
      },
      {
        key: "ucret",
        label: "Ders Ücreti",
        render: (row) =>
          row.ucret ? `${Number(row.ucret).toLocaleString()} ₺` : "0,00 ₺",
      },
      {
        key: "gelir",
        label: "Gelir",
        render: (row) =>
          row.gelir ? `${Number(row.gelir).toLocaleString()} ₺` : "0,00 ₺",
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
                navigate(`/personelSpecialCrud/${row.id}`, {
                  state: {
                    personelId,
                    selectedLesson: lessons.find((l) => l.id === row.id),
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
    [navigate, personelId, lessons]
  );

  function handleDelete(row: SpecialTutorLesson) {
    if (row.id) {
      deleteExistingSpecialTutorLesson(row.id);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>Özel Ders</h6>
        <Button
          variant="success"
          onClick={() =>
            navigate("/personelSpecialCrud", { state: { personelId } })
          }
        >
          Ekle
        </Button>
      </div>

      <ReusableTable<SpecialTutorLesson>
        columns={columns}
        data={lessons}
        loading={loading}
        error={error || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={lessons.length}
        pageSize={lessons.length}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        exportFileName="ozel_ders"
        showExportButtons
        onDeleteRow={handleDelete}
      />
    </div>
  );
}
