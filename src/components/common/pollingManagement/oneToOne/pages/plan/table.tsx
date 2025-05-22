/* eslint-disable @typescript-eslint/no-misused-promises */
/* table.tsx – Bire-bir > “Birebir Planla” listesi */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

/* --- veri kaynakları --------------------------------------------------- */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';          // talepler
import { useLessonList } from '../../../../../hooks/lessons/useList';                  // dersler
import { useLevelsTable } from '../../../../../hooks/levels/useList';                  // sınıf seviyesi
import { useClassroomList } from '../../../../../hooks/classrooms/useList';            // sınıf / şube
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';             // bire-bir alanı

/* --- satır tipi -------------------------------------------------------- */
interface Row {
    id: number;
    request_date: string;    // Talep Tarihi
    student_name: string;    // Öğrenci
    lesson_name: string;     // Ders
    status_text: string;     // Durum
    assigned_teacher: string;// Atanan Öğretmen
    hour_range: string;      // Saat Aralığı
    area_name: string;       // Çalışma Alanı
}

const BASE = `${import.meta.env.BASE_URL}oneToOne/plan`;

export default function OneToOnePlanTable() {
    const navigate = useNavigate();

    /* ----- filtre state’leri ------------------------------------------- */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [teacher, setTeacher] = useState('');
    const [student, setStudent] = useState('');
    const [lesson, setLesson] = useState('');
    const [areaId, setAreaId] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* lazy-load bayrakları (filter listeleri) */
    const [enabled, setEnabled] = useState({
        levels: false,
        classes: false,
        lessons: false,
        teachers: false,
        students: false,
        areas: false,
    });

    /* ----- yardımcı listeler ------------------------------------------- */
    const { levelsData } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData } = useClassroomList({
        enabled: enabled.classes && !!classLevel,
        class_level: +classLevel || undefined,
        branchId: 0,
    });
    const { lessonsData } = useLessonList({
        enabled: enabled.lessons,
        class_level: +classLevel || undefined,
    });
    const { attendanceTeachersData: teachersData } = useAttendanceTeachersTable({
        enabled: enabled.teachers,
    });
    const { attendanceStudentsData: studentsData } = useAttendanceStudentsTable({
        enabled: enabled.students,
    });
    const { usedAreasData } = useUsedAreasList({ enabled: enabled.areas });

    /* ----- ana API çağrısı (talep listesi) ------------------------------ */
    const {
        attendancesData,
        loading, error,
        totalPages, totalItems,
    } = useAttendancesTable({
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        class_level: +classLevel || undefined,
        classroom_id: +classroom || undefined,
        teacher_id: +teacher || undefined,
        student_id: +student || undefined,
        lesson_id: +lesson || undefined,
        used_area_id: +areaId || undefined,
        enabled: true,
    });

    /* ----- attendances → tablo satırları -------------------------------- */
    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).map((req: any) => ({
            id: req.id,
            request_date: dayjs(req.request_date ?? req.start_date).format('DD.MM.YYYY'),
            student_name: req.student_name || req.students?.[0]?.name_surname ||
                `${req.students?.[0]?.first_name ?? ''} ${req.students?.[0]?.last_name ?? ''}`.trim() || '-',
            lesson_name: req.lesson?.name || req.lesson_name || '-',
            status_text: req.status_text || req.status || '-',
            assigned_teacher: req.assigned_teacher?.name_surname ||
                req.teachers?.[0]?.name_surname || '-',
            hour_range: req.hour_range || `${req.total_hours ?? 0} Ders`,
            area_name: req.used_area?.name || req.area_name || '-',
        }))
    ), [attendancesData]);

    /* ----- kolonlar --sds--------------------------------------------------- */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'index', label: 'Öğrenci', render: (_r, _o, i) => i! + 1, style: { width: 60, textAlign: 'center' } },
        { key: 'request_date', label: 'Talep Tarihi', render: r => r.request_date },
        { key: 'lesson_name', label: 'Ders', render: r => r.lesson_name },
        { key: 'status_text', label: 'Durum', render: r => r.status_text },
        { key: 'assigned_teacher', label: 'Atanan Öğretmen', render: r => r.assigned_teacher },
        { key: 'hour_range', label: 'Saat Aralığı', render: r => r.hour_range },
        { key: 'area_name', label: 'Çalışma Alanı', render: r => r.area_name },
        {
            key: 'actions', label: 'İşlemler', style: { width: 100, textAlign: 'center' },
            render: row => (
                <button
                    type="button"
                    className="btn btn-link p-0"
                    onClick={() => navigate(`${BASE}/match/${row.id}`)}
                >
                    Eşleştir
                </button>
            ),
        },
    ], [navigate]);

    /* ----- filtre tanımları (onClick → enabled) ------------------------- */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange, onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'class_level', label: 'Sınıf Seviyesi',
            value: classLevel,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: v => { setClassLevel(v); setClassroom(''); },
            options: (levelsData ?? []).map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube',
            value: classroom,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroom,
            options: (classroomData ?? []).map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'lesson', label: 'Ders',
            value: lesson,
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            onChange: setLesson,
            options: (lessonsData ?? []).map(d => ({ value: String(d.id), label: d.name })),
        },
        {
            key: 'teacher', label: 'Öğretmenler',
            value: teacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            onChange: setTeacher,
            options: (teachersData ?? []).map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname ?? '-',
            })),
        },
        {
            key: 'student', label: 'Öğrenciler',
            value: student,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: setStudent,
            options: (studentsData ?? []).map(s => ({
                value: String(s.student_id),
                label: s.student
                    ? `${s.student.first_name} ${s.student.last_name}`
                    : '-',
            })),
        },
        {
            key: 'areaId', label: 'Birebir Alanı',
            value: areaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            onChange: setAreaId,
            options: (usedAreasData ?? []).map(a => ({ value: String(a.id), label: a.name })),
        },
    ], [
        dateRange, classLevel, classroom, lesson, teacher, student, areaId,
        levelsData, classroomData, lessonsData, teachersData, studentsData, usedAreasData,
    ]);

    /* ----- render ------------------------------------------------------- */
    return (
        <ReusableTable<Row>

            tableMode="single"
            columns={columns}
            data={rows}
            loading={loading}
            error={error}
            filters={filters}
            showExportButtons
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={s => { setPageSize(s); setPage(1); }}
            exportFileName="one_to_one_plan"
        />
    );
}
