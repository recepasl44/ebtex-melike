/* eslint-disable @typescript-eslint/no-misused-promises */
/* table.tsx – Yemek Yoklama › Görevli Listesi */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

/* ───────── API hook’ları ───────── */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';

import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';

/* ───── satır tipi ───── */
interface Row {
    id: number;
    date: string;
    time_range: string;
    meal_name: string;
    cafeteria_responsible: string;
    duty_manager: string;
    duty_teachers: string;
    area_name: string;
}

/* router kökü */
const ROOT = `${import.meta.env.BASE_URL}pollingManagement/foodOfficerList`;

export default function FoodOfficerListTable() {
    const navigate = useNavigate();

    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [timeRange, setTimeRange] = useState('');
    const [mealName, setMealName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [responsible, setResponsible] = useState('');
    const [manager, setManager] = useState('');
    const [teacher, setTeacher] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* lazy-load bayrakları */
    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
        levels: false,
        classes: false,
        students: false,
        teachers: false,
    });

    /* —— yardımcı listeler —— */
    const { groupsData } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData } = useUsedAreasList({ enabled: enabled.areas });

    const { attendanceTeachersData: teachersData } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });

    /* —— ana liste —— */
    const {
        attendancesData, loading, error,
        totalPages, totalItems,
    } = useAttendancesTable({
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        name: mealName || undefined,
        group_id: +groupId || undefined,
        used_area_id: +areaId || undefined,
        time_range: timeRange || undefined,
        responsible_id: +responsible || undefined,
        duty_user_id: +manager || undefined,
        duty_teacher_id: +teacher || undefined,
        enabled: true,
    });

    /* —— attendances → rows —— */
    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).map((a: any) => ({
            id: a.id,
            date: dayjs(a.start_date).format('DD.MM.YYYY'),
            time_range: a.time_range || '-',
            meal_name: a.name || '-',
            cafeteria_responsible: a.responsible?.name_surname || '-',
            duty_manager: a.duty_user?.name_surname || '-',
            duty_teachers: a.duty_teacher?.name_surname || '-',
            area_name: a.used_area?.name || '-',
        }))
    ), [attendancesData]);

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'time_range', label: 'Saat Aralığı', render: r => r.time_range },
        { key: 'meal_name', label: 'Öğün / Grup', render: r => r.meal_name },
        {
            key: 'cafeteria_responsible', label: 'Yemekhane Sorumlusu',
            render: r => r.cafeteria_responsible
        },
        { key: 'duty_manager', label: 'Görevli Yönetici', render: r => r.duty_manager },
        { key: 'duty_teachers', label: 'Görevli Öğretmenler', render: r => r.duty_teachers },
        { key: 'area_name', label: 'Yemek Alanı', render: r => r.area_name },
        /* işlemler */

    ], [navigate]);

    /* —— filtreler —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'time_range', label: 'Saat Aralığı', type: 'text',
            value: timeRange, onChange: setTimeRange,
        },
        {
            key: 'meal_name', label: 'Öğün Adı', type: 'text',
            value: mealName, onChange: setMealName,
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select',
            value: groupId, onChange: setGroupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: (groupsData ?? []).map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'area_id', label: 'Yemek Alanı', type: 'select',
            value: areaId, onChange: setAreaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: (usedAreasData ?? []).map(a => ({ value: String(a.id), label: a.name })),
        },
        {
            key: 'responsible', label: 'Yemekhane Sorumlusu', type: 'select',
            value: responsible, onChange: setResponsible,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            options: (teachersData ?? []).map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
        {
            key: 'manager', label: 'Görevli Yöneticiler', type: 'select',
            value: manager, onChange: setManager,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            options: (teachersData ?? []).map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
        {
            key: 'teacher', label: 'Görevli Öğretmenler', type: 'select',
            value: teacher, onChange: setTeacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            options: (teachersData ?? []).map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
    ], [
        dateRange, timeRange, mealName, groupId, areaId,
        responsible, manager, teacher,
        groupsData, usedAreasData, teachersData,
    ]);

    /* —— render —— */
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
            exportFileName="food_officer_list"
        />
    );
}
