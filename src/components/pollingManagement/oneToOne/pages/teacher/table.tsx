/* ------------------------------------------------------------------
 *  Öğretmen Bire-bir Planı – Liste
 *  route : /onebyonePolling/teacherPlan
 * -----------------------------------------------------------------*/
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../components/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useAttendanceDelete } from '../../../../../hooks/attendance/useDelete';

/* ───────── Satır tipi ───────── */
interface Row {
    id: number;
    week_day: string;
    lesson: string;
    teacher: string;
    time_range: string;
    work_area: string;
}

const BASE = `${import.meta.env.BASE_URL}onebyonePolling/teacherPlan`;
const TURKISH_DAYS = ['', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

export default function TeacherOneByOnePlanTable() {
    const navigate = useNavigate();
    const { deleteExistingAttendance, error: deleteError } = useAttendanceDelete();

    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [lesson, setLesson] = useState<string[]>([]);
    const [teacher, setTeacher] = useState<string[]>([]);
    const [areaId, setAreaId] = useState('');

    /* —— sayfalama —— */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        lessons: false, teachers: false, areas: false,
    });

    /* —— look-ups —— */
    const { lessonsData = [] } = useLessonList({ enabled: enabled.lessons });
    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });

    /* —— ana veri —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        page, paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        lesson_ids: lesson.length ? lesson.join(',') : undefined,
        teacher_ids: teacher.length ? teacher.join(',') : undefined,
        used_area_id: +areaId || undefined,
        week_days: weekDays.length ? weekDays.join(',') : undefined,
        one_by_one: 1,
        enabled: true,
    });

    /* —— satırlar —— */
    const rows: Row[] = useMemo(() => (
        attendancesData.map((a: any) => ({
            id: a.id,
            week_day: TURKISH_DAYS[a.days?.[0]?.day_id ?? dayjs(a.start_date).day()],
            lesson: a.lesson?.name || '-',
            teacher: a.teachers?.[0]?.name_surname || '-',
            time_range: `${dayjs(a.start_time, 'HH:mm:ss').format('HH:mm')} - ${dayjs(a.end_time, 'HH:mm:ss').format('HH:mm')}`,
            work_area: a.used_area?.name || '-',
        }))
    ), [attendancesData]);

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'week_day', label: 'Gün', render: r => r.week_day },
        { key: 'lesson', label: 'Ders', render: r => r.lesson },
        { key: 'teacher', label: 'Öğretmen', render: r => r.teacher },
        { key: 'time_range', label: 'Saat Aralığı', render: r => r.time_range },
        { key: 'work_area', label: 'Çalışma Alanı', render: r => r.work_area },
        {
            key: 'actions', label: 'İşlemler', style: { width: 110, textAlign: 'center' },
            render: (row, openDeleteModal) => (
                <div className="d-flex justify-content-center gap-2">
                    <button
                        type="button"
                        className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        onClick={() => navigate(`${BASE}/crud/${row.id}`)}
                    >
                        <i className="ti ti-pencil" />
                    </button>
                    <button
                        type="button"
                        className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        onClick={() => openDeleteModal && openDeleteModal(row)}
                    >
                        <i className="ti ti-trash" />
                    </button>
                </div>
            ),
        },
    ], [navigate]);

    /* —— filtreler (col:1 → 4/satır) —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'week_days', label: 'Haftanın Günleri', type: 'multiselect', col: 1,
            value: weekDays,
            onChange: (v: string | string[]) => setWeekDays(Array.isArray(v) ? v : []),
            options: [
                { value: '1', label: 'Pazartesi' }, { value: '2', label: 'Salı' },
                { value: '3', label: 'Çarşamba' }, { value: '4', label: 'Perşembe' },
                { value: '5', label: 'Cuma' }, { value: '6', label: 'Cumartesi' },
                { value: '7', label: 'Pazar' },
            ],
        },
        {
            key: 'lesson', label: 'Dersler', type: 'multiselect', col: 1,
            value: lesson,
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            onChange: (v: string | string[]) => setLesson(Array.isArray(v) ? v : []),
            options: lessonsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'teacher', label: 'Öğretmen', type: 'multiselect', col: 1,
            value: teacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            onChange: (v: string | string[]) => setTeacher(Array.isArray(v) ? v : []),
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
        {
            key: 'area_id', label: 'Çalışma Alanı', type: 'select', col: 1,
            value: areaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            onChange: setAreaId,
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
    ], [
        dateRange, weekDays, lesson, teacher, areaId,
        lessonsData, teachersData, usedAreasData,
    ]);

    /* —— silme —— */
    const handleDeleteRow = (row: Row) => row.id && deleteExistingAttendance(row.id);

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
                onAdd={() => navigate(`${BASE}/crud`)}
                columns={columns}
                data={rows}
                loading={loading}
                error={error || deleteError}
                showExportButtons
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={paginate}
                onPageChange={setPage}
                onPageSizeChange={s => { setPaginate(s); setPage(1); }}
                exportFileName="teacher_onebyone_plan"
                onDeleteRow={handleDeleteRow}
            />
        </>
    );
}
