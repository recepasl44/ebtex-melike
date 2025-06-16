import { useState, useMemo } from "react";
import darkcontrol from "../../../../../utils/darkmodecontroller";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../../../../ReusableTable";
import { useCouponPriceList } from "../../../../../hooks/employee/coupon_price/useList";
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

export default function CouponDetailTab() {
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

  const navigate = useNavigate();

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

  const { couponPrices: fees, loading, error } = useCouponPriceList(listParams);

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
            onClick={() =>
              navigate(`/personelCouponCrud/${r.id}`, { state: { details: r.details } })
            }
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
        exportFileName="soru_cozum_ucretleri"
        customFooter={footer}
      />
    </>
  );
}
