/* eslint-disable @typescript-eslint/no-misused-promises */
/* table.tsx – Öğretmen Birebir Planı listesi */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

/* – veri / yardımcı listeler – */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';

/* – satır tipi – */
interface Row {
    id: number;
    week_day: string;
    lesson: string;
    teacher: string;
    time_range: string;
    work_area: string;
}


const BASE = `${import.meta.env.BASE_URL}pollingManagement/oneToOneTeachers`;

const TURKISH_DAYS = [
    '', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe',
    'Cuma', 'Cumartesi', 'Pazar',
];

/* ———————————————————————————————————————————— */
export default function TeacherOneByOnePlanTable() {
    const navigate = useNavigate();

    /* filtre state’leri */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [lesson, setLesson] = useState('');
    const [teacher, setTeacher] = useState('');
    const [areaId, setAreaId] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* lazy-load bayrakları */
    const [enabled, setEnabled] = useState({
        lessons: false,
        teachers: false,
        areas: false,
    });

    /* — yardımcı listeler — */
    const { lessonsData } = useLessonList({
        enabled: enabled.lessons,
    });

    const { attendanceTeachersData: teachersData } = useAttendanceTeachersTable({
        enabled: enabled.teachers,
    });

    const { usedAreasData } = useUsedAreasList({
        enabled: enabled.areas,
    });

    /* — ana yoklama listesi — */
    const {
        attendancesData,
        loading, error,
        totalPages, totalItems,
    } = useAttendancesTable({
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        lesson_id: +lesson || undefined,
        teacher_id: +teacher || undefined,
        used_area_id: +areaId || undefined,
        week_days: weekDays.length ? weekDays.join(',') : undefined,
        one_by_one: 1,             // <- backend’de birebir filtreleyen parametre varsa
        enabled: true,
    });

    /* — attendances → rows — */
    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).map((a: any) => ({
            id: a.id,
            week_day: TURKISH_DAYS[a.days?.[0]?.day_id ?? dayjs(a.start_date).day()],
            lesson: a.lesson?.name || '-',
            teacher: a.teachers?.[0]?.name_surname || '-',
            time_range: `${dayjs(a.start_time, 'HH:mm:ss').format('HH:mm')} - ${dayjs(a.end_time, 'HH:mm:ss').format('HH:mm')}`,
            work_area: a.used_area?.name || '-',
        }))
    ), [attendancesData]);

    /* — kolonlar — */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'week_day', label: 'Gün', render: r => r.week_day },
        { key: 'lesson', label: 'Ders', render: r => r.lesson },
        { key: 'teacher', label: 'Öğretmen', render: r => r.teacher },
        { key: 'time_range', label: 'Saat Aralıkları', render: r => r.time_range },
        { key: 'work_area', label: 'Çalışma Alanı', render: r => r.work_area },
        {
            key: 'actions', label: 'İşlemler', style: { width: 110, textAlign: 'center' },
            render: row => (
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
                        onClick={() => {/* openDeleteModal(row) */ }}
                    >
                        <i className="ti ti-trash" />
                    </button>
                </div>
            ),
        },
    ], [navigate]);

    /* — filtreler — */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'week_days', label: 'Haftanın Günleri', type: 'multiselect',
            value: weekDays,
            onChange: setWeekDays,
            options: [
                { value: '1', label: 'Pazartesi' }, { value: '2', label: 'Salı' },
                { value: '3', label: 'Çarşamba' }, { value: '4', label: 'Perşembe' },
                { value: '5', label: 'Cuma' }, { value: '6', label: 'Cumartesi' },
                { value: '7', label: 'Pazar' },
            ],
        },
        {
            key: 'lesson', label: 'Dersler', type: 'select',
            value: lesson, onChange: setLesson,
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            options: (lessonsData ?? []).map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'teacher', label: 'Öğretmenler', type: 'select',
            value: teacher, onChange: setTeacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            options: (teachersData ?? []).map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
        {
            key: 'area_id', label: 'Çalışma Alanı', type: 'select',
            value: areaId, onChange: setAreaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: (usedAreasData ?? []).map(a => ({ value: String(a.id), label: a.name })),
        },
    ], [
        dateRange, weekDays, lesson, teacher, areaId,
        lessonsData, teachersData, usedAreasData,
    ]);

    /* — render — */
    return (
        <ReusableTable<Row>

            tableMode="single"
            onAdd={() => navigate(`${BASE}/crud`)}
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
            exportFileName="teacher_onebyone_plan"
        />
    );
}
