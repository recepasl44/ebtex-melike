
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../components/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';

/* ───────── Satır tipi ───────── */
interface Row {
    id: number;
    lesson_name: string;
    teacher_name: string;
    demand_cnt: number;
    active_cnt: number;
    present_cnt: number;
    absent_cnt: number;
}

export default function OneToOneTeacherCountTable() {
    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [lesson, setLesson] = useState('');
    const [teacher, setTeacher] = useState('');

    /* —— sayfalama —— */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        levels: false, classes: false, lessons: false, teachers: false,
    });


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

    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        page, pageSize: paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        class_level: +classLevel || undefined,
        classroom_id: +classroom || undefined,
        lesson_id: +lesson || undefined,
        teacher_id: +teacher || undefined,
        aggregate: 'teacher_counts',
        enabled: true,
    });

    const rows: Row[] = useMemo(() => (
        attendancesData.map((rec: any, idx: number) => ({
            id: idx,
            lesson_name: rec.lesson_name || rec.lesson?.name || '-',
            teacher_name: rec.teacher_name || rec.teacher?.name_surname || '-',
            demand_cnt: rec.demand_cnt ?? 0,
            active_cnt: rec.active_cnt ?? 0,
            present_cnt: rec.present_cnt ?? 0,
            absent_cnt: rec.absent_cnt ?? 0,
        }))
    ), [attendancesData]);

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = [
        { key: 'index', label: 'Sıra No', style: { width: 70, textAlign: 'center' }, render: (_r, _o, idx) => idx! + 1 },
        { key: 'lesson_name', label: 'Ders', render: r => r.lesson_name },
        { key: 'teacher_name', label: 'Öğretmen Adı', render: r => r.teacher_name },
        { key: 'demand_cnt', label: 'Talep', style: { textAlign: 'center' }, render: r => r.demand_cnt },
        { key: 'active_cnt', label: 'Aktif', style: { textAlign: 'center' }, render: r => r.active_cnt },
        { key: 'present_cnt', label: 'Geldi', style: { textAlign: 'center' }, render: r => <span className="text-success">{r.present_cnt}</span> },
        { key: 'absent_cnt', label: 'Gelmedi', style: { textAlign: 'center' }, render: r => <span className="text-danger">{r.absent_cnt}</span> },
    ];


    const filters: FilterDefinition[] = [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'class_level', label: 'Sınıf Seviyesi', type: 'select',
            value: classLevel,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: v => { setClassLevel(v); setClassroom(''); },
            options: levelsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube', type: 'select',
            value: classroom,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroom,
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'lesson', label: 'Ders', type: 'select',
            value: lesson,
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            onChange: setLesson,
            options: lessonsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'teacher', label: 'Öğretmen', type: 'select',
            value: teacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            onChange: setTeacher,
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
    ];


    return (
        <div>
            <FilterGroup
                filters={filters}
                columnsPerRow={4}
                navigate={useNavigate()}
            />
            <ReusableTable<Row>
                // pageTitle="Öğretmen İstatistikleri"
                tableMode="single"
                columns={columns}
                data={rows}
                loading={loading}
                error={error}
                showExportButtons
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={paginate}
                onPageChange={setPage}
                onPageSizeChange={s => { setPaginate(s); setPage(1); }}
                exportFileName="one_to_one_teacher_counts"
            />
        </div>
    );
}
