/* ---------------------------------------------------------------
 *  Yemek Yoklaması • Sayı Özeti – FoodPollingCountsTable
 * --------------------------------------------------------------*/
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
import { useProgramsTable } from '../../../../../hooks/program/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';

/* ---------- tablo satır tipi ---------- */
interface Row {
    id: number;
    date: string;
    group_name: string;
    breakfast_exp: number;
    breakfast_arr: number;
    lunch_exp: number;
    lunch_arr: number;
    dinner_exp: number;
    dinner_arr: number;
}

export default function FoodPollingCountsTable() {
    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [mealType, setMealType] = useState('');
    const [group, setGroup] = useState('');
    const [program, setProgram] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');

    /* —— sayfalama —— */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        programs: false, groups: false, levels: false, classes: false,
    });

    /* —— yardımcı listeler —— */
    const { programsData = [] } = useProgramsTable({ enabled: enabled.programs });
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups, page: 1, paginate: 50 });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!classLevel,
        class_level: Number(classLevel) || undefined,
        branchId: 0,
    });

    /* —— ana sorgu —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        enabled: true,
        page, paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        program_id: Number(program) || undefined,
        group_id: Number(group) || undefined,
        class_level: Number(classLevel) || undefined,
        classroom_id: Number(classroom) || undefined,
        meal_type: mealType || undefined,
    });

    /* —— satırlar —— */
    const rows: Row[] = useMemo(() => (
        attendancesData.map((a: any) => ({
            id: a.id,
            date: dayjs(a.date ?? a.start_date).format('DD.MM.YYYY'),
            group_name: a.group?.name ?? '-',
            breakfast_exp: a.breakfast_expected ?? 0,
            breakfast_arr: a.breakfast_arrived ?? 0,
            lunch_exp: a.lunch_expected ?? 0,
            lunch_arr: a.lunch_arrived ?? 0,
            dinner_exp: a.dinner_expected ?? 0,
            dinner_arr: a.dinner_arrived ?? 0,
        }))
    ), [attendancesData]);

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'group_name', label: 'Grup Adı', render: r => r.group_name },
        { key: 'breakfast_exp', label: 'Kahvaltı Beklenen', style: { textAlign: 'center' }, render: r => r.breakfast_exp },
        { key: 'breakfast_arr', label: 'Kahvaltı Gelen', style: { textAlign: 'center' }, render: r => r.breakfast_arr },
        { key: 'lunch_exp', label: 'Yemek Beklenen', style: { textAlign: 'center' }, render: r => r.lunch_exp },
        { key: 'lunch_arr', label: 'Yemek Gelen', style: { textAlign: 'center' }, render: r => r.lunch_arr },
        { key: 'dinner_exp', label: 'Akşam Beklenen', style: { textAlign: 'center' }, render: r => r.dinner_exp || '-' },
        { key: 'dinner_arr', label: 'Akşam Gelen', style: { textAlign: 'center' }, render: r => r.dinner_arr || '-' },
    ], []);

    /* —— filtreler (col:1 → 4/satır) —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'mealType', label: 'Öğün Adı', type: 'select', col: 1,
            value: mealType,
            onChange: setMealType,
            options: [
                { value: 'breakfast', label: 'Kahvaltı' },
                { value: 'lunch', label: 'Öğle' },
                { value: 'dinner', label: 'Akşam' },
            ],
        },
        {
            key: 'group', label: 'Grup Adı', type: 'select', col: 1,
            value: group,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            onChange: setGroup,
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'program', label: 'Okul Seviyesi', type: 'select', col: 1,
            value: program,
            onClick: () => setEnabled(e => ({ ...e, programs: true })),
            onChange: setProgram,
            options: programsData.map(p => ({ value: String(p.id), label: p.name })),
        },
        {
            key: 'class_level', label: 'Sınıf Seviyesi', type: 'select', col: 1,
            value: classLevel,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: v => { setClassLevel(v); setClassroom(''); },
            options: levelsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube', type: 'select', col: 1,
            value: classroom,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroom,
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
    ], [
        dateRange, mealType, group, program, classLevel, classroom,
        groupsData, programsData, levelsData, classroomData,
    ]);

    /* —— render —— */
    return (
        <>
            <FilterGroup
                filters={filters}
                columnsPerRow={4}
                navigate={useNavigate()}
            />


            <ReusableTable<Row>
                columns={columns}
                data={rows}
                loading={loading}
                error={error}
                tableMode="single"
                showExportButtons
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={paginate}
                onPageChange={setPage}
                onPageSizeChange={size => { setPaginate(size); setPage(1); }}
                exportFileName="food_polling_counts"
            />
        </>
    );
}
