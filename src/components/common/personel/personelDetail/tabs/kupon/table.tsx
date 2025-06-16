
import { useState, useMemo } from "react";
import { Button, Modal, Table as BTable } from "react-bootstrap";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../../../../ReusableTable";
import { useCouponPriceList } from "../../../../../hooks/employee/coupon_price/useList";
import { useLevelsTable } from "../../../../../hooks/levels/useList";
import { useAttendanceTeachersTable } from "../../../../../hooks/attendanceTeacher/useList";
import { useLessonList } from "../../../../../hooks/lessons/useList";

interface CouponTabProps {
  personelId: number;
  enabled: boolean;
}

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
  hours: number;
  fee: number;
  details?: DetailRow[];
}

export default function CouponTab({ personelId, enabled }: CouponTabProps) {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [level, setLevel] = useState("");
  const [teacher, setTeacher] = useState("");
  const [lesson, setLesson] = useState("");

  const [selectEnabled, setSelectEnabled] = useState({
    levels: false,
    teachers: false,
    lessons: false,
  });

  const { levelsData } = useLevelsTable({ enabled: selectEnabled.levels });
  const { attendanceTeachersData: teachersData } = useAttendanceTeachersTable({
    enabled: selectEnabled.teachers,
  });
  const { lessonsData } = useLessonList({
    enabled: selectEnabled.lessons,
    class_level: +level || undefined,
  });

  const listParams = useMemo(
    () => ({
      enabled,
      personel_id: personelId,
      start_date: dateRange.startDate || undefined,
      end_date: dateRange.endDate || undefined,
      level_id: level || undefined,
      teacher_id: teacher || undefined,
      lesson_id: lesson || undefined,
    }),
    [enabled, personelId, dateRange, level, teacher, lesson]
  );

  const { couponPrices, loading, error } = useCouponPriceList(listParams);

  const rows: Row[] = useMemo(
    () =>
      (couponPrices ?? []).map((c: any) => ({
        id: c.id,
        teacher_name:
          c.personel?.ad && c.personel?.soyad
            ? `${c.personel.ad} ${c.personel.soyad}`
            : c.teacher_name || "-",
        lesson_name: c.lesson_name || c.lesson?.name || "-",
        hours: Number(c.total_hours ?? c.ders_sayisi ?? 0),
        fee: Number(c.hourly_fee ?? c.ders_ucreti ?? 0),
        details: c.details || [],
      })),
    [couponPrices]
  );

  const [detailRow, setDetailRow] = useState<Row | null>(null);

  const columns: ColumnDefinition<Row>[] = useMemo(
    () => [
      { key: "teacher_name", label: "Eğitmen Adı", render: (r) => r.teacher_name },
      { key: "lesson_name", label: "Ürün/Ders Adı", render: (r) => r.lesson_name },
      { key: "hours", label: "Soru Çözüm Saati", render: (r) => r.hours.toString() },
      {
        key: "fee",
        label: "Ders Ücreti (₺)",
        render: (r) => `${r.fee.toLocaleString()} ₺`,
      },
      {
        key: "total",
        label: "Soru Çözüm Ücretleri Toplamı (₺)",
        render: (r) => `${(r.hours * r.fee).toLocaleString()} ₺`,
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
        onClick: () => setSelectEnabled((e) => ({ ...e, levels: true })),
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
        onClick: () => setSelectEnabled((e) => ({ ...e, teachers: true })),
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
        onClick: () => setSelectEnabled((e) => ({ ...e, lessons: true })),
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

  const totalAmount = rows.reduce((acc, r) => acc + r.hours * r.fee, 0);

  const footer = (
    <div className="d-flex justify-content-end fw-bold me-3">
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
        exportFileName="soru_cozum"
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
