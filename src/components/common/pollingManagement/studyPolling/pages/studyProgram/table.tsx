/* eslint-disable @typescript-eslint/no-misused-promises */
/* table.tsx – Etüt Yoklama › Etüt Programı */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

/* ───────── API hook’ları ───────── */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';

/* ───── satır tipi ───── */
interface Row {
    id: number;
    date: string;   // Tarih
    group_name: string;   // Grup Adı
    days_text: string;   // Günler
    time_range: string;   // Saat Aralığı
    area_name: string;   // Etüt Alanı
    duty_teacher: string;   // Görevli Öğretmen
}

/* router kökü */
const ROOT = `${import.meta.env.BASE_URL}pollingManagement/studyProgram`;

export default function StudyProgramTable() {
    const navigate = useNavigate();

    /* ------------- filtre state’leri ------------- */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [groupId, setGroupId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [timeRange, setTimeRange] = useState('');
    const [manager, setManager] = useState('');
    const [teacher, setTeacher] = useState('');
    const [status, setStatus] = useState('');  // Durum (isteğe bağlı)

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* lazy flags */
    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
        teachers: false,
        users: false,
    });

    /* ---------- yardımcı listeler ---------- */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });

    /* ---------- ana liste ---------- */
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
        group_id: +groupId || undefined,
        used_area_id: +areaId || undefined,
        week_day: +weekDay || undefined,
        time_range: timeRange || undefined,
        duty_user_id: +manager || undefined,
        duty_teacher_id: +teacher || undefined,
        status: status || undefined,
        enabled: true,
    });

    /* ---------- attendances → rows ---------- */
    const rows: Row[] = useMemo(() => (
        attendancesData.map((a: any) => ({
            id: a.id,
            date: dayjs(a.start_date).format('DD.MM.YYYY'),
            group_name: a.group?.name || '-',
            days_text: a.week_days_text || a.days?.map((d: any) => d.day_name).join(', ') || '-',
            time_range: a.time_range || '-',
            area_name: a.used_area?.name || '-',
            duty_teacher: a.duty_teacher?.name_surname || '-',
        }))
    ), [attendancesData]);

    /* ---------- kolonlar ---------- */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'group_name', label: 'Grup Adı', render: r => r.group_name },
        { key: 'days_text', label: 'Günler', render: r => r.days_text },
        { key: 'time_range', label: 'Saat Aralığı', render: r => r.time_range },
        { key: 'area_name', label: 'Etüt Alanı', render: r => r.area_name },
        { key: 'duty_teacher', label: 'Görevli Öğretmen', render: r => r.duty_teacher },

        {
            key: 'actions', label: 'İşlemler',
            style: { width: 110, textAlign: 'center' },
            render: row => (
                <div className="d-flex justify-content-center gap-2">
                    {/* Düzenle */}
                    <button
                        className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        onClick={() => navigate(`${ROOT}/crud/${row.id}`)}
                    >
                        <i className="ti ti-pencil" />
                    </button>
                    {/* Sil – isteğe bağlı */}
                    <button
                        className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        onClick={() => { /* openDeleteModal(row) */ }}
                    >
                        <i className="ti ti-trash" />
                    </button>
                </div>
            ),
        },
    ], [navigate]);

    /* ---------- filtreler ---------- */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select',
            value: groupId, onChange: setGroupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'area_id', label: 'Etüt Alanı', type: 'select',
            value: areaId, onChange: setAreaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
        {
            key: 'week_day', label: 'Haftanın Günleri', type: 'select',
            value: weekDay, onChange: setWeekDay,
            options: [
                { value: '1', label: 'Pazartesi' }, { value: '2', label: 'Salı' },
                { value: '3', label: 'Çarşamba' }, { value: '4', label: 'Perşembe' },
                { value: '5', label: 'Cuma' }, { value: '6', label: 'Cumartesi' },
                { value: '7', label: 'Pazar' },
            ],
        },
        {
            key: 'time_range', label: 'Saat Aralığı', type: 'text',
            value: timeRange, onChange: setTimeRange,
        },
        {
            key: 'manager', label: 'Görevli Yöneticiler', type: 'select',
            value: manager, onChange: setManager,
            /* rol-2 kullanıcılar gerekiyorsa ayrı useUsersTable eklenebilir */
        },
        {
            key: 'teacher', label: 'Görevli Öğretmenler', type: 'select',
            value: teacher, onChange: setTeacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
        {
            key: 'status', label: 'Durum', type: 'select',
            value: status, onChange: setStatus,
            options: [
                { value: '0', label: 'Pasif' },
                { value: '1', label: 'Aktif' },
            ],
        },
    ], [
        dateRange, groupId, areaId, weekDay, timeRange,
        manager, teacher, status,
        groupsData, usedAreasData, teachersData,
    ]);

    /* ---------- render ---------- */
    return (
        <ReusableTable<Row>
            tableMode="single"
            columns={columns}
            data={rows}
            loading={loading}
            error={error}
            filters={filters}
            showExportButtons
            onAdd={() => navigate(`${ROOT}/crud`)}
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={s => { setPageSize(s); setPage(1); }}
            exportFileName="study_program_list"
        />
    );
}
