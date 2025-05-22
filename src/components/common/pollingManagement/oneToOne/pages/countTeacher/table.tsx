/* eslint-disable @typescript-eslint/no-misused-promises */
/* table.tsx – Birebir › Öğretmen Birebir Sayıları */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

/* -------- data hook’ları -------------------------------------------- */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';

/* -------- tablo satır tipi ------------------------------------------ */
interface Row {
    id: number;
    lesson_name: string;   // Ders
    teacher_name: string;   // Öğretmen
    demand_cnt: number;   // Talep
    active_cnt: number;   // Aktif
    present_cnt: number;   // Geldi
    absent_cnt: number;   // Gelmedi
}

/* -------- modal / crud rotası kökü ---------------------------------- */
const ROOT = `${import.meta.env.BASE_URL}pollingManagement/oneToOne/countTeacher`;

export default function OneToOneTeacherCountTable() {
    const navigate = useNavigate();

    /* ---- filtre state’leri ------------------------------------------- */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [lesson, setLesson] = useState('');
    const [teacher, setTeacher] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* ---- lazy flags --------------------------------------------------- */
    const [enabled, setEnabled] = useState({
        levels: false,
        classes: false,
        lessons: false,
        teachers: false,
    });

    /* ---- yardımcı listeler ------------------------------------------- */
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!classLevel,
        class_level: +classLevel || undefined,
        branchId: 0,
    });
    const { lessonsData = [] } = useLessonList({
        enabled: enabled.lessons && !!classLevel,
        class_level: +classLevel || undefined,
    });
    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });

    /* ---- ana sorgu ---------------------------------------------------- */
    const {
        attendancesData = [],
        loading,
        error,
        totalPages,
        totalItems,
    } = useAttendancesTable({
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        class_level: +classLevel || undefined,
        classroom_id: +classroom || undefined,
        lesson_id: +lesson || undefined,
        teacher_id: +teacher || undefined,
        aggregate: 'teacher_counts',
        enabled: true,
    });

    /* ---- API → satırlar ---------------------------------------------- */
    const rows: Row[] = useMemo(() => (
        attendancesData.map((rec: any, idx: number) => ({
            id: rec.id ?? idx,
            lesson_name: rec.lesson_name || rec.lesson?.name || '-',
            teacher_name: rec.teacher_name || rec.teacher?.name_surname || '-',
            demand_cnt: rec.demand_cnt ?? 0,
            active_cnt: rec.active_cnt ?? 0,
            present_cnt: rec.present_cnt ?? 0,
            absent_cnt: rec.absent_cnt ?? 0,
        }))
    ), [attendancesData]);

    /* ---- kolonlar ----------------------------------------------------- */
    const columns: ColumnDefinition<Row>[] = [
        {
            key: 'index',
            label: 'Sıra No',
            style: { width: 70, textAlign: 'center' },
            render: (_r, _o, idx) => idx! + 1,
        },
        { key: 'lesson_name', label: 'Dersler', render: r => r.lesson_name },
        { key: 'teacher_name', label: 'Öğretmenler', render: r => r.teacher_name },
        {
            key: 'demand_cnt', label: 'Talep',
            style: { textAlign: 'center' },
            render: r => r.demand_cnt,
        },
        {
            key: 'active_cnt', label: 'Aktif',
            style: { textAlign: 'center' },
            render: r => r.active_cnt,
        },
        {
            key: 'present_cnt', label: 'Geldi',
            style: { textAlign: 'center' },
            render: r => <span className="text-success">{r.present_cnt}</span>,
        },
        {
            key: 'absent_cnt', label: 'Gelmedi',
            style: { textAlign: 'center' },
            render: r => <span className="text-danger">{r.absent_cnt}</span>,
        },
        {
            key: 'actions',
            label: 'İşlemler',
            style: { width: 90, textAlign: 'center' },
            render: row => (
                <button
                    className="btn btn-icon btn-sm btn-info-light rounded-pill"
                    onClick={() => navigate(`${ROOT}/${row.id}`)}   /* kalem */
                >
                    <i className="ti ti-pencil" />
                </button>
            ),
        },
    ];

    /* ---- filtreler ---------------------------------------------------- */
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
            options: levelsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube',
            value: classroom,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroom,
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'lesson', label: 'Dersler',
            value: lesson,
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            onChange: setLesson,
            options: lessonsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'teacher', label: 'Öğretmenler',
            value: teacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            onChange: setTeacher,
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname ?? '-',
            })),
        },
    ];

    /* ---- render ------------------------------------------------------- */
    return (
        <ReusableTable<Row>
            tableMode="single"
            columns={columns}
            data={rows}
            loading={loading}
            error={error}

            filters={filters}
            showExportButtons

            onAdd={() => navigate(`${ROOT}/new`)}

            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={s => { setPageSize(s); setPage(1); }}

            exportFileName="one_to_one_teacher_counts"
        />
    );
}
