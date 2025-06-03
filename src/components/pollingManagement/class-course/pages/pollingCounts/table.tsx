/* PollingCountsTable.tsx — Yoklama Sayıları (revize) */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../component/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

/* ─────────────────── Satır tipi ─────────────────── */
interface Row {
    id: number;
    class_name: string;
    student_name: string;
    present_count: number;
    absent_count: number;
    late_count: number;
}

export default function PollingCountsTable() {
    const navigate = useNavigate();

    /* ————— filtre state’leri ————— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [lessons, setLessons] = useState<string[]>([]);
    const [student, setStudent] = useState('');

    /* ————— sayfalama ————— */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* ————— lazy enable ————— */
    const [enabled, setEnabled] = useState({
        levels: false,
        classes: false,
        lessons: false,
        students: false,
    });

    /* ————— look-ups ————— */
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
    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({ enabled: enabled.students });

    /* ————— ana sorgu ————— */
    const {
        attendancesData = [],
        loading,
        error,
        totalPages,
        totalItems,
    } = useAttendancesTable({
        class_level: +classLevel || undefined,
        classroom_id: +classroom || undefined,
        lesson_ids: lessons.length ? lessons.join(',') : undefined,
        student_id: +student || undefined,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        page, paginate, enabled: true,
    });

    /* ————— satırlar ————— */
    const rows: Row[] = useMemo(() => {
        return attendancesData.flatMap((att: any) => {
            const cls = att.group?.name ?? '-';
            const present = att.present_count ?? 0;
            const absent = att.absent_count ?? 0;
            const late = att.late_count ?? 0;

            if (!att.students?.length) {
                return [{
                    id: att.id, class_name: cls, student_name: '-',
                    present_count: present, absent_count: absent, late_count: late,
                }];
            }
            return att.students.map((stu: any) => ({
                id: att.id,
                class_name: cls,
                student_name: `${stu.first_name ?? ''} ${stu.last_name ?? ''}`.trim() || '-',
                present_count: present,
                absent_count: absent,
                late_count: late,
            }));
        });
    }, [attendancesData]);

    /* ————— kolonlar ————— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'class_name', label: 'Sınıf', render: r => r.class_name },
        { key: 'student_name', label: 'Öğrenci Adı', render: r => r.student_name },
        { key: 'present_count', label: 'Geldi', style: { textAlign: 'center', color: '#18c96e' }, render: r => r.present_count },
        { key: 'absent_count', label: 'Gelmedi', style: { textAlign: 'center', color: '#ff4d4f' }, render: r => r.absent_count },
        { key: 'late_count', label: 'Geç Geldi', style: { textAlign: 'center', color: '#ffb300' }, render: r => r.late_count },
    ], []);

    /* ————— filtreler (4 adet / satır) ————— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'class_level', label: 'Sınıf Seviyesi', type: 'select', col: 1,
            value: classLevel,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: v => { setClassLevel(v); setClassroom(''); setLessons([]); },
            options: levelsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube', type: 'select', col: 1,
            dependencyKey: 'class_level',
            value: classroom,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroom,
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'lesson', label: 'Ders', type: 'multiselect', col: 1,
            dependencyKey: 'class_level',
            value: lessons,
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            onChange: setLessons,
            options: lessonsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'student', label: 'Öğrenci', type: 'select', col: 1,
            value: student,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: setStudent,
            options: studentsData.map((s: any) => ({
                value: String(s.student_id),
                label: s.student ? `${s.student.first_name} ${s.student.last_name}` : '-',
            })),
        },
    ], [
        dateRange, classLevel, classroom, lessons, student,
        levelsData, classroomData, lessonsData, studentsData,
    ]);

    /* ————— render ————— */
    return (
        <>
            <FilterGroup
                filters={filters}
                navigate={navigate}
                columnsPerRow={4}
            />

            <ReusableTable<Row>
                pageTitle="Yoklama Sayıları"
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
                exportFileName="polling_counts"
            />
        </>
    );
}
