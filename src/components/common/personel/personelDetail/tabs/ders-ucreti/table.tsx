import { useState, useMemo } from "react";
import darkcontrol from "../../../../../utils/darkmodecontroller";
import { Button, Modal, Table as BTable } from "react-bootstrap";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../../../../ReusableTable";
import { useTuitionFeesList } from "../../../../../hooks/employee/tuition_fees/useTuitionFeesList";
import { useLevelsTable } from "../../../../../hooks/levels/useList";
import { useLessonList } from "../../../../../hooks/lessons/useList";
import { useAttendanceTeachersTable } from "../../../../../hooks/attendanceTeacher/useList";

interface DetailRow {
  id: number;
  date: string;
  hours: number;
  fee: number;
}

interface Row {
  id: number;
  teacher_name: string;
  lesson_name: string;
  total_hours: number;
  hourly_fee: number;
  details?: DetailRow[];
}

export default function TuitionFeesTab() {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [level, setLevel] = useState("");
  const [teacher, setTeacher] = useState("");
  const [lesson, setLesson] = useState("");

  const [enabled, setEnabled] = useState({
    levels: false,
    teachers: false,
    lessons: false,
  });

  const { levelsData } = useLevelsTable({ enabled: enabled.levels });
  const { attendanceTeachersData: teachersData } = useAttendanceTeachersTable({
    enabled: enabled.teachers,
  });
  const { lessonsData } = useLessonList({
    enabled: enabled.lessons,
    class_level: +level || undefined,
  });

  const listParams = useMemo(
    () => ({
      enabled: true,
      start_date: dateRange.startDate || undefined,
      end_date: dateRange.endDate || undefined,
      level_id: level || undefined,
      teacher_id: teacher || undefined,
      lesson_id: lesson || undefined,
    }),
    [dateRange, level, teacher, lesson]
  );

  const { fees, loading, error } = useTuitionFeesList(listParams);

  const rows: Row[] = useMemo(
    () =>
      (fees ?? []).map((f: any) => ({
        id: f.id,
        teacher_name:
          f.personel?.ad && f.personel?.soyad
            ? `${f.personel.ad} ${f.personel.soyad}`
            : f.teacher_name || "-",
        lesson_name: f.lesson_name || f.lesson?.name || "-",
        total_hours: Number(f.total_hours ?? f.ders_sayisi ?? 0),
        hourly_fee: Number(f.hourly_fee ?? f.ders_ucreti ?? 0),
        details: f.details || [],
      })),
    [fees]
  );

  const [detailRow, setDetailRow] = useState<Row | null>(null);

  const columns: ColumnDefinition<Row>[] = useMemo(
    () => [
      { key: "teacher_name", label: "Eğitmen Adı", render: (r) => r.teacher_name },
      { key: "lesson_name", label: "Ürün/Ders Adı", render: (r) => r.lesson_name },
      {
        key: "total_hours",
        label: "Toplam Ders Saati",
        render: (r) => r.total_hours.toString(),
      },
      {
        key: "hourly_fee",
        label: "Ders Ücreti (₺)",
        render: (r) => `${r.hourly_fee.toLocaleString()} ₺`,
      },
      {
        key: "total_fee",
        label: "Ders Ücretleri Toplamı (₺)",
        render: (r) => `${(r.total_hours * r.hourly_fee).toLocaleString()} ₺`,
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
      {
        key: "lesson",
        label: "Ürün/Ders Adı",
        type: "select",
        value: lesson,
        onClick: () => setEnabled((e) => ({ ...e, lessons: true })),
        onChange: setLesson,
        options: (lessonsData ?? []).map((d: any) => ({
          value: String(d.id),
          label: d.name,
        })),
      },
    ],
    [
      dateRange,
      level,
      teacher,
      lesson,
      levelsData,
      teachersData,
      lessonsData,
    ]
  );

  const totalAmount = rows.reduce(
    (acc, r) => acc + r.total_hours * r.hourly_fee,
    0
  );

  const textColor = darkcontrol.dataThemeMode === "dark" ? "#fff" : "#000";

  const footer = (
    <div className="d-flex justify-content-end fw-bold me-3" style={{ color: textColor }}>
      Toplam: {totalAmount.toLocaleString()} ₺
    </div>
  );

  return (
    <>
      <ReusableTable<Row>
        tableMode="single"
        filters={filters}
        columns={columns}
        data={rows}
        loading={loading}
        error={error}
        showExportButtons
        exportFileName="ders_ucreti"
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
            <BTable bordered size="sm">
              <thead>
                <tr>
                  <th>Sıra No</th>
                  <th>Tarih</th>
                  <th>Ders Saati</th>
                  <th>Ders Ücreti (₺)</th>
                  <th>Günlük Toplam (₺)</th>
                </tr>
              </thead>
              <tbody>
                {detailRow.details?.map((d, idx) => (
                  <tr key={d.id ?? idx}>
                    <td>{idx + 1}</td>
                    <td>{d.date}</td>
                    <td>{d.hours}</td>
                    <td>{d.fee.toLocaleString()} ₺</td>
                    <td>{(d.hours * d.fee).toLocaleString()} ₺</td>
                  </tr>
                ))}
              </tbody>
            </BTable>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDetailRow(null)}>
              Kapat
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
