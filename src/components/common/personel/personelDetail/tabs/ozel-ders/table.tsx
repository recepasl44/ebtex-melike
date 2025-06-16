import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../../../../ReusableTable";
import { useSpecialTutorLessonList } from "../../../../../hooks/employee/special_tutor_lesson/useSpecialTutorLessonList";
import { useSpecialTutorLessonDelete } from "../../../../../hooks/employee/special_tutor_lesson/useSpecialTutorLessonDelete";
import { useLevelsTable } from "../../../../../hooks/levels/useList";
import { useAttendanceTeachersTable } from "../../../../../hooks/attendanceTeacher/useList";
import darkcontrol from "../../../../../../utils/darkmodecontroller";
import { SpecialTutorLesson } from "../../../../../../types/employee/special_tutor_lesson/list";

export default function SpecialTab() {
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [level, setLevel] = useState("");
  const [teacher, setTeacher] = useState("");

  const [enabled, setEnabled] = useState({ levels: false, teachers: false });

  const { levelsData } = useLevelsTable({ enabled: enabled.levels });
  const { attendanceTeachersData: teachersData } = useAttendanceTeachersTable({
    enabled: enabled.teachers,
  });

  const listParams = useMemo(
    () => ({
      enabled: true,
      start_date: dateRange.startDate || undefined,
      end_date: dateRange.endDate || undefined,
      level_id: level || undefined,
      teacher_id: teacher || undefined,
    }),
    [dateRange, level, teacher]
  );

  const { lessons, loading, error } = useSpecialTutorLessonList(listParams);
  const { deleteExistingSpecialTutorLesson, error: deleteError } =
    useSpecialTutorLessonDelete();

  interface SummaryRow {
    teacherName: string;
    lessons: SpecialTutorLesson[];
    totalSession: number;
    totalStudent: number;
    totalFee: number;
  }

  const rows: SummaryRow[] = useMemo(() => {
    const map = new Map<string, SummaryRow>();
    (lessons ?? []).forEach((l) => {
      const key = l.ad_soyad || "-";
      if (!map.has(key)) {
        map.set(key, {
          teacherName: key,
          lessons: [],
          totalSession: 0,
          totalStudent: 0,
          totalFee: 0,
        });
      }
      const item = map.get(key)!;
      item.lessons.push(l);
      item.totalSession += 1;
      item.totalStudent += 1;
      item.totalFee += Number(l.ucret ?? 0);
    });
    return Array.from(map.values());
  }, [lessons]);

  const [detailRow, setDetailRow] = useState<SummaryRow | null>(null);

  const columns: ColumnDefinition<SummaryRow>[] = useMemo(
    () => [
      { key: "teacherName", label: "Eğitmen Adı", render: (r) => r.teacherName },
      {
        key: "totalSession",
        label: "Toplam Seans Sayısı",
        render: (r) => r.totalSession.toString(),
      },
      {
        key: "totalStudent",
        label: "Toplam Öğrenci Sayısı",
        render: (r) => r.totalStudent.toString(),
      },
      {
        key: "totalFee",
        label: "Toplam Koçluk Ücreti (₺)",
        render: (r) => `${r.totalFee.toLocaleString()} ₺`,
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (r) => (
          <Button
            variant="primary-light"
            size="sm"
            className="btn-icon rounded-pill"
            onClick={() => setDetailRow(r)}
          >
            <i className="ti ti-eye" />
          </Button>
        ),
      },
    ],
    []
  );

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "date_range",
        label: "Tarih Aralığı",
        type: "doubledate",
        value: dateRange,
        onChange: (v) => setDateRange(v ?? { startDate: "", endDate: "" }),
      },
      {
        key: "level",
        label: "Sınıf Seviyesi",
        type: "select",
        value: level,
        onClick: () => setEnabled((e) => ({ ...e, levels: true })),
        onChange: setLevel,
        options: (levelsData ?? []).map((l: any) => ({
          value: String(l.id),
          label: l.name,
        })),
      },
      {
        key: "teacher",
        label: "Eğitmen Adı Soyadı",
        type: "select",
        value: teacher,
        onClick: () => setEnabled((e) => ({ ...e, teachers: true })),
        onChange: setTeacher,
        options: (teachersData ?? []).map((t: any) => ({
          value: String(t.teacher_id),
          label: t.teacher?.name_surname ?? "-",
        })),
      },
    ],
    [dateRange, level, teacher, levelsData, teachersData]
  );

  const totalAmount = rows.reduce((acc, r) => acc + r.totalFee, 0);
  const textColor = darkcontrol.dataThemeMode === "dark" ? "#fff" : "#000";
  const footer = (
    <div className="d-flex justify-content-end fw-bold me-3" style={{ color: textColor }}>
      Toplam: {totalAmount.toLocaleString()} ₺
    </div>
  );

  function handleDeleteRow(row: SpecialTutorLesson) {
    if (!row.id) return;
    deleteExistingSpecialTutorLesson(row.id);
  }

  const detailColumns: ColumnDefinition<SpecialTutorLesson>[] = useMemo(
    () => [
      { key: "tarih", label: "Tarih", render: (r) => r.tarih || "-" },
      {
        key: "ad_soyad",
        label: "Öğrenci Adı Soyadı",
        render: (r) => r.ad_soyad || "-",
      },
      {
        key: "time",
        label: "Başlangıç- Bitiş",
        render: (r) => `${r.baslangic_saati || ""} - ${r.bitis_saati || ""}`,
      },
      {
        key: "ucret",
        label: "Seans Ücreti (₺)",
        render: (r) =>
          r.ucret ? `${Number(r.ucret).toLocaleString()} ₺` : "0,00 ₺",
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
                  state: { personelId: row.personel_id, selectedLesson: row },
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
    [navigate]
  );

  const detailFooter = (
    <div className="d-flex justify-content-end fw-bold me-3" style={{ color: textColor }}>
      Toplam: {detailRow?.lessons.reduce((acc, r) => acc + Number(r.ucret ?? 0), 0).toLocaleString()} ₺
    </div>
  );

  return (
    <>
      <ReusableTable<SummaryRow>
        tableMode="single"
        filters={filters}
        columns={columns}
        data={rows}
        loading={loading}
        error={error || deleteError}
        showExportButtons
        exportFileName="ozel_ders"
        customFooter={footer}
      />

      {detailRow && (
        <Modal show={true} onHide={() => setDetailRow(null)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Detay</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-end mb-2">
              <Button
                variant="success"
                onClick={() =>
                  navigate("/personelSpecialCrud", {
                    state: { personelId: detailRow.lessons[0]?.personel_id },
                  })
                }
              >
                Ekle
              </Button>
            </div>
            <ReusableTable<SpecialTutorLesson>
              columns={detailColumns}
              data={detailRow.lessons}
              error={error || deleteError}
              showExportButtons={false}
              onDeleteRow={handleDeleteRow}
              customFooter={detailFooter}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

