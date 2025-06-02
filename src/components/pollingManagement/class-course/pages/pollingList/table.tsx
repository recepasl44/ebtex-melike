/* ------------------------------------------------------------------
 *  Yoklama • Polling Listesi – PollingListTable
 *  route : /pollingManagement/pollingList
 * -----------------------------------------------------------------*/
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../component/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

/* ───────── Row tipi ───────── */
interface Row {
    id: number;
    date: string;
    class_name: string;
    student_name: string;
    late_lessons: number;
    present_lessons: number;
    absent_lessons: number;
}

export default function PollingListTable() {
    const navigate = useNavigate();

    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [lessons, setLessons] = useState<string[]>([]);
    const [student, setStudent] = useState('');

    /* —— sayfalama —— */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        levels: false, classes: false, lessons: false, students: false,
    });

    /* —— look-ups —— */
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
    const { attendanceStudentsData: studentsData = [] }
        = useAttendanceStudentsTable({ enabled: enabled.students });

    /* —— ana sorgu —— */
    const { attendancesData = [], loading, error, totalPages, totalItems } =
        useAttendancesTable({
            class_level: +classLevel || undefined,
            classroom_id: +classroom || undefined,
            lesson_ids: lessons.length ? lessons.join(',') : undefined,
            student_id: +student || undefined,
            start_date: dateRange.startDate || undefined,
            end_date: dateRange.endDate || undefined,
            page, paginate, enabled: true,
        });

    /* —— rows —— */
    const tableData: Row[] = useMemo(() => (
        attendancesData.flatMap((att: any) => {
            const dateStr = att.start_date ? dayjs(att.start_date).format('DD.MM.YYYY') : '-';
            const className = att.group?.name ?? '-';

            if (!att.students?.length) {
                return [{
                    id: att.id, date: dateStr, class_name: className, student_name: '-',
                    late_lessons: 0, present_lessons: 0, absent_lessons: 0,
                }];
            }
            return att.students.map((stu: any) => ({
                id: att.id,
                date: dateStr,
                class_name: className,
                student_name:
                    `${stu.first_name ?? ''} ${stu.last_name ?? ''}`.trim() || '-',
                late_lessons: 0,
                present_lessons: 0,
                absent_lessons: 0,
            }));
        })
    ), [attendancesData]);

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'class_name', label: 'Sınıf', render: r => r.class_name },
        { key: 'student_name', label: 'Öğrenci Adı', render: r => r.student_name },
        { key: 'late_lessons', label: 'Geç Geldi', style: { textAlign: 'center' }, render: r => `${r.late_lessons} Ders` },
        { key: 'present_lessons', label: 'Geldi', style: { textAlign: 'center' }, render: r => `${r.present_lessons} Ders` },
        { key: 'absent_lessons', label: 'Gelmedi', style: { textAlign: 'center' }, render: r => `${r.absent_lessons} Ders` },
        {
            key: 'actions', label: 'İşlem', style: { width: 80, textAlign: 'center' },
            render: row => (
                <button
                    type="button"
                    className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                    onClick={() => navigate(`/pollingManagement/details/${row.id}`)}
                >
                    <i className="ti ti-eye" />
                </button>
            ),
        },
    ], [navigate]);

    /* —— filtreler —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 2,
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
            value: classroom,
            dependencyKey: 'class_level',
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroom,
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'lesson', label: 'Ders', type: 'multiselect', col: 1,
            value: lessons,
            dependencyKey: 'class_level',
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            onChange: (vals: string[]) => setLessons(vals),
            options: lessonsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'student', label: 'Öğrenci', type: 'select', col: 1,
            value: student,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: setStudent,
            options: studentsData.map((s: any) => ({
                value: String(s.student_id),
                label: s.student
                    ? `${s.student.first_name} ${s.student.last_name}`
                    : '-',
            })),
        },
    ], [
        dateRange, classLevel, classroom, lessons, student,
        levelsData, classroomData, lessonsData, studentsData,
    ]);

    /* —— render —— */
    return (
        <>
            <FilterGroup
                filters={filters}
                columnsPerRow={4}
                navigate={navigate}
            />

            <ReusableTable<Row>
                tableMode="single"
                columns={columns}
                data={tableData}
                loading={loading}
                error={error}
                showExportButtons
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={paginate}
                onPageChange={setPage}
                onPageSizeChange={s => { setPaginate(s); setPage(1); }}
                exportFileName="polling_list"
            />
        </>
    );
}
