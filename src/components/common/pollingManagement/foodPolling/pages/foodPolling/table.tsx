
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../components/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useProgramsTable } from '../../../../../hooks/program/useList';


interface Row {
    id: number;
    meal_name: string;
    class_name: string;
    student_no: string;
    student_name: string;
    status: number;
    clicked: boolean; /* dropdown ilk açıldı mı? */
}


const MEAL_OPTIONS = [
    { value: 'kahvaltı', label: 'Kahvaltı' },
    { value: 'öğle yemeği', label: 'Öğle Yemeği' },
    { value: 'akşam yemeği', label: 'Akşam Yemeği' },
];

/* Durum metin/renk haritaları */
const STATUS_TXT = ['Geldi', 'Geç Geldi', 'Gelmedi'];
const STATUS_CLR = ['text-success', 'text-warning', 'text-danger'];

export default function FoodAttendanceTable() {
    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [mealName, setMealName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [programId, setProgramId] = useState('');
    const [levelId, setLevelId] = useState('');
    const [classroomId, setClassroomId] = useState('');
    const [areaId, setAreaId] = useState('');

    /* —— sayfalama —— */
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(10);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        programs: false, groups: false, areas: false, levels: false, classes: false,
    });

    /* —— look-ups —— */
    const { programsData = [] } = useProgramsTable({ enabled: enabled.programs });
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups, paginate: 999 });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!levelId,
        class_level: +levelId || undefined,
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
        name: mealName || undefined,
        group_id: +groupId || undefined,
        program_id: +programId || undefined,
        class_level: +levelId || undefined,
        classroom_id: +classroomId || undefined,
        used_area_id: +areaId || undefined,
    });

    /* —— satırlar —— */
    const baseRows: Row[] = useMemo(() => (
        attendancesData.flatMap((a: any) => {
            const meal = a.name || '-';
            const cls = a.classroom?.name || a.level?.name || '-';

            if (!a.students?.length) {
                return [{
                    id: a.id, meal_name: meal, class_name: cls,
                    student_no: '-', student_name: '-', status: a.status ?? 0, clicked: false,
                }];
            }
            return a.students.map((s: any) => ({
                id: a.id,
                meal_name: meal,
                class_name: cls,
                student_no: s.student_no ?? s.register_no ?? '-',
                student_name:
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim() ||
                    s.name_surname || '-',
                status: s.pivot?.status ?? a.status ?? 0,
                clicked: false,
            }));
        })
    ), [attendancesData]);

    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);

    /* —— durum değişimi —— */
    const handleStatusChange = (idx: number, value: number) => {
        setRows(r =>
            r.map((row, i) =>
                i === idx ? { ...row, status: value, clicked: true } : row,
            ),
        );
    };

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index', label: 'Sıra No',
            style: { width: 70, textAlign: 'center' },
            render: (_r, _o, idx) => (idx !== undefined ? idx + 1 : ''),
        },
        { key: 'meal_name', label: 'Öğün / Grup', render: r => r.meal_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_no', label: 'Numarası', render: r => r.student_no },
        { key: 'student_name', label: 'Adı Soyadı', render: r => r.student_name },
        {
            key: 'status',
            label: 'Durum',
            style: { width: 160, textAlign: 'center' },
            render: (_r, _o, idx) => {
                const row = rows[idx!];
                return (
                    <select
                        className={`form-select p-1 ${row.clicked ? STATUS_CLR[row.status] : ''}`}
                        style={{ cursor: 'pointer', fontWeight: 500 }}
                        value={row.clicked ? row.status : ''}
                        onChange={e => handleStatusChange(idx!, Number(e.target.value))}
                    >
                        <option value="" disabled>Tıklayınız</option>
                        <option value={0} className={STATUS_CLR[0]}>{STATUS_TXT[0]}</option>
                        <option value={1} className={STATUS_CLR[1]}>{STATUS_TXT[1]}</option>
                        <option value={2} className={STATUS_CLR[2]}>{STATUS_TXT[2]}</option>
                    </select>
                );
            },
        },
    ], [rows]);

    /* —— filtreler (col:1 → 4/satır) —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'meal_name', label: 'Öğün Adı', type: 'select', col: 1,
            value: mealName,
            onChange: setMealName,
            options: MEAL_OPTIONS,
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select', col: 1,
            value: groupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            onChange: setGroupId,
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'program_id', label: 'Okul Seviyesi', type: 'select', col: 1,
            value: programId,
            onClick: () => setEnabled(e => ({ ...e, programs: true })),
            onChange: setProgramId,
            options: programsData.map(p => ({ value: String(p.id), label: p.name })),
        },
        {
            key: 'level_id', label: 'Sınıf Seviyesi', type: 'select', col: 1,
            value: levelId,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: setLevelId,
            options: levelsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'classroom_id', label: 'Sınıf / Şube', type: 'select', col: 1,
            value: classroomId,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroomId,
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'area_id', label: 'Yemek Alanı', type: 'select', col: 1,
            value: areaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            onChange: setAreaId,
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
    ], [
        dateRange, mealName, groupId, programId, levelId, classroomId, areaId,
        groupsData, programsData, levelsData, classroomData, usedAreasData,
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
                // pageTitle="Yemek Yoklama"
                exportFileName="meal_attendance"
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
            />
        </>
    );
}
