/* eslint-disable @typescript-eslint/no-misused-promises */
/* table.tsx – Birebir > “Birebir Yoklama” listesi */

import { useState, useMemo, useEffect } from 'react';

import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

/* --- veri hook’ları ---------------------------------------------------- */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

/* --- tablo satır tipi -------------------------------------------------- */
interface Row {
    id: number;
    date: string;             // Tarih
    hour_range: string;       // Saat Aralığı
    area_name: string;        // Çalışma Alanı
    student_name: string;     // Öğrenci
    teacher_name: string;     // Öğretmenler
    status: number;           // 0=Geldi  1=Geç Geldi  2=Gelmedi
    executive_status: string; // Yönetici Durumu
}

export default function OneToOnePollingTable() {
    /* ----------------- filtre state’leri -------------------------------- */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [lesson, setLesson] = useState('');
    const [teacher, setTeacher] = useState('');
    const [student, setStudent] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* lazy-load bayrakları (filtre listeleri) */
    const [enabled, setEnabled] = useState({
        levels: false,
        classes: false,
        lessons: false,
        teachers: false,
        students: false,
    });

    /* ----------------- yardımcı listeler -------------------------------- */
    const { levelsData } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData } = useClassroomList({
        enabled: enabled.classes && !!classLevel,
        class_level: +classLevel || undefined,
        branchId: 0,
    });
    const { lessonsData } = useLessonList({
        enabled: enabled.lessons && !!classLevel,
        class_level: +classLevel || undefined,
    });
    const { attendanceTeachersData: teachersData }
        = useAttendanceTeachersTable({ enabled: enabled.teachers });
    const { attendanceStudentsData: studentsData }
        = useAttendanceStudentsTable({ enabled: enabled.students });

    /* ----------------- ana yoklama listesi ------------------------------ */
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
        lesson_id: +lesson || undefined,
        teacher_id: +teacher || undefined,
        student_id: +student || undefined,
        enabled: true,
    });

    /* --- Local tablo state'i, tıklama ile güncellemek için --- */
    const baseRows: Row[] = useMemo(() => (
        (attendancesData ?? []).map((a: any) => ({
            id: a.id,
            date: dayjs(a.start_date).format('DD.MM.YYYY'),
            hour_range: a.hour_range || `${a.total_hours ?? 0} Ders`,
            area_name: a.used_area?.name || a.area_name || '-',
            student_name: a.students?.[0]
                ? `${a.students[0].first_name} ${a.students[0].last_name}`
                : '-',
            teacher_name: a.teachers?.[0]?.name_surname ?? '-',
            status: a.status,
            executive_status: a.executive_status ?? '-',
        }))
    ), [attendancesData]);
    const [rows, setRows] = useState<Row[]>(baseRows);

    useEffect(() => {
        setRows(baseRows);
    }, [baseRows]);
    // -----------------------------------------------------------

    // Durum tıklandıkça döngü: Geldi→Geç Geldi→Gelmedi→Geldi...
    function handleStatusClick(idx: number) {
        setRows(r => r.map((row, i) => i === idx
            ? { ...row, status: (row.status + 1) % 3 }
            : row));
        // API PATCH için burada isteğini gönderebilirsin
    }

    /* ----------------- kolon tanımları --------------------------------- */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'hour_range', label: 'Saat Aralığı', render: r => r.hour_range },
        { key: 'area_name', label: 'Çalışma Alanı', render: r => r.area_name },
        { key: 'student_name', label: 'Öğrenci', render: r => r.student_name },
        { key: 'teacher_name', label: 'Öğretmenler', render: r => r.teacher_name },
        {
            key: 'status', label: 'Durum',
            style: { width: 120, textAlign: 'center' },
            render: (row, _open, idx) => (
                <span
                    style={{ cursor: 'pointer' }}
                    className={
                        row.status === 0
                            ? 'text-success'
                            : row.status === 1
                                ? 'text-warning'
                                : 'text-danger'
                    }
                    onClick={() => idx !== undefined && handleStatusClick(idx)}
                >
                    {row.status === 0
                        ? 'Geldi'
                        : row.status === 1
                            ? 'Geç Geldi'
                            : 'Gelmedi'}
                </span>
            ),
        },
        { key: 'executive_status', label: 'Yönetici Durumu', render: r => r.executive_status },
    ], []);

    /* ----------------- filtreler (onClick → enabled) -------------------- */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
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
            key: 'lesson', label: 'Dersler',
            value: lesson,
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            onChange: setLesson,
            options: (lessonsData ?? []).map(l => ({ value: String(l.id), label: l.name })),
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
    ], [
        dateRange, classLevel, classroom, lesson, teacher, student,
        levelsData, classroomData, lessonsData, teachersData, studentsData,
    ]);

    /* ----------------- render ------------------------------------------ */
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
            exportFileName="one_to_one_polling"
        />
    );
}
