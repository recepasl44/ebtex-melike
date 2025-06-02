

import { useState, useMemo } from 'react';

import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';

interface Row {
    id: number;
    date: string;   // Tarih
    club_name: string;   // Kulüp / Grup
    week_days: string;   // Günler (metin, virgülle ayırdık)
    time_range: string;   // Saat Aralığı
    area_name: string;   // Kulüp Alanı
    teacher_name: string;   // Görevli Öğretmen
}


export default function ClubProgramTable() {

    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [timeRange, setTimeRange] = useState('');
    const [clubName, setClubName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [teacher, setTeacher] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);


    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
        teachers: false,
    });

    const { groupsData } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData } = useUsedAreasList({ enabled: enabled.areas });
    const { attendanceTeachersData: teachersData }
        = useAttendanceTeachersTable({ enabled: enabled.teachers });

    const {
        attendancesData,
        loading, error,
        totalPages, totalItems,
    } = useAttendancesTable({
        page, pageSize,
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

    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).map((a: any) => ({
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
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange, onChange: v => setDateRange(v ?? { startDate: '', endDate: '' })
        },

        {
            key: 'time_range', label: 'Saat Aralığı', type: 'text',
            value: timeRange, onChange: setTimeRange
        },

        {
            key: 'club_name', label: 'Kulüp Adı', type: 'text',
            value: clubName, onChange: setClubName
        },

        {
            key: 'group_id', label: 'Grup Adı', type: 'select',
            value: groupId, onChange: setGroupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: (groupsData ?? []).map(g => ({ value: String(g.id), label: g.name }))
        },

        {
            key: 'area_id', label: 'Kulüp Alanı', type: 'select',
            value: areaId, onChange: setAreaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: (usedAreasData ?? []).map(a => ({ value: String(a.id), label: a.name }))
        },

        {
            key: 'week_days', label: 'Haftanın Günleri', type: 'select',
            value: weekDays,
            onChange: (v: string | string[]) => setWeekDays(Array.isArray(v) ? v : v ? [v] : []),
            options: [
                { value: '1', label: 'Pzt' }, { value: '2', label: 'Sal' },
                { value: '3', label: 'Çar' }, { value: '4', label: 'Per' },
                { value: '5', label: 'Cum' }, { value: '6', label: 'Cmt' },
                { value: '7', label: 'Paz' },
            ],
            isMulti: true
        },

        {
            key: 'teacher', label: 'Görevli Öğretmenler', type: 'select',
            value: teacher, onChange: setTeacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            options: (teachersData ?? []).map((t: any) => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname ?? '-',
            }))
        },
    ], [
        dateRange, timeRange, clubName, groupId, areaId, weekDays, teacher,
        groupsData, usedAreasData, teachersData,
    ]);


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
            exportFileName="club_program_list"
        />
    );
}
