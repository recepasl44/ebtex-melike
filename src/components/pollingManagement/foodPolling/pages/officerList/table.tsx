/* ------------------------------------------------------------------
 *  Yemek Görevlileri Listesi – FoodOfficerListTable.tsx
 * -----------------------------------------------------------------*/
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';

/* ----------- tablo satır tipi ----------- */
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

/* ------------------------------------------------------------------ */
export default function FoodOfficerListTable() {
    /* ------------ filtre state’leri ------------ */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [mealName, setMealName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [areaId, setAreaId] = useState('');

    /* ------------ sayfalama -------------------- */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* ------------ look-ups --------------------- */
    const { groupsData = [] } = useGroupsTable({ enabled: true });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: true });

    /* ------------ ana sorgu -------------------- */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        enabled: true,
        page, paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        name: mealName || undefined,
        group_id: +groupId || undefined,
        used_area_id: +areaId || undefined,
    });

    /* ------------ satırlar --------------------- */
    const rows: Row[] = useMemo(() => (
        attendancesData.map((a: any) => ({
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

    /* ------------ kolonlar --------------------- */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'time_range', label: 'Saat Aralığı', render: r => r.time_range },
        { key: 'meal_name', label: 'Öğün / Grup', render: r => r.meal_name },
        { key: 'cafeteria_resp', label: 'Yemekhane Sorumlusu', render: r => r.cafeteria_responsible },
        { key: 'duty_manager', label: 'Görevli Yönetici', render: r => r.duty_manager },
        { key: 'duty_teachers', label: 'Görevli Öğretmen', render: r => r.duty_teachers },
        { key: 'area_name', label: 'Yemek Alanı', render: r => r.area_name },
    ], []);

    /* ------------ filtreler -------------------- */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'meal_name', label: 'Öğün Adı', type: 'text',
            value: mealName, onChange: setMealName
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select',
            value: groupId, onChange: setGroupId,
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'area_id', label: 'Yemek Alanı', type: 'select',
            value: areaId, onChange: setAreaId,
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
    ], [dateRange, mealName, groupId, areaId, groupsData, usedAreasData]);

    /* ------------ render ----------------------- */
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
            pageSize={paginate}
            onPageChange={setPage}
            onPageSizeChange={s => { setPaginate(s); setPage(1); }}
            exportFileName="food_officer_list"
        />
    );
}
