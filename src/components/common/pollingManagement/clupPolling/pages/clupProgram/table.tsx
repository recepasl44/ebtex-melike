
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
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';

/* ───────── Satır tipi ───────── */
interface Row {
    id: number;
    date: string;
    club_name: string;
    week_days: string;
    time_range: string;
    area_name: string;
    teacher_name: string;
}

export default function ClubProgramTable() {
    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [timeRange, setTimeRange] = useState('');
    const [clubName, setClubName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [teacher, setTeacher] = useState('');

    /* —— sayfalama —— */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        groups: false, areas: false, teachers: false,
    });

    /* —— look-ups —— */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });

    /* —— ana sorgu —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        page, paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        group_id: +groupId || undefined,
        used_area_id: +areaId || undefined,
        teacher_id: +teacher || undefined,
        club_name: clubName || undefined,
        week_days: weekDays.length ? weekDays.join(',') : undefined,
        time_range: timeRange || undefined,
        enabled: true,
    });


    const clubNameOptions = useMemo(() => {
        const set = new Set<string>();
        attendancesData.forEach((a: any) => { if (a.name) set.add(a.name); });
        return Array.from(set).map(n => ({ value: n, label: n }));
    }, [attendancesData]);
    /* —— satırlar —— */
    const rows: Row[] = useMemo(() => (
        attendancesData.map((a: any) => ({
            id: a.id,
            date: dayjs(a.start_date).format('DD.MM.YYYY'),
            club_name: a.name || '-',
            week_days: a.week_days
                ? (Array.isArray(a.week_days) ? a.week_days.join(', ') : a.week_days)
                : '-',
            time_range: a.time_range || '-',
            area_name: a.used_area?.name || '-',
            teacher_name: a.teachers?.[0]?.name_surname ?? '-',
        }))
    ), [attendancesData]);


    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'club_name', label: 'Kulüp / Grup', render: r => r.club_name },
        { key: 'week_days', label: 'Günler', render: r => r.week_days },
        { key: 'time_range', label: 'Saat Aralığı', render: r => r.time_range },
        { key: 'area_name', label: 'Kulüp Alanı', render: r => r.area_name },
        { key: 'teacher_name', label: 'Görevli Öğretmen', render: r => r.teacher_name },
    ], []);


    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'time_range', label: 'Saat Aralığı', type: 'text', col: 1,
            value: timeRange,
            onChange: setTimeRange,
        },
        {
            key: 'club_name', label: 'Kulüp Adı', type: 'select', col: 1,
            value: clubName,
            onChange: setClubName,
            options: clubNameOptions,
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select', col: 1,
            value: groupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            onChange: setGroupId,
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'area_id', label: 'Kulüp Alanı', type: 'select', col: 1,
            value: areaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            onChange: setAreaId,
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
        {
            key: 'week_days', label: 'Haftanın Günleri', type: 'select', col: 1,
            value: weekDays,
            onChange: (v: string | string[]) =>
                setWeekDays(Array.isArray(v) ? v : (v ? [v] : [])),
            isMulti: true,
            options: [
                { value: '1', label: 'Pzt' }, { value: '2', label: 'Sal' },
                { value: '3', label: 'Çar' }, { value: '4', label: 'Per' },
                { value: '5', label: 'Cum' }, { value: '6', label: 'Cmt' },
                { value: '7', label: 'Paz' },
            ],
        },
        {
            key: 'teacher', label: 'Görevli Öğretmen', type: 'select', col: 1,
            value: teacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            onChange: setTeacher,
            options: teachersData.map((t: any) => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname ?? '-',
            })),
        },
    ], [
        dateRange, timeRange, clubName, groupId, areaId, weekDays, teacher,
        clubNameOptions, groupsData, usedAreasData, teachersData,
    ]);


    return (
        <>
            <FilterGroup
                filters={filters}
                columnsPerRow={4}
                navigate={useNavigate()}
            />


            <ReusableTable<Row>
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
                exportFileName="club_program_list"
            />
        </>
    );
}
