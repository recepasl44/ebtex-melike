/* eslint-disable @typescript-eslint/no-misused-promises */
/* table.tsx – Birebir ▸ “Öğrenci Birebir Sayıları” listesi */

import { useState, useMemo } from 'react';
import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

/* -- data hook’ları ---------------------------------------------------- */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

/* -- satır tipi -------------------------------------------------------- */
interface Row {
    id: number;
    lesson_name: string;
    student_name: string;
    demand_cnt: number;
    active_cnt: number;
    present_cnt: number;
    absent_cnt: number;
}

/* ===================================================================== */
export default function OneToOneStudentCountTable() {

    /* ---------- filtre state’leri -------------------------------------- */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [lesson, setLesson] = useState('');
    const [student, setStudent] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* ---------- lazy-load bayrakları ----------------------------------- */
    const [enabled, setEnabled] = useState({
        levels: false,
        classes: false,
        lessons: false,
        students: false,
    });

    /* ---------- yardımcı listeler -------------------------------------- */
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
    const { attendanceStudentsData: studentsData }
        = useAttendanceStudentsTable({ enabled: enabled.students });

    /* ---------- API toplamları ----------------------------------------- */
    const {
        attendancesData,
        loading, error,
        totalPages, totalItems
    } = useAttendancesTable({
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        class_level: +classLevel || undefined,
        classroom_id: +classroom || undefined,
        lesson_id: +lesson || undefined,
        student_id: +student || undefined,
        aggregate: 'student_counts',   // sunucu özet veri döndürür
        enabled: true,
    });

    /* ---------- attendances → rows ------------------------------------- */
    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).map((rec: any, idx: number) => ({
            id: rec.id ?? idx,
            lesson_name: rec.lesson_name || rec.lesson?.name || '-',
            student_name: rec.student_name || rec.student?.name_surname || '-',
            demand_cnt: rec.demand_cnt ?? 0,
            active_cnt: rec.active_cnt ?? 0,
            present_cnt: rec.present_cnt ?? 0,
            absent_cnt: rec.absent_cnt ?? 0,
        }))
    ), [attendancesData]);

    /* ---------- kolonlar ------------------------------------------------ */
    const columns: ColumnDefinition<Row>[] = [
        {
            key: 'index', label: 'Sıra No', style: { width: 70, textAlign: 'center' },
            render: (_r, _o, idx) => idx! + 1
        },
        { key: 'lesson_name', label: 'Dersler', render: r => r.lesson_name },
        { key: 'student_name', label: 'Öğrenciler', render: r => r.student_name },
        {
            key: 'demand_cnt', label: 'Talep', style: { textAlign: 'center' },
            render: r => r.demand_cnt
        },
        {
            key: 'active_cnt', label: 'Aktif', style: { textAlign: 'center' },
            render: r => r.active_cnt
        },
        {
            key: 'present_cnt', label: 'Geldi', style: { textAlign: 'center' },
            render: r => <span className="text-success">{r.present_cnt}</span>
        },
        {
            key: 'absent_cnt', label: 'Gelmedi', style: { textAlign: 'center' },
            render: r => <span className="text-danger">{r.absent_cnt}</span>
        },
    ];

    /* ---------- filtreler ---------------------------------------------- */
    const filters: FilterDefinition[] = [
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
            key: 'student', label: 'Öğrenciler',
            value: student,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: setStudent,
            options: (studentsData ?? []).map(s => ({
                value: String(s.id),
                label: s.name_surname || s.name ||
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim(),
            })),
        },
    ];

    /* ---------- render -------------------------------------------------- */
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
            exportFileName="one_to_one_student_counts"
        />
    );
}
